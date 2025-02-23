"use client";

import React, { useState, useEffect } from 'react';
import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { useAccount, usePublicClient } from 'wagmi';
import { Address } from "~~/components/scaffold-eth";
import Image from "next/image";

// [Keep all your interfaces and contract definitions exactly the same]
const contractAddress = '0xbcdd5cc1cd0fa804ae1ea14e05922a6222a5bc9f';

interface MaskSubmission {
  submissionId: number;
  submitter: string;
  ipfsHash: string;
  txHash: string;
  approvalCount: number;
  rejectionCount: number;
  isAuthenticated: boolean;
  isCompleted: boolean;
}

interface MaskDetails {
  images: string[];
  validations: {
    validator: string;
    approved: boolean;
    timestamp: number;
  }[];
}

const AUTHENTIFICATION_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "submissions",
    outputs: [
      { internalType: "address", name: "submitter", type: "address" },
      { internalType: "string", name: "ipfsHash", type: "string" },
      { internalType: "uint8", name: "approvalCount", type: "uint8" },
      { internalType: "uint8", name: "rejectionCount", type: "uint8" },
      { internalType: "bool", name: "isAuthenticated", type: "bool" },
      { internalType: "bool", name: "isCompleted", type: "bool" }
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "submissionCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "ipfsHash", type: "string" }],
    name: "submitMask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "submissionId", type: "uint256" },
      { internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "validateMask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  }
] as const;

export default function ValidatorDashboard() {
  const { address: connectedAddress } = useAccount();
  const publicClient = usePublicClient();
  const [submissions, setSubmissions] = useState<MaskSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedMask, setSelectedMask] = useState<MaskSubmission | null>(null);
  const [maskDetails, setMaskDetails] = useState<MaskDetails | null>(null);

  useEffect(() => {
    if (connectedAddress) {
      fetchSubmissions();
    }
  }, [connectedAddress]);

  const fetchSubmissions = async () => {
    try {
      const count = await publicClient.readContract({
        address: contractAddress,
        abi: AUTHENTIFICATION_ABI,
        functionName: 'submissionCount',
      }) as bigint;

      const events = await publicClient.getLogs({
        address: contractAddress,
        event: {
          type: 'event',
          name: 'MaskSubmitted',
          inputs: [
            { type: 'uint256', name: 'submissionId', indexed: true },
            { type: 'address', name: 'submitter', indexed: true },
            { type: 'string', name: 'ipfsHash' }
          ],
        },
        fromBlock: BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK || '0'),
        toBlock: 'latest'
      });

      console.log("Events:", events);

      const txHashMap = new Map(
        events.map(event => [event.args.ipfsHash, event.transactionHash])
      );

      console.log("Transaction hash map:", txHashMap);

      const submissionPromises = [];
      for (let i = 0; i < Number(count); i++) {
        submissionPromises.push(
          publicClient.readContract({
            address: contractAddress,
            abi: AUTHENTIFICATION_ABI,
            functionName: 'submissions',
            args: [BigInt(i)],
          })
        );
      }

      const submissionResults = await Promise.all(submissionPromises);
      const formattedSubmissions = submissionResults.map((result: any, index) => ({
        submissionId: index,
        submitter: result[0],
        ipfsHash: result[1],
        approvalCount: result[2],
        rejectionCount: result[3],
        isAuthenticated: result[4],
        isCompleted: result[5],
        txHash: txHashMap.get(result[1]) || ''
      }));

      setSubmissions(formattedSubmissions);
      setLoading(false);
    } catch (err: any) {
      console.error('Error details:', err);
      setError(`Failed to fetch submissions: ${err.message}`);
      setLoading(false);
    }
  };

  const handleValidation = async (submissionId: number, approved: boolean) => {
    if (!window.ethereum || !connectedAddress) {
      setError('Please connect your wallet!');
      return;
    }

    setValidating(true);
    try {
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
      });

      const hash = await walletClient.writeContract({
        account: connectedAddress,
        address: contractAddress,
        abi: AUTHENTIFICATION_ABI,
        functionName: 'validateMask',
        args: [BigInt(submissionId), approved],
      });

      setStatus(`Validation submitted! Transaction: ${hash}`);
      await fetchSubmissions();
    } catch (err: any) {
      console.error('Error validating submission:', err);
      setError(err.message || 'Failed to validate submission');
    } finally {
      setValidating(false);
    }
  };

  const openMaskDetails = async (submission: MaskSubmission) => {
    setSelectedMask(submission);
    const mockDetails: MaskDetails = {
      images: [
        submission.ipfsHash + "_front",
        submission.ipfsHash + "_back"
      ],
      validations: [
        {
          validator: "0x123...",
          approved: true,
          timestamp: Date.now() - 100000
        },
      ]
    };
    setMaskDetails(mockDetails);
  };

  const MaskDetailsModal = () => {
    if (!selectedMask || !maskDetails) return null;

    const totalVotes = selectedMask.approvalCount + selectedMask.rejectionCount;
    const votesNeeded = 10 - totalVotes;
    const approvalPercentage = totalVotes > 0 
      ? (selectedMask.approvalCount / totalVotes) * 100 
      : 0;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 backdrop-blur rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 border border-emerald-500/20">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-['Grenze_Gotisch'] text-emerald-500">Mask #{selectedMask.submissionId}</h2>
            <button 
              onClick={() => setSelectedMask(null)}
              className="text-emerald-500 hover:text-emerald-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-emerald-500/20 rounded-lg p-2">
              <h3 className="font-semibold mb-2 text-emerald-500">Front View</h3>
              <div className="aspect-square relative bg-white/10">
                <Image 
                  src="/placeholder-front.jpg" 
                  alt="Front view"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="border border-emerald-500/20 rounded-lg p-2">
              <h3 className="font-semibold mb-2 text-emerald-500">Back View</h3>
              <div className="aspect-square relative bg-white/10">
                <Image 
                  src="/placeholder-back.jpg" 
                  alt="Back view"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-emerald-500">Validation Progress</h3>
            <div className="flex justify-between mb-1">
              <span>Progress: {totalVotes}/10 votes</span>
              <span>{Math.round(approvalPercentage)}% Approved</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 mb-4">
              <div 
                className="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
                style={{width: `${Math.min(totalVotes * 10, 100)}%`}}
              />
            </div>
            {votesNeeded > 0 && (
              <p className="text-base-content/60">
                {votesNeeded} more {votesNeeded === 1 ? 'vote' : 'votes'} needed for final decision
              </p>
            )}
          </div>

          {!selectedMask.isCompleted && (
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => handleValidation(selectedMask.submissionId, true)}
                disabled={validating}
                className="flex-1 btn btn-success"
              >
                Validate as Authentic
              </button>
              <button
                onClick={() => handleValidation(selectedMask.submissionId, false)}
                disabled={validating}
                className="flex-1 btn btn-error"
              >
                Mark as Inauthentic
              </button>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2 text-emerald-500">Validation History</h3>
            <div className="space-y-2">
              {maskDetails.validations.map((validation, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Address address={validation.validator} />
                    <span className={validation.approved ? 'text-green-500' : 'text-red-500'}>
                      {validation.approved ? '✓ Validated' : '✗ Rejected'}
                    </span>
                  </div>
                  <span className="text-base-content/60">
                    {new Date(validation.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center p-8 text-emerald-500">Loading submissions...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10"></div>
      <div className="relative container mx-auto p-4">


        <div className="bg-white/20 backdrop-blur rounded-lg border border-emerald-500/20 p-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 text-emerald-500">Mask ID</th>
                <th className="text-left p-2 text-emerald-500">Submitter</th>
                <th className="text-left p-2 text-emerald-500">Transaction</th>
                <th className="text-left p-2 text-emerald-500">Validation Progress</th>
                <th className="text-left p-2 text-emerald-500">Status</th>
                <th className="text-left p-2 text-emerald-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => {
                const totalVotes = submission.approvalCount + submission.rejectionCount;
                const approvalPercentage = totalVotes > 0 
                  ? (submission.approvalCount / totalVotes) * 100 
                  : 0;
                const isValidated = totalVotes >= 10;
                const isAuthenticated = isValidated && approvalPercentage >= 80;

                return (
                  <tr key={submission.submissionId} className="hover:bg-emerald-500/5">
                    <td className="p-2">
                      <button 
                        onClick={() => openMaskDetails(submission)}
                        className="text-emerald-500 hover:text-emerald-600"
                      >
                        Mask #{submission.submissionId}
                      </button>
                    </td>
                    <td className="p-2">
                      <Address address={submission.submitter} />
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col">
                      <span className="text-sm">Ref: {submission.ipfsHash}</span>
                        {submission.txHash ? (
                          <a 
                            href={`https://sepolia.etherscan.io/tx/${submission.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-500 hover:text-emerald-600 text-sm"
                          >
                            View Transaction
                          </a>
                        ) : (
                          <span className="text-base-content/60 text-sm">Transaction not found</span>
                        )}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span>Progress: {totalVotes}/10 votes</span>
                          <span>{Math.round(approvalPercentage)}% Approved</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              isValidated 
                                ? approvalPercentage >= 80 
                                  ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                                  : 'bg-gradient-to-r from-red-500 to-red-600'
                                : 'bg-gradient-to-r from-emerald-500 to-green-600'
                            }`}
                            style={{width: `${Math.min(totalVotes * 10, 100)}%`}}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={isValidated 
                        ? isAuthenticated 
                          ? 'text-emerald-500' 
                          : 'text-red-500'
                        : 'text-base-content/60'
                      }>
                        {isValidated 
                          ? (isAuthenticated ? 'Authenticated' : 'Rejected')
                          : `${10 - totalVotes} more votes needed`
                        }
                      </span>
                    </td>
                    <td className="p-2">
                      {!submission.isCompleted && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleValidation(submission.submissionId, true)}
                            disabled={validating}
                            className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-sm transition-all disabled:opacity-50"
                          >
                            Validate
                          </button>
                          <button
                            onClick={() => handleValidation(submission.submissionId, false)}
                            disabled={validating}
                            className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm transition-all disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {submissions.length === 0 && (
            <p className="text-center mt-8 text-base-content/60">No masks currently awaiting validation.</p>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4 text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>
        {selectedMask && <MaskDetailsModal />}
      </div>
    </div>
  );
}