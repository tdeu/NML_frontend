import React, { useState, useEffect } from 'react';
import { modelService } from '../services/modelService';

const MaskUpload = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModelReady, setIsModelReady] = useState(false);

  useEffect(() => {
    const initModel = async () => {
      try {
        await modelService.initializeTensorFlow();
        await modelService.loadModel('https://tdeu.github.io/model-hosting/model/model.json');
        setIsModelReady(true);
      } catch (err) {
        setError('Failed to initialize AI model');
        console.error('Model initialization error:', err);
      }
    };

    initModel();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isModelReady) {
      setError('Model not ready yet. Please wait.');
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create an image element
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      // Wait for image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Get prediction
      const result = await modelService.predict(img);
      const predictions = await (result as any).data();
      setPrediction(predictions[0] > 0.5 ? 'Mask Detected' : 'No Mask Detected');
      
      // Clean up
      URL.revokeObjectURL(img.src);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Upload Image for Mask Detection
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={!isModelReady || isLoading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </div>
      
      {!isModelReady && !error && (
        <div className="text-blue-600">Initializing AI model...</div>
      )}
      
      {isLoading && (
        <div className="text-blue-600">Processing image...</div>
      )}
      
      {error && (
        <div className="text-red-500 p-2 rounded bg-red-50">
          Error: {error}
        </div>
      )}
      
      {prediction && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <h3 className="font-bold text-green-800">Result:</h3>
          <p className="text-green-700">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default MaskUpload;