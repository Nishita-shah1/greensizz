'use client';

import { motion } from 'framer-motion';

interface ImpactStatsSectionProps {
  impactStats: { value: string; label: string }[];
}

const ImpactStatsSection: React.FC<ImpactStatsSectionProps> = ({ impactStats }) => {
  return (
    <motion.section
      className="py-16 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-4xl md:text-5xl font-bold text-green-700 mb-2"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ImpactStatsSection;