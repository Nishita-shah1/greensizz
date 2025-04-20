'use client'; // Required for animations in Next.js 13+
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FarmerImpactSection1() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-8 md:p-12 bg-white pt-30">
      {/* Image Section with animation */}
      <motion.div
        className="md:w-1/2 flex justify-center mb-8 md:mb-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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
          />
        </div>
      </motion.div>
      
      {/* Text Section with staggered animations */}
      <motion.div
        className="md:w-1/2 space-y-4 md:pl-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <motion.h2 
          className="text-4xl font-bold text-green-800"
          variants={item}
        >
          Transforming <span className="text-green-600">Agriculture</span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-700 text-lg leading-relaxed"
          variants={item}
        >
          Our platform is revolutionizing the way farmers connect with markets:
        </motion.p>
        
        <motion.ul 
          className="space-y-3 text-gray-700"
          variants={container}
        >
          <motion.li 
            className="flex items-start"
            variants={item}
          >
            <span className="text-green-600 mr-2">✓</span>
            <span>Reducing <strong>middlemen costs</strong> by up to 40%</span>
          </motion.li>
          <motion.li 
            className="flex items-start"
            variants={item}
          >
            <span className="text-green-600 mr-2">✓</span>
            <span>Providing <strong>real-time market data</strong> to farmers</span>
          </motion.li>
          <motion.li 
            className="flex items-start"
            variants={item}
          >
            <span className="text-green-600 mr-2">✓</span>
            <span>Creating <strong>direct buyer connections</strong></span>
          </motion.li>
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