import Image from 'next/image';

export default function Section4() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-8 bg-green-50">
      {/* Text Section */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-black">Empower Farmers!</h2>
        <p className="text-gray-700 mt-3 max-w-md leading-relaxed">
          We uplift farmers by ensuring 
          <span className="font-semibold"> fair pricing, transparent logistics, and sustainable practices.</span>  
          Our goal is to create a 
          <span className="font-semibold"> strong and self-reliant farming community</span> with direct market access.
        </p>
        <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-700 transition">
          Support Farmers
        </button>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <Image src="/empower.png" alt="Empower Farmers" width={350} height={250} className="rounded-md shadow-lg" />
      </div>
    </section>
  );
}
