// components/SdgSection5.tsx
import React from 'react';

const SdgSection5: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
      <div className="max-w-4xl mx-auto text-center animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Scale Impact—Together</h2>
        <p className="text-xl mb-8">
          Join a movement that turns overproduction into profits for farmers and builds a smarter, greener food system—where every harvest fuels income, impact, and zero waste.
        </p>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
          Partner With Us
        </button>
      </div>
    </section>
  );
};

export default SdgSection5;