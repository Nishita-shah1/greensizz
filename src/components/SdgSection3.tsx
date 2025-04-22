"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SdgSection3: React.FC = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 px-4 bg-green-100">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div className="space-y-6" variants={item}>
            <motion.span 
              className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              SDG 12
            </motion.span>
            
            <motion.h2 
              className="text-4xl font-bold text-gray-900"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Responsible Consumption
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Reducing food waste by 75% through predictive analytics and real-time logistics optimization.
            </motion.p>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 1 }}
              className="h-1 bg-green-500 rounded-full"
            />
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Image 
              src="/empower.png" 
              alt="Responsible consumption"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-md"
            >
              <span className="font-medium text-green-700">Impact since 2022:</span>
              <span className="ml-2 text-black">1.2M tons saved</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SdgSection3;