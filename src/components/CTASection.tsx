'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface CTASectionProps {}

const CTASection: React.FC<CTASectionProps> = () => {
  const router = useRouter();

  return (
    <motion.section
      className="py-20 bg-green-800 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your Agricultural Business?
        </motion.h2>
        <motion.p
          className="text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Join hundreds of farmers and businesses already benefiting from our platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 5px 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-green-800 rounded-full font-bold text-lg shadow-lg"
            onClick={() => router.push('/contact')}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;