'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const listItems = [
  'Ensuring competitive fair pricing during demand spikes',
  'Providing direct market access to maximize profits',
  'Implementing transparent logistics that farmers can trust',
  'Promoting sustainable practices for future generations',
];

interface FarmerImpactSection4Props {}

export default function FarmerImpactSection4({}: FarmerImpactSection4Props) {
  return (
    <motion.section
      className="relative flex flex-col md:flex-row items-center justify-center py-16 md:py-24 px-6 md:px-12 bg-green-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 space-y-6 md:pr-10 mb-10 md:mb-0" // Added mb-10 for mobile spacing
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-green-900"
        >
          Empowering <motion.span className="inline-block text-green-700">Farmers!</motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-green-800 leading-relaxed"
        >
          Every harvest tells a story of hard work and hope. We're rewriting that story by:
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          viewport={{ once: true }}
          className="space-y-4 text-lg text-green-800"
        >
          {listItems.map((item, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="flex items-start"
            >
              <span className="text-green-600 mr-3 text-2xl">✓</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="pt-6">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-green-600 text-white rounded-full font-medium text-lg shadow-lg hover:bg-green-700 transition-colors"
          >
            Join the Movement →
          </motion.button>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
      >
        <div className="relative w-full max-w-md">
          <Image
            src="/empower.png"
            alt="Happy farmer holding fresh produce"
            width={500}
            height={350}
            className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute -bottom-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <span className="font-semibold">Increase in Income</span> for partner farmers
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}