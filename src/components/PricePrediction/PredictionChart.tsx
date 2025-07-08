'use client';

import { motion } from 'framer-motion';
import { PredictionResult } from '@/lib/mlModel';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface PredictionChartProps {
  result: PredictionResult;
}

const PredictionChart: React.FC<PredictionChartProps> = ({ result }) => {
  // Generate sample historical data for visualization
  const generateHistoricalData = () => {
    const data = [];
    const basePrice = result.predictedPrice;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate realistic price variations
      const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
      const price = Math.max(0, basePrice * (1 + variation));
      
      data.push({
        date: date.toLocaleDateString(),
        price: Math.round(price),
        predicted: i === 0 ? result.predictedPrice : null
      });
    }
    
    return data;
  };

  const priceRangeData = [
    {
      name: 'Min Expected',
      value: result.priceRange.min,
      color: '#3B82F6'
    },
    {
      name: 'Predicted',
      value: result.predictedPrice,
      color: '#10B981'
    },
    {
      name: 'Max Expected',
      value: result.priceRange.max,
      color: '#8B5CF6'
    }
  ];

  const historicalData = generateHistoricalData();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-green-800 mb-6">Price Analysis Charts</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Historical Price Trend */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">30-Day Price Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={['dataMin - 200', 'dataMax + 200']}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${value?.toLocaleString()}`, 
                    name === 'price' ? 'Historical Price' : 'Predicted Price'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price Range Comparison */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Price Range Analysis</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceRangeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [`₹${value?.toLocaleString()}`, 'Price']}
                />
                <Bar 
                  dataKey="value" 
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <h5 className="text-sm font-medium text-gray-700 mb-1">Price Volatility</h5>
          <p className="text-lg font-bold text-blue-600">
            {(((result.priceRange.max - result.priceRange.min) / result.predictedPrice) * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <h5 className="text-sm font-medium text-gray-700 mb-1">Confidence Level</h5>
          <p className="text-lg font-bold text-green-600">
            {(result.confidence * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <h5 className="text-sm font-medium text-gray-700 mb-1">Risk Assessment</h5>
          <p className="text-lg font-bold text-yellow-600">
            {result.confidence >= 0.8 ? 'Low' : result.confidence >= 0.6 ? 'Medium' : 'High'}
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <h5 className="text-sm font-medium text-gray-700 mb-1">Market Outlook</h5>
          <p className="text-lg font-bold text-purple-600">
            {result.predictedPrice > (result.priceRange.min + result.priceRange.max) / 2 ? 'Bullish' : 'Bearish'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionChart;