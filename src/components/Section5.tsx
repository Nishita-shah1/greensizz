import Image from 'next/image';

export default function Section5() {
  return (
    <section className="flex flex-col md:flex-row-reverse items-center justify-between p-8 bg-green-100">
      {/* Text Section */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-gray-900">
          Sustainable Food Systems for a <span className="text-green-600">Better Future</span>
        </h2>
        <p className="text-gray-700 mt-3 max-w-md leading-relaxed">
          We are committed to achieving the United Nations' <span className="font-semibold text-green-700">Sustainable Development Goals (SDGs)</span>  
          by reducing food waste, supporting farmers, and ensuring efficient food distribution.
        </p>

        {/* SDG Highlights */}
        <ul className="list-disc text-gray-700 mt-4 pl-5 max-w-md">
          <li><span className="font-semibold text-green-700">SDG 2:</span> Zero Hunger – Connecting fresh produce to communities in need.</li>
          <li><span className="font-semibold text-green-700">SDG 12:</span> Responsible Consumption – Reducing food waste through smart logistics.</li>
          <li><span className="font-semibold text-green-700">SDG 13:</span> Climate Action – Minimizing carbon footprints with eco-friendly supply chains.</li>
        </ul>

        {/* CTA Button */}
        <button className="mt-4 bg-green-700 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-800 transition">
          Learn More
        </button>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <Image src="/empower.png" alt="Sustainable Food Goals" width={350} height={250} className="rounded-md shadow-lg" />
      </div>
    </section>
  );
}
