import Image from 'next/image';

export default function Section6() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-16 p-8 bg-white">
      {/* Text Section */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-gray-900">Tech-Driven Food Supply</h2>
        <p className="text-gray-700 mt-3">
          Our AI-powered logistics system optimizes food distribution by ensuring minimal wastage,  
          efficient delivery routes, and real-time tracking. This smart technology supports  
          <span className="font-semibold text-green-700"> sustainable food supply chains</span>,  
          reducing environmental impact and enhancing food accessibility.
        </p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <Image src="/powerbytech.png" alt="Technology Delivery" width={350} height={250} className="rounded-md shadow-lg" />
      </div>
    </section>
  );
}
