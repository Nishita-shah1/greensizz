'use client';

import { motion } from 'framer-motion';
import { PredictionResult } from '@/lib/trainedModel';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface EnhancedPredictionResultsProps {
  result: PredictionResult;
}

const EnhancedPredictionResults: React.FC<EnhancedPredictionResultsProps> = ({ result }) => {
  const confidenceColor = result.confidence >= 0.8 ? 'text-green-600' : 
                         result.confidence >= 0.6 ? 'text-yellow-600' : 'text-red-600';
  
  const confidenceLabel = result.confidence >= 0.8 ? 'High' : 
                         result.confidence >= 0.6 ? 'Medium' : 'Low';

  // Generate sample data for charts
  const priceRangeData = [
    { name: 'Min Expected', value: result.priceRange.min, color: '#3B82F6' },
    { name: 'Predicted', value: result.predictedPrice, color: '#10B981' },
    { name: 'Max Expected', value: result.priceRange.max, color: '#8B5CF6' }
  ];

  const confidenceData = [
    { name: 'Confidence', value: result.confidence * 100, color: '#10B981' },
    { name: 'Uncertainty', value: (1 - result.confidence) * 100, color: '#EF4444' }
  ];

  const COLORS = ['#10B981', '#EF4444'];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-800">AI Prediction Results</h3>
        <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium text-green-800">Model Accuracy: {(result.modelAccuracy * 100).toFixed(1)}%</span>
        </div>
      </div>
      
      {/* Main Prediction */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 mb-6">
        <div className="text-center">
          <h4 className="text-lg font-medium text-gray-700 mb-2">Predicted Price</h4>
          <div className="text-4xl font-bold text-green-700 mb-2">
            ₹{result.predictedPrice.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600">per Quintal</p>
          <div className="mt-4 flex items-center justify-center">
            <span className="text-sm text-gray-600 mr-2">Range:</span>
            <span className="text-sm font-medium text-blue-600">₹{result.priceRange.min.toLocaleString()}</span>
            <span className="mx-2 text-gray-400">-</span>
            <span className="text-sm font-medium text-purple-600">₹{result.priceRange.max.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Price Range Chart */}
        <div>
          <h5 className="text-lg font-semibold text-gray-800 mb-3">Price Range Analysis</h5>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceRangeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [`₹${value?.toLocaleString()}`, 'Price']}
                />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Chart */}
        <div>
          <h5 className="text-lg font-semibold text-gray-800 mb-3">Prediction Confidence</h5>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={confidenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {confidenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Prediction Confidence</span>
          <span className={`text-sm font-bold ${confidenceColor}`}>
            {confidenceLabel} ({(result.confidence * 100).toFixed(1)}%)
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <h6 className="text-xs font-medium text-gray-700 mb-1">Price Volatility</h6>
          <p className="text-lg font-bold text-blue-600">
            {(((result.priceRange.max - result.priceRange.min) / result.predictedPrice) * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <h6 className="text-xs font-medium text-gray-700 mb-1">Model Accuracy</h6>
          <p className="text-lg font-bold text-green-600">
            {(result.modelAccuracy * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <h6 className="text-xs font-medium text-gray-700 mb-1">Risk Level</h6>
          <p className="text-lg font-bold text-yellow-600">
            {result.confidence >= 0.8 ? 'Low' : result.confidence >= 0.6 ? 'Medium' : 'High'}
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <h6 className="text-xs font-medium text-gray-700 mb-1">Market Outlook</h6>
          <p className="text-lg font-bold text-purple-600">
            {result.predictedPrice > (result.priceRange.min + result.priceRange.max) / 2 ? 'Bullish' : 'Bearish'}
          </p>
        </div>
      </div>

      {/* AI Recommendations */}
      {result.recommendations.length > 0 && (
        <div>
          <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Recommendations
          </h5>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-yellow-800">{recommendation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EnhancedPredictionResults;