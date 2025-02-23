import * as tf from '@tensorflow/tfjs';

export interface PredictionResult {
  tribe: string;
  region: string;
  probability: number;
}

class ModelService {
  private tribes = [
    { tribe: 'Yoruba', region: 'Nigeria' },
    { tribe: 'Dogon', region: 'Mali' },
    { tribe: 'Dan', region: 'Ivory Coast' },
    { tribe: 'Senufo', region: 'Ivory Coast' },
    { tribe: 'Bamana', region: 'Mali' },
    { tribe: 'Baule', region: 'Ivory Coast' },
    { tribe: 'Fang', region: 'Gabon' },
    { tribe: 'Chokwe', region: 'Angola' }
  ];

  async predict(): Promise<PredictionResult[]> {
    // Shuffle array and take first 3
    const shuffled = [...this.tribes].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    // Generate random probabilities that sum to 1
    const rand1 = Math.random();
    const rand2 = Math.random() * (1 - rand1);
    const rand3 = 1 - rand1 - rand2;

    return selected.map((item, index) => ({
      ...item,
      probability: [rand1, rand2, rand3][index]
    }));
  }
}

export const modelService = new ModelService(); 