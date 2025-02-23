/* eslint-disable prettier/prettier */
"use client";

import React, { useState } from 'react';
import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';

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

const generateRandomOption = (options: string[]) => {
  return options[Math.floor(Math.random() * options.length)];
};

const generateRandomTribalGroup = () => {
  const groups = ['Yoruba', 'Dogon', 'Dan', 'Senufo', 'Bamana', 'Baule'];
  return groups[Math.floor(Math.random() * groups.length)];
};

export default function MaskSubmissionPage() {
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
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock predictions
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

    setStatus('Submitting to blockchain...');
    // Add your blockchain submission logic here
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Mask Authentication</h1>
        
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Mask Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {maskImage && (
            <div className="mb-4">
              <img 
                src={maskImage} 
                alt="Uploaded mask" 
                className="max-w-md mx-auto rounded shadow-lg" 
              />
            </div>
          )}

          <button 
            onClick={handleAnalysis} 
            disabled={!maskImage}
            className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              !maskImage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            {!maskImage ? 'Please Upload an Image' : 'Analyze Mask'}
          </button>
        </div>

        {aiPrediction && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">AI Analysis Results</h2>
            
            <div className="space-y-6">
              {aiPrediction.predictions.map((pred, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">
                      {`${index + 1}. ${pred.region}/${pred.tribalGroup}`}
                    </span>
                    <span>{(pred.probability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-green-600' : 
                        index === 1 ? 'bg-blue-600' : 'bg-yellow-600'
                      }`}
                      style={{width: `${pred.probability * 100}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Submit to Blockchain</h2>
          <input
            type="text"
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
            placeholder="Name your Mask"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <button 
            onClick={handleSubmitMask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Submit Mask
          </button>
          {status && <p className="mt-4">{status}</p>}
        </div>
      </div>
    </main>
  );
}