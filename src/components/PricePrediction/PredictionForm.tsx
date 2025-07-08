'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { mlModel, PredictionInput, PredictionResult } from '@/lib/mlModel';

interface PredictionFormProps {
  onPredictionResult: (result: PredictionResult) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredictionResult }) => {
  const [formData, setFormData] = useState<PredictionInput>({
    tempmax: 30,
    tempmin: 20,
    humidity: 65,
    precip: 0,
    uvindex: 7,
    arrivals: 100,
    minPrice: 1000,
    maxPrice: 3000,
    modalPrice: 2000,
    month: new Date().getMonth() + 1,
    dayOfYear: Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof PredictionInput, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await mlModel.predict(formData);
      onPredictionResult(result);
    } catch (err) {
      setError('Failed to generate prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { key: 'tempmax', label: 'Max Temperature (°C)', min: -10, max: 50, step: 0.1 },
    { key: 'tempmin', label: 'Min Temperature (°C)', min: -10, max: 50, step: 0.1 },
    { key: 'humidity', label: 'Humidity (%)', min: 0, max: 100, step: 1 },
    { key: 'precip', label: 'Precipitation (mm)', min: 0, max: 100, step: 0.1 },
    { key: 'uvindex', label: 'UV Index', min: 0, max: 12, step: 1 },
    { key: 'arrivals', label: 'Arrivals (Tonnes)', min: 0, max: 1000, step: 0.1 },
    { key: 'minPrice', label: 'Min Price (Rs./Quintal)', min: 0, max: 20000, step: 10 },
    { key: 'maxPrice', label: 'Max Price (Rs./Quintal)', min: 0, max: 20000, step: 10 },
    { key: 'modalPrice', label: 'Modal Price (Rs./Quintal)', min: 0, max: 20000, step: 10 },
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-green-800 mb-6">Price Prediction Parameters</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inputFields.map(({ key, label, min, max, step }) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={formData[key as keyof PredictionInput]}
                onChange={(e) => handleInputChange(key as keyof PredictionInput, parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating Prediction...
            </div>
          ) : (
            'Predict Price'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PredictionForm;