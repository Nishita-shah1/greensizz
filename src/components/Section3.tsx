'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    icon: "👨‍🌾",
    title: "Farmers",
    description: "Direct access to markets with real-time pricing"
  },
  {
    icon: "🏪",
    title: "Agricultural Markets",
    description: "Instant inventory updates via WhatsApp"
  },
  {
    icon: "🚚",
    title: "Logistics Partners",
    description: "Automated dispatch notifications"
  },
  {
    icon: "🛒",
    title: "Procurement Networks",
    description: "Seamless order management"
  }
];

export default function Section3() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#f0f9f0] to-[#e0f3e0] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-green-100 rounded-full opacity-15 blur-xl"></div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
        {/* Text Content */}
        <div className="lg:w-1/2 space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="text-green-600">Smart Supply Chain</span>, Powered by WhatsApp API
            </h2>
            
            <motion.p 
              className="text-lg text-gray-700 mt-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Supply chain innovations have streamlined the process through a WhatsApp API-powered platform that integrates:
            </motion.p>
          </motion.div>

          {/* Animated Feature Showcase */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border ${index === currentFeature ? 'border-green-400 bg-white shadow-md' : 'border-gray-200 bg-white/50'}`}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p 
            className="text-gray-700 mt-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            This ecosystem comes together into a single, real-time pipeline—making communication, coordination, and delivery faster, smarter, and more cost-efficient.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md font-medium flex items-center gap-2"
            >
              <span>See How It Works</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
            
            <button className="px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium flex items-center gap-2 hover:bg-green-50 transition">
              <span>Talk to Our Team</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Image/Visualization */}
        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <Image
              src="/empower.png" // Replace with your image
              alt="WhatsApp powered supply chain"
              width={600}
              height={500}
              className="rounded-xl shadow-xl"
            />
            
            {/* Animated notification bubbles */}
            <motion.div
              className="absolute -top-6 -right-6 bg-white p-3 rounded-lg shadow-md z-10"
              animate={{ 
                y: [0, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-black">New Order!</span>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-3 rounded-lg shadow-md z-10"
              animate={{ 
                y: [0, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-black">Delivery Update</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}