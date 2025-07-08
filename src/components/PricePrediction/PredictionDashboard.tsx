'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PredictionForm from './PredictionForm';
import PredictionResults from './PredictionResults';
import PredictionChart from './PredictionChart';
import { PredictionResult } from '@/lib/mlModel';

const PredictionDashboard: React.FC = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [showChart, setShowChart] = useState(false);

  const handlePredictionResult = (result: PredictionResult) => {
    setPredictionResult(result);
    setShowChart(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered <span className="text-green-600">Price Prediction</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leverage machine learning to predict agricultural commodity prices based on weather conditions, 
            market data, and historical trends.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <div>
            <PredictionForm onPredictionResult={handlePredictionResult} />
          </div>

          {/* Results */}
          <div>
            {predictionResult ? (
              <PredictionResults result={predictionResult} />
            ) : (
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready for Prediction</h3>
                  <p className="text-gray-500">Fill in the parameters and click "Predict Price" to get started.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Chart Section */}
        {showChart && predictionResult && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PredictionChart result={predictionResult} />
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Analysis</h3>
            <p className="text-gray-600">Get instant price predictions based on current market and weather conditions.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">High Accuracy</h3>
            <p className="text-gray-600">Machine learning model trained on extensive historical data for reliable predictions.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">Receive actionable insights and recommendations based on prediction results.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PredictionDashboard;