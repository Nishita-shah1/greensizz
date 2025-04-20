'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const listItems = [
  'Ensuring competitive fair pricing during demand spikes',
  'Providing direct market access to maximize profits',
  'Implementing transparent logistics that farmers can trust',
  'Promoting sustainable practices for future generations',
];

export default function FarmerImpactSection4() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-8 md:p-12 bg-green-50">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2 space-y-4 md:pr-10"
      >
        <h2 className="text-4xl font-bold text-green-800">
          Empowering <span className="text-green-600">Farmers!</span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-700 text-lg leading-relaxed"
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
          className="space-y-3 text-gray-700"
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
              <span className="text-green-600 mr-2">✓</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
        className="md:w-1/2 flex justify-center mt-8 md:mt-0"
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
    </section>
  );
}
