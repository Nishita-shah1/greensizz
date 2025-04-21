'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface FarmerImpactSection1Props {}

const FarmerImpactSection1: React.FC<FarmerImpactSection1Props> = () => {
  // Animation variants with TypeScript types
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const benefits = [
    "Boosting <strong>crop yields</strong> through smart agriculture insights",
    "Facilitating <strong>access to micro-financing</strong> and insurance",
    "Empowering farmers with <strong>training and skill development programs</strong>"
  ];

  return (
    <motion.section
      className="relative flex flex-col md:flex-row items-center justify-center py-16 md:py-24 px-6 md:px-12 bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Image Section with animation */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={imageAnimation}
      >
        <div className="relative w-full max-w-md">
          <Image
            src="/empower.png" // Replace with a relevant image
            alt="Farmers examining crops"
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
        className="w-full md:w-1/2 space-y-6 md:space-y-8 md:pl-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={container}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-green-900"
          variants={item}
        >
          Nurturing{' '}
          <motion.span className="inline-block text-green-700" variants={item}>
            Growth
          </motion.span>{' '}
          for Farmers
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-green-800 leading-relaxed"
          variants={item}
        >
          We are deeply committed to the prosperity and advancement of our farming communities by:
        </motion.p>

        <motion.ul
          className="space-y-4 text-lg text-green-800"
          variants={container}
        >
          {benefits.map((text, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              variants={item}
            >
              <span className="text-green-600 mr-3 text-2xl">✓</span>
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="pt-6"
          variants={item}
        >
          <motion.button
            className="px-8 py-3 bg-green-600 text-white rounded-full font-medium text-lg shadow-lg hover:bg-green-700 transition-colors w-full md:w-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Our Initiatives
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default FarmerImpactSection1;