'use client';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FarmerImpactSection1() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants with TypeScript types
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageAnimation: Variants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: isMobile ? 0.5 : 0.8, ease: "easeOut" },
    },
  };

  const benefits = [
    "Reducing <strong>middlemen costs</strong> by up to 40%",
    "Providing <strong>real-time market data</strong> to farmers",
    "Creating <strong>direct buyer connections</strong>"
  ];

  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-24 px-8 md:px-12 bg-white overflow-hidden">
      {/* Image Section with animation */}
      <motion.div
        className="md:w-1/2 flex justify-center mb-8 md:mb-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
        variants={imageAnimation}
      >
        <div className="relative w-full max-w-md">
          <Image 
            src="/empower.png" 
            alt="Farmer in field" 
            width={500} 
            height={350} 
            className="rounded-lg shadow-xl"
            priority
            quality={85}
          />
        </div>
      </motion.div>
      
      {/* Text Section with staggered animations */}
      <motion.div
        className="md:w-1/2 space-y-4 md:pl-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
        variants={container}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-green-800"
          variants={item}
        >
          Transforming <span className="text-green-600">Agriculture</span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-700 text-base md:text-lg leading-relaxed"
          variants={item}
        >
          Our platform is revolutionizing the way farmers connect with markets:
        </motion.p>
        
        <motion.ul 
          className="space-y-3 text-gray-700"
          variants={container}
        >
          {benefits.map((text, index) => (
            <motion.li 
              key={index}
              className="flex items-start"
              variants={item}
            >
              <span className="text-green-600 mr-2">✓</span>
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div 
          className="pt-4"
          variants={item}
        >
          <motion.button 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn How It Works
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}