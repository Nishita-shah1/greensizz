"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SdgSection4: React.FC = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 }
  };

  const itemRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          {/* Image on left (mobile: bottom) */}
          <motion.div 
            className="order-2 md:order-1"
            variants={itemLeft}
            transition={{ type: "spring", stiffness: 60 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Image 
                src="/empower.png" 
                alt="Climate action"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-lg shadow-md border border-teal-100"
              >
                <span className="font-medium text-teal-700">Carbon reduction:</span>
                <span className="ml-2">35% since 2020</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content on right (mobile: top) */}
          <motion.div 
            className="space-y-6 order-1 md:order-2"
            variants={itemRight}
          >
            <motion.span 
              className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              SDG 13
            </motion.span>
            
            <motion.h2 
              className="text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Climate Action
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Minimizing carbon emissions by 35% through eco-efficient logistics and localized sourcing.
            </motion.p>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.7, duration: 1 }}
              className="h-1 bg-teal-500 rounded-full"
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="pt-2"
            >
              <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Learn about our initiatives
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SdgSection4;