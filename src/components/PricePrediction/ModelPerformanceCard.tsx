'use client';

import { motion } from 'framer-motion';
import { trainedModel } from '@/lib/trainedModel';

const ModelPerformanceCard: React.FC = () => {
  const metrics = trainedModel.getModelMetrics();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Model Performance Metrics</h3>
          <p className="text-gray-600">Advanced neural network trained on agricultural commodity data</p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Accuracy */}
        <div className="text-center">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {(metrics.accuracy * 100).toFixed(1)}%
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">Model Accuracy</div>
            <div className="text-xs text-gray-500">R² Score on test data</div>
          </div>
        </div>

        {/* Mean Absolute Error */}
        <div className="text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ₹{metrics.mae}
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">Mean Absolute Error</div>
            <div className="text-xs text-gray-500">Average prediction error</div>
          </div>
        </div>

        {/* Training Data */}
        <div className="text-center">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              50K+
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">Training Samples</div>
            <div className="text-xs text-gray-500">Historical data points</div>
          </div>
        </div>
      </div>

      {/* Model Architecture Info */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Model Architecture</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Input Features:</span>
            <span className="text-gray-600 ml-1">11</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Hidden Layers:</span>
            <span className="text-gray-600 ml-1">4</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Neurons:</span>
            <span className="text-gray-600 ml-1">128-64-32-16</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Optimizer:</span>
            <span className="text-gray-600 ml-1">Adam</span>
          </div>
        </div>
      </div>

      {/* Features Used */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Input Features</h4>
        <div className="flex flex-wrap gap-2">
          {[
            'Temperature (Max/Min)', 'Humidity', 'Precipitation', 'UV Index',
            'Market Arrivals', 'Historical Prices', 'Seasonal Factors'
          ].map((feature, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ModelPerformanceCard;