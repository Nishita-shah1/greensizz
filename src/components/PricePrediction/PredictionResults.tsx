'use client';

import { motion } from 'framer-motion';
import { PredictionResult } from '@/lib/mlModel';

interface PredictionResultsProps {
  result: PredictionResult;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ result }) => {
  const confidenceColor = result.confidence >= 0.8 ? 'text-green-600' : 
                         result.confidence >= 0.6 ? 'text-yellow-600' : 'text-red-600';
  
  const confidenceLabel = result.confidence >= 0.8 ? 'High' : 
                         result.confidence >= 0.6 ? 'Medium' : 'Low';

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-green-800 mb-6">Prediction Results</h3>
      
      {/* Main Prediction */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 mb-6">
        <div className="text-center">
          <h4 className="text-lg font-medium text-gray-700 mb-2">Predicted Price</h4>
          <div className="text-4xl font-bold text-green-700 mb-2">
            ₹{result.predictedPrice.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600">per Quintal</p>
        </div>
      </div>

      {/* Price Range */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <h5 className="text-sm font-medium text-gray-700 mb-1">Minimum Expected</h5>
          <p className="text-xl font-bold text-blue-600">₹{result.priceRange.min.toLocaleString()}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <h5 className="text-sm font-medium text-gray-700 mb-1">Predicted Price</h5>
          <p className="text-xl font-bold text-green-600">₹{result.predictedPrice.toLocaleString()}</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <h5 className="text-sm font-medium text-gray-700 mb-1">Maximum Expected</h5>
          <p className="text-xl font-bold text-purple-600">₹{result.priceRange.max.toLocaleString()}</p>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Prediction Confidence</span>
          <span className={`text-sm font-bold ${confidenceColor}`}>
            {confidenceLabel} ({(result.confidence * 100).toFixed(1)}%)
          </span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div>
          <h5 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h5>
          <div className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-sm text-yellow-800">{recommendation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PredictionResults;