'use client';
import { motion } from 'framer-motion';

const stats = [
  { value: '10,000+', label: 'Farmers Empowered' },
  { value: '45%', label: 'Average Income Increase' },
  { value: '500+', label: 'Communities Impacted' },
  { value: '1M+', label: 'Tons of Produce Sold' },
];

export default function FarmerImpactSection3() {
  return (
    <section className="py-12 px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-800 mb-8"
        >
          By The Numbers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-5xl font-bold text-green-600 mb-2">{stat.value}</p>
              <p className="text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
