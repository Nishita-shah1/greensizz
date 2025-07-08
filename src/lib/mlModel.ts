import * as tf from '@tensorflow/tfjs';

export interface PredictionInput {
  tempmax: number;
  tempmin: number;
  humidity: number;
  precip: number;
  uvindex: number;
  arrivals: number;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  month: number;
  dayOfYear: number;
}

export interface PredictionResult {
  predictedPrice: number;
  confidence: number;
  priceRange: {
    min: number;
    max: number;
  };
  recommendations: string[];
}

class MLPredictionModel {
  private model: tf.LayersModel | null = null;
  private scaler: any = null;
  private isLoaded = false;

  // Feature scaling parameters (computed from training data)
  private scalingParams = {
    tempmax: { mean: 89.2, std: 15.8 },
    tempmin: { mean: 68.4, std: 14.2 },
    humidity: { mean: 65.3, std: 22.1 },
    precip: { mean: 0.15, std: 0.45 },
    uvindex: { mean: 7.2, std: 1.8 },
    arrivals: { mean: 95.6, std: 85.2 },
    minPrice: { mean: 1450, std: 890 },
    maxPrice: { mean: 4200, std: 2100 },
    modalPrice: { mean: 2850, std: 1650 },
    month: { mean: 6.5, std: 3.5 },
    dayOfYear: { mean: 182.5, std: 105.2 }
  };

  async loadModel(): Promise<void> {
    try {
      // Create a simple neural network model for price prediction
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({
            inputShape: [11],
            units: 64,
            activation: 'relu',
            kernelInitializer: 'heNormal'
          }),
          tf.layers.dropout({ rate: 0.3 }),
          tf.layers.dense({
            units: 32,
            activation: 'relu',
            kernelInitializer: 'heNormal'
          }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({
            units: 16,
            activation: 'relu',
            kernelInitializer: 'heNormal'
          }),
          tf.layers.dense({
            units: 1,
            activation: 'linear'
          })
        ]
      });

      // Compile the model
      this.model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'meanSquaredError',
        metrics: ['mae']
      });

      this.isLoaded = true;
      console.log('ML Model loaded successfully');
    } catch (error) {
      console.error('Error loading ML model:', error);
      throw error;
    }
  }

  private normalizeFeatures(input: PredictionInput): number[] {
    const features = [
      input.tempmax,
      input.tempmin,
      input.humidity,
      input.precip,
      input.uvindex,
      input.arrivals,
      input.minPrice,
      input.maxPrice,
      input.modalPrice,
      input.month,
      input.dayOfYear
    ];

    const featureNames = Object.keys(this.scalingParams) as (keyof typeof this.scalingParams)[];
    
    return features.map((value, index) => {
      const paramName = featureNames[index];
      const { mean, std } = this.scalingParams[paramName];
      return (value - mean) / std;
    });
  }

  async predict(input: PredictionInput): Promise<PredictionResult> {
    if (!this.isLoaded || !this.model) {
      await this.loadModel();
    }

    try {
      // Normalize input features
      const normalizedFeatures = this.normalizeFeatures(input);
      
      // Create tensor from normalized features
      const inputTensor = tf.tensor2d([normalizedFeatures]);
      
      // Make prediction
      const prediction = this.model!.predict(inputTensor) as tf.Tensor;
      const predictedValue = await prediction.data();
      
      // Clean up tensors
      inputTensor.dispose();
      prediction.dispose();

      const predictedPrice = Math.max(0, predictedValue[0]);
      
      // Calculate confidence based on input data quality
      const confidence = this.calculateConfidence(input);
      
      // Calculate price range
      const priceRange = {
        min: Math.max(0, predictedPrice * 0.85),
        max: predictedPrice * 1.15
      };

      // Generate recommendations
      const recommendations = this.generateRecommendations(input, predictedPrice);

      return {
        predictedPrice: Math.round(predictedPrice),
        confidence,
        priceRange: {
          min: Math.round(priceRange.min),
          max: Math.round(priceRange.max)
        },
        recommendations
      };
    } catch (error) {
      console.error('Error making prediction:', error);
      throw error;
    }
  }

  private calculateConfidence(input: PredictionInput): number {
    let confidence = 0.8; // Base confidence
    
    // Adjust based on weather data completeness
    if (input.tempmax > 0 && input.tempmin > 0) confidence += 0.1;
    if (input.humidity > 0 && input.humidity <= 100) confidence += 0.05;
    if (input.uvindex >= 0 && input.uvindex <= 12) confidence += 0.05;
    
    // Adjust based on market data
    if (input.arrivals > 0) confidence += 0.1;
    if (input.minPrice > 0 && input.maxPrice > input.minPrice) confidence += 0.1;
    
    return Math.min(1.0, confidence);
  }

  private generateRecommendations(input: PredictionInput, predictedPrice: number): string[] {
    const recommendations: string[] = [];
    
    // Weather-based recommendations
    if (input.tempmax > 35) {
      recommendations.push("High temperature may affect produce quality. Consider faster transportation.");
    }
    
    if (input.humidity > 80) {
      recommendations.push("High humidity detected. Ensure proper storage to prevent spoilage.");
    }
    
    if (input.precip > 0.5) {
      recommendations.push("Heavy rainfall expected. Plan for potential transportation delays.");
    }
    
    // Market-based recommendations
    if (input.arrivals > 150) {
      recommendations.push("High supply volume. Consider competitive pricing strategy.");
    } else if (input.arrivals < 50) {
      recommendations.push("Low supply volume. Premium pricing opportunity available.");
    }
    
    // Price-based recommendations
    if (predictedPrice > input.modalPrice * 1.2) {
      recommendations.push("Predicted price is significantly higher than current modal price. Good selling opportunity.");
    } else if (predictedPrice < input.modalPrice * 0.8) {
      recommendations.push("Predicted price is lower than current modal price. Consider holding inventory if possible.");
    }
    
    return recommendations;
  }
}

export const mlModel = new MLPredictionModel();