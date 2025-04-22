"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SdgSection2: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && imageRef.current && contentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        }
      });

      // Background elements animation
      tl.fromTo(
        ".bg-dot-1", 
        { x: -50, y: -30, opacity: 0 },
        { x: 0, y: 0, opacity: 0.2, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
      tl.fromTo(
        ".bg-dot-2",
        { x: 50, y: 30, opacity: 0 },
        { x: 0, y: 0, opacity: 0.15, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.8"
      );

      // Content animation sequence
      tl.fromTo(
        ".sdg-badge",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
      tl.fromTo(
        ".sdg-title",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );
      tl.fromTo(
        ".sdg-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
      tl.fromTo(
        ".sdg-button",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.8)" },
        "-=0.4"
      );

      // Image animation
      tl.fromTo(
        imageRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1"
      );
      tl.fromTo(
        ".image-glow",
        { scale: 0.8, opacity: 0 },
        { scale: 1.1, opacity: 0.3, duration: 1.5, ease: "power2.out" },
        "-=1.2"
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="bg-dot-1 absolute top-1/4 left-1/4 w-8 h-8 bg-green-100 rounded-full opacity-20"></div>
        <div className="bg-dot-2 absolute bottom-1/3 right-1/4 w-12 h-12 bg-green-200 rounded-full opacity-15"></div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Image with staggered animation */}
        <div ref={imageRef} className="order-2 md:order-1 relative">
          <div className="image-glow absolute -inset-4 bg-green-50 rounded-xl opacity-0"></div>
          <Image 
            src="/empower.png" 
            alt="Zero hunger initiative"
            width={600}
            height={400}
            className="relative rounded-lg shadow-xl"
            priority
          />
        </div>

        {/* Content with sequenced animations */}
        <div ref={contentRef} className="space-y-6 order-1 md:order-2">
          <span className="sdg-badge inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium opacity-0">
            SDG 2
          </span>
          <h2 className="sdg-title text-4xl font-bold text-gray-900 opacity-0">
            Zero Hunger
          </h2>
          <p className="sdg-text text-lg text-gray-600 opacity-0">
            India ranks 111/125 on Global Hunger Index (2023). We connect crop surplus to underserved communities via hyperlocal logistics.
          </p>
          <div className="sdg-button opacity-0">
            <a 
              href="https://www.globalhungerindex.org/pdf/en/2023.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all group hover:shadow-md"
            >
              <span>View GHI Report</span>
              <svg 
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SdgSection2;