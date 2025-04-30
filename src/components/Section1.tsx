'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Section1Props {}

const Section1: React.FC<Section1Props> = () => {
  const fullText = "Turning Farmers' Overproduction into Profits";
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const words = fullText.split(' ');

  const features = [
    "Community Kitchens",
    "Gurudwaras & Bhandaras",
    "Elder Care Homes",
    "Gaushalas & Temples",
    "Mid-Day Meal Programs",
    "Hospitals & Jails",
    "Institutional Canteens"
  ];
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex(prev => (prev + 1) % words.length);
    }, 1000); // Highlight a word every 1 second
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="flex flex-col items-center justify-center px-5 py-16 bg-gradient-to-br from-[#e4ede4] to-[#d0e6d0] gap-x-[40px] text-center overflow-hidden md:flex-row md:px-[200px] md:text-left">
      {/* Left Side: Enhanced Text Content */}
      <motion.div
        className="max-w-lg flex-1 min-w-[40px] mb-8 md:mb-0"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, duration: 1 }}
      >
        <div className="mb-6">
          <motion.span
            className="text-lg font-semibold text-green-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Agricultural Revolution
          </motion.span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black mt-2 flex flex-wrap justify-center md:block">
            {words.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2 overflow-hidden"
                style={{
                  color: index === activeWordIndex ? '#f66b2a' : 'inherit',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          className="text-gray-700 mt-3 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Our tech-driven platform bridges the gap between farmers and:
        </motion.p>

        <motion.div
          className="my-6 h-12 flex justify-center md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.span
              key={feature}
              className={`absolute text-xl font-medium ${index === activeFeature ? 'text-green-600' : 'text-transparent'}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: index === activeFeature ? 0 : -20,
                opacity: index === activeFeature ? 1 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center md:items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 0px 15px rgba(184, 211, 88, 0.5)',
              transition: { duration: 0.1 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.05 }
            }}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-[#F79256] to-[#f66b2a] text-white font-medium rounded-full shadow-lg transition-all relative overflow-hidden"
          >
            <span className="relative z-10">Join the Movement</span>
            <motion.span
              className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
              whileHover={{ opacity: 0.1 }}
            />
          </motion.button>
          <p className="text-sm text-gray-500 mt-3">
            Already helping 1,200+ farmers across India
          </p>
        </motion.div>
      </motion.div>

      {/* Right Side: Enhanced Image with Story Elements */}
      <motion.div
        className="flex-1 flex justify-center mt-10 relative md:justify-end md:mt-0"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, duration: 1 }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            // Removed rotate animation here
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          <Image
            src="/section2.jpeg"
            alt="Sustainable Farming"
            width={400}
            height={400}
            className="rounded-xl shadow-xl max-w-full z-10 relative"
          />

          {/* Animated story elements */}
          <motion.div
            className="absolute -bottom-6 -left-6 bg-white p-3 rounded-lg shadow-md z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-black">Live Tracking</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute -top-6 -right-6 bg-white p-3 rounded-lg shadow-md z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8 }}
          >
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-black">Real-time Data</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Background decorative elements */}
        <motion.div
          className="absolute -z-10 w-64 h-64 bg-green-200 rounded-full blur-xl opacity-30 -bottom-20 -left-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default Section1;