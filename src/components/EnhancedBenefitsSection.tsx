'use client';

import { motion } from 'framer-motion';

interface EnhancedBenefit {
  title: string;
  image: string;
  description: string;
  stats: string;
  icon: string;
}

interface EnhancedBenefitsSectionProps {
  detailedBenefits: EnhancedBenefit[];
}

const EnhancedBenefitsSection: React.FC<EnhancedBenefitsSectionProps> = ({ detailedBenefits }) => {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Our Comprehensive Solutions
          </h2>
          <p className="text-xl text-green-700 max-w-3xl mx-auto">
            We address every challenge in the agricultural supply chain
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {detailedBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-green-800">{benefit.title}</h3>
                </div>
                <p className="text-green-700 mb-4">{benefit.description}</p>
                <div className="bg-green-100 rounded-lg p-3 text-green-800 font-medium">
                  {benefit.stats}
                </div>
              </div>
              <motion.div
                className="h-2 bg-gradient-to-r from-green-400 to-green-600"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedBenefitsSection;