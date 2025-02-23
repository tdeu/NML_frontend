declare module '@tensorflow/tfjs' {
    interface Tensor {
      data(): Promise<Float32Array>;
    }
  }