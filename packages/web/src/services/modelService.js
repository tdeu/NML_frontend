// modelService.js
import * as tf from '@tensorflow/tfjs';

class ModelService {
  constructor() {
    this.model = null;
    this.isLoading = false;
    this.error = null;
  }

  async loadModel() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.error = null;

    try {
      // Using jsDelivr CDN for better performance and CORS support
      const modelUrl = 'https://cdn.jsdelivr.net/gh/tdeu/model-hosting/model.json';
      this.model = await tf.loadLayersModel(modelUrl);
      console.log('Model loaded successfully');
      return this.model;
    } catch (error) {
      this.error = `Failed to load model: ${error.message}`;
      console.error(this.error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async preprocessImage(imageElement) {
    if (!imageElement) throw new Error('No image provided');

    // Convert the image to a tensor
    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224]) // Adjust size according to your model's requirements
      .toFloat()
      .div(255.0) // Normalize the pixel values
      .expandDims();
    
    return tensor;
  }

  async predict(imageElement) {
    if (!this.model) {
      await this.loadModel();
    }

    const tensor = await this.preprocessImage(imageElement);
    const predictions = await this.model.predict(tensor);
    
    // Clean up
    tensor.dispose();
    
    return predictions;
  }
}

export const modelService = new ModelService();