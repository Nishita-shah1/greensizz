'use client';

import Image from 'next/image';

export default function Section1() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-5 md:px-[200px] py-10 bg-white gap-x-[40px] text-center md:text-left">
      {/* Left Side: Text Content */}
      <div className="max-w-lg flex-1 min-w-[40px]">
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
          Sustainable <br /> Food Supply Chain!
        </h1>
        <p className="text-gray-600 mt-3">
          Connecting farmers, wholesalers & NGOs <br />
          to reduce food wastage and ensure fair distribution.
        </p>
        <button className="mt-5 px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition">
          Join the Movement
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="flex-1 flex justify-end mt-6 md:mt-0">
        <Image
          src="/delgirl.png" // Ensure the image is in the "public" folder
          alt="Sustainable Farming"
          width={300} 
          height={300}
          className="rounded-lg shadow-md max-w-full"
        />
      </div>
    </section>
  );
}
