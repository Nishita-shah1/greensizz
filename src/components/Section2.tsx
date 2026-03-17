'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface Benefit {
  title: string;
  image: string;
  description: string;
}

const BENEFITS_DATA: Benefit[] = [
  { title: "Farm Fresh", image: "/pod.png", description: "Direct from farm to your location" },
  { title: "Transparent Pricing", image: "/multi.png", description: "Clear, fair pricing with no hidden costs" },
  { title: "Automated Order Scheduling", image: "/tp.png", description: "Smart algorithms optimize delivery schedules" },
  { title: "Live Logistics Tracking", image: "/track.png", description: "GPS-enabled tracking from farm to destination" },
  { title: "Smart Invoicing", image: "/support.png", description: "Automated digital ledger integration" },
  { title: "24/7 Human Support", image: "/pod.png", description: "Voice-based assistance anytime" }
];

const REVOLUTION_TAGS = [
  "Reduced Waste", "Increased Farmer Income", "Faster Deliveries",
  "Better Pricing", "Improved Transparency", "Sustainable Practices"
];

// FIXED: Animation Variants - Use proper easing types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const } // FIXED: Add 'as const'
  }
};

const iconHoverVariants: Variants = {
  hover: {
    y: -8,
    scale: 1.1,
    transition: { duration: 0.3, ease: "easeInOut" as const } // FIXED: Add 'as const'
  }
};

export default function Section2() {
  return (
    <section className="w-full py-16 bg-green-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <header className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-green-900 mb-4"
          >
            Why Choose Us?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-green-700 text-lg max-w-2xl mx-auto font-medium"
          >
            Building a sustainable food supply chain with minimal wastage and maximum transparency.
          </motion.p>
        </header>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {BENEFITS_DATA.map((benefit, index) => (
            <motion.article
              key={benefit.title}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl p-8 flex flex-col items-center border border-green-100 transition-all duration-300"
            >
              <motion.div
                variants={iconHoverVariants}
                className="mb-6 bg-green-50 rounded-2xl w-24 h-24 flex items-center justify-center relative overflow-hidden group"
              >
                <div className="relative w-14 h-14">
                  <Image
                    src={benefit.image}
                    alt="" // Decorative icon
                    fill
                    sizes="56px"
                    className="object-contain"
                    priority={index < 3} // Priority for top row
                  />
                </div>
              </motion.div>
              
              <h3 className="text-xl font-bold text-green-800 mb-3 text-center">
                {benefit.title}
              </h3>
              <p className="text-green-600 text-center leading-relaxed">
                {benefit.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Storytelling Banner */}
        <motion.footer
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-green-900 rounded-3xl p-8 md:p-12 relative overflow-hidden text-white"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.2),transparent)] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Agriculture Sector Revolution</h3>
            <p className="text-green-100 mb-10 text-lg">
              We are leveraging technology to empower producers and streamline the journey from farm to fork.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {REVOLUTION_TAGS.map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, backgroundColor: "#f0fdf4", color: "#166534" }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm md:text-base font-semibold transition-colors cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.footer>

      </div>
    </section>
  );
}