"use client";

import React, { useState } from 'react';
import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import { ShieldCheckIcon, UserGroupIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const contractAddress = '0xbcdd5cc1cd0fa804ae1ea14e05922a6222a5bc9f';

const AUTHENTIFICATION_ABI = [
  {
    inputs: [{ internalType: "string", name: "ipfsHash", type: "string" }],
    name: "submitMask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

interface AIPrediction {
  predictions: Array<{
    tribalGroup: string;
    region: string;
    probability: number;
  }>;
}

const generateRandomPercentage = () => Math.floor(Math.random() * 101);
const generateRandomTribalGroup = () => {
  const groups = ['Yoruba', 'Dogon', 'Dan', 'Senufo', 'Bamana', 'Baule'];
  return groups[Math.floor(Math.random() * groups.length)];
};

export default function MaskSubmissionPage() {
  const { address: connectedAddress } = useAccount();
  const [status, setStatus] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [aiPrediction, setAiPrediction] = useState<AIPrediction | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setMaskImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async () => {
    if (!maskImage) return;
    setStatus('AI is analyzing your mask...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockPredictions = [
        {
          tribalGroup: generateRandomTribalGroup(),
          region: 'West Africa',
          probability: generateRandomPercentage() / 100
        },
        {
          tribalGroup: generateRandomTribalGroup(),
          region: 'Central Africa',
          probability: generateRandomPercentage() / 100
        }
      ];

      setAiPrediction({ predictions: mockPredictions });
      setStatus('AI analysis complete!');
    } catch (error) {
      console.error('AI analysis failed:', error);
      setStatus('Error during AI analysis. Please try again.');
    }
  };

  const handleSubmitMask = async () => {
    if (!ipfsHash) {
      setStatus('Please enter a name for your mask');
      return;
    }

    if (!window.ethereum || !connectedAddress) {
      setStatus('Please connect your wallet!');
      return;
    }

    setStatus('Submitting to blockchain...');
    
    try {
      // First request account access
      await window.ethereum.request({ 
        method: 'eth_requestAccounts',
      });

      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
      });

      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: AUTHENTIFICATION_ABI,
        functionName: 'submitMask',
        args: [ipfsHash],
        account: connectedAddress,
      });

      setStatus(`Success! Transaction: ${hash}`);
      
      // Clear the form
      setIpfsHash('');
      setMaskImage(null);
      setAiPrediction(null);
      
    } catch (err: any) {
      console.error('Error submitting to blockchain:', err);
      setStatus(err.message || 'Failed to submit to blockchain');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10"></div>
        <main className="relative flex-grow container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12 pt-8">
            <h1 className="text-5xl font-['Grenze_Gotisch'] mb-6 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              Mask Authentication
            </h1>
            <p className="text-xl mb-8 text-base-content/80">
              Verify your mask's authenticity using our AI-powered analysis system
            </p>
          </section>

          {/* Upload Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-2xl p-8 backdrop-blur border border-emerald-500/20">
              <div className="mb-8">
                <label className="block text-center mb-4 cursor-pointer">
                  <div className="p-8 border-2 border-dashed border-emerald-500/20 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="text-base-content/60">Click Here to Add Mask</div>
                  </div>
                </label>
              </div>

              {maskImage && (
                <div className="mb-6">
                  <img 
                    src={maskImage} 
                    alt="Uploaded mask" 
                    className="max-w-md mx-auto rounded-lg shadow-lg" 
                  />
                </div>
              )}

              <button 
                onClick={handleAnalysis} 
                disabled={!maskImage}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  !maskImage 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                }`}
              >
                {!maskImage ? 'Please Upload an Image' : 'Analyze Mask'}
              </button>
            </div>
          </section>

          {/* Analysis Results */}
          {aiPrediction && (
            <section className="max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-2xl p-8 backdrop-blur border border-green-500/20">
                <div className="flex items-center justify-center mb-6">
                  <ShieldCheckIcon className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-['Grenze_Gotisch'] mb-6 text-center text-green-500">AI Analysis Results</h2>
                
                <div className="space-y-6">
                  {aiPrediction.predictions.map((pred, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-lg font-medium">
                          {pred.region} - {pred.tribalGroup}
                        </span>
                        <span className="text-lg font-bold text-green-500">
                          {(pred.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200/30 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
                          style={{width: `${pred.probability * 100}%`}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Blockchain Submission */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-600/10 rounded-2xl p-8 backdrop-blur border border-teal-500/20">
              <div className="flex items-center justify-center mb-6">
                <UserGroupIcon className="w-12 h-12 text-teal-500" />
              </div>
              <h2 className="text-3xl font-['Grenze_Gotisch'] mb-6 text-center text-teal-500">Submit to Blockchain</h2>
              <input
                type="text"
                value={ipfsHash}
                onChange={(e) => setIpfsHash(e.target.value)}
                placeholder="Name your Mask"
                className="w-full mb-4 p-3 rounded-lg bg-white/80 border border-teal-500/20 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button 
                onClick={handleSubmitMask}
                className="w-full py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white transition-all"
              >
                Submit Mask
              </button>
              {status && (
                <p className="mt-4 text-center text-lg font-medium text-teal-500">{status}</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}