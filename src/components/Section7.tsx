'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const companyName = "AgriConnect";

  const missionItems = [
    "Empowering farmers",
    "Enabling sustainability",
    "Ensuring food security"
  ];

  return (
    <footer className="bg-gradient-to-b from-[#e4ede4] to-[#c0d8c0] py-12 text-gray-700 border-t border-green-200 mt-auto">
      <div className="container mx-auto px-4">
        {/* Mission Statement - Fixed overlapping dots */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "20px" }}
        >
          {missionItems.map((item, index) => (
            <motion.div
              key={item}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.3,
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="w-3 h-3 mr-2 flex-shrink-0 overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-green-600 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}  // Reduced scale
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </div>
              <span className="text-lg font-medium">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Information - Reduced hover scale */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true, margin: "20px" }}
        >
          {[
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
              text: "info@yourcompany.com",
              href: "mailto:info@yourcompany.com"
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
              text: "+91-XXXXXXXXXX",
              href: "tel:+91-XXXXXXXXXX"
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
              text: "www.yourcompany.com",
              href: "https://www.yourcompany.com"
            }
          ].map((contact, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}  // Reduced from 1.05
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
                <svg className="w-6 h-6 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {contact.icon}
                </svg>
                <a href={contact.href} className="hover:text-green-700 block">
                  {contact.text}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Links */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "20px" }}
        >
          {['Home', 'Why Choose Us', 'Farmer Impact', 'SDG Goals', 'About Us', 'Contact'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/${item.toLowerCase().replace(' ', '-')}`} 
                className="px-3 py-1 rounded-full hover:bg-green-100 hover:text-green-800 transition-colors block"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media Links */}
        <motion.div 
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true, margin: "20px" }}
        >
          {[
            { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
            { name: 'Twitter', icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
            { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href="#"
              className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all block"
              whileHover={{ y: -3 }}  // Reduced from -5
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              aria-label={social.name}
            >
              <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24">
                <path d={social.icon} fill="currentColor" />
              </svg>
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "20px" }}
        >
          <p className="mb-2">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
          <motion.p 
            className="text-sm"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Ghaziabad, Uttar Pradesh, India
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}