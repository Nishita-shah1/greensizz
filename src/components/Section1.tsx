'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Section1() {
  const fullText = "Turning Farmers' Overproduction into Profits";
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    "Community Kitchens",
    "Gurudwaras & Bhandaras",
    "Elder Care Homes",
    "Gaushalas & Temples",
    "Mid-Day Meal Programs",
    "Hospitals & Jails",
    "Institutional Canteens"
  ];

  useEffect(() => {
    const typingSpeed = 100;
    const pauseDuration = 2000;

    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (currentIndex < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev + fullText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
          setCurrentIndex(0);
          setDisplayedText('');
        }, pauseDuration);
      }
    } else {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, fullText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-5 md:px-[200px] py-16 bg-gradient-to-br from-[#e4ede4] to-[#d0e6d0] gap-x-[40px] text-center md:text-left overflow-hidden">
      {/* Left Side: Enhanced Text Content */}
      <motion.div
        className="max-w-lg flex-1 min-w-[40px]"
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
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black min-h-[4rem] mt-2">
            {displayedText}
            <span className="animate-pulse">|</span>
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
          className="my-6 h-12"
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
        className="flex-1 flex justify-end mt-10 md:mt-0 relative"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 50, duration: 1 }}
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          <Image
            src="/delgirl.png"
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
}