'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const benefits = [
  {
    title: "Real-Time Inventory & Pricing",
    image: "/pod.png",
    description: "Live updates of stock levels and dynamic pricing"
  },
  {
    title: "Automated Order Scheduling",
    image: "/tp.png",
    description: "Smart algorithms optimize delivery schedules"
  },
  {
    title: "Instant Order Updates",
    image: "/os.png",
    description: "Real-time alerts for all stakeholders"
  },
  {
    title: "Live Logistics Tracking",
    image: "/multi.png",
    description: "GPS-enabled tracking from farm to destination"
  },
  {
    title: "Smart Invoicing",
    image: "/support.png",
    description: "Automated digital ledger integration"
  },
  {
    title: "Consumption Analytics",
    image: "/track.png",
    description: "Data-driven insights for better planning"
  },
  {
    title: "24/7 AI Support",
    image: "/pod.png", // Reusing pod.png
    description: "Voice-based assistance anytime"
  },
  {
    title: "Verified Proof of Delivery",
    image: "/tp.png", // Reusing tp.png
    description: "Photo confirmation with geotagging"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const hoverVariants = {
  hover: {
    y: -10,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function Section2() {
  return (
    <section className="py-16 bg-green-50 px-5 md:px-[200px] overflow-hidden">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-green-800 mb-3">Why Choose Us?</h2>
        <motion.p 
          className="text-green-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Building a sustainable food supply chain with minimal wastage
        </motion.p>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-green-100"
          >
            <motion.div
              variants={hoverVariants}
              className="mb-4 bg-green-100 p-4 rounded-full"
            >
              <Image
                src={benefit.image}
                alt={benefit.title}
                width={80}
                height={80}
                className="object-contain"
              />
            </motion.div>
            <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">
              {benefit.title}
            </h3>
            <motion.p 
              className="text-green-600 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {benefit.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Storytelling Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-16 bg-green-100 rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-10"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Our Supply Chain Revolution</h3>
          <p className="text-green-700 mb-6">
            We've transformed the agricultural supply chain with:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              "Reduced Waste",
              "Increased Farmer Income",
              "Faster Deliveries",
              "Better Pricing"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg px-4 py-2 shadow-md text-green-800 font-medium"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}