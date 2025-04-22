// components/SdgSection1.tsx
import React from 'react';
import Image from 'next/image';

const SdgSection1: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-green-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-16 h-16 bg-green-200 rounded-full animate-float1 opacity-30"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-green-300 rounded-full animate-float2 opacity-20"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-400 rounded-full animate-float3 opacity-25"></div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-bounceIn">
            SDG 1
          </span>
          <h2 className="text-4xl font-bold text-gray-900 animate-fadeInUp delay-100">
            No Poverty
          </h2>
          <p className="text-lg text-gray-600 animate-fadeInUp delay-200">
            86% of Indian farmers are small/marginal (owning 2 hectares). Our solution increases income through direct market access.
          </p>
          <div className="animate-fadeInUp delay-300">
            <p className="text-sm text-gray-500 mb-2">
              Source: 
              <a 
                href="https://agcensus.nic.in/document/agcen1516/T1_ac_2015_16.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-green-600 hover:underline font-medium"
              >
                Agricultural Census 2015-16
              </a>
            </p>
            <a
              href="https://sdgs.un.org/goals/goal1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              <span>Learn more about SDG 1</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        <div className="animate-zoomIn">
          <Image 
            src="/empower.png" 
            alt="Empowering farmers through direct market access"
            width={600}
            height={400}
            className="rounded-lg shadow-xl transform transition-transform hover:scale-105 duration-500"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default SdgSection1;