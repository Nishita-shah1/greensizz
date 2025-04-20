import Image from 'next/image';

export default function FarmerImpactSection2() {
  return (
    <section className="flex flex-col md:flex-row-reverse items-center justify-center p-8 md:p-12 bg-green-100">
      {/* Text Section - Appearing from the right */}
      <div className="md:w-1/2 space-y-4 md:pl-10 animate-slide-in-right animate-once animate-duration-700 animate-delay-100">
        <h2 className="text-4xl font-bold text-green-800 animate-pulse animate-once animate-duration-500">
          Sustainable <span className="text-green-600">Practices</span>
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed animate-fade-in animate-once animate-duration-700 animate-delay-300">
          We're committed to environmentally friendly farming:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start animate-slide-in-left animate-once animate-duration-500 animate-delay-500">
            <span className="text-green-600 mr-2">✓</span>
            <span><strong>Organic farming</strong> training programs</span>
          </li>
          <li className="flex items-start animate-slide-in-left animate-once animate-duration-500 animate-delay-700">
            <span className="text-green-600 mr-2">✓</span>
            <span><strong>Water conservation</strong> techniques</span>
          </li>
          <li className="flex items-start animate-slide-in-left animate-once animate-duration-500 animate-delay-900">
            <span className="text-green-600 mr-2">✓</span>
            <span><strong>Soil health</strong> monitoring systems</span>
          </li>
          <li className="flex items-start animate-slide-in-left animate-once animate-duration-500 animate-delay-1100">
            <span className="text-green-600 mr-2">✓</span>
            <span><strong>Carbon footprint</strong> reduction initiatives</span>
          </li>
        </ul>
      </div>

      {/* Image Section - Fading in */}
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 animate-fade-in animate-once animate-duration-700">
        <div className="relative w-full max-w-md">
          <Image
            src="/empower.png"
            alt="Sustainable farming practices"
            width={500}
            height={350}
            className="rounded-lg shadow-xl"
          />
          {/* Notification badge - Scaling up */}
          <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md animate-scale-up animate-once animate-duration-500 animate-delay-700">
            <span className="font-semibold">2000+ Farms</span> using sustainable methods
          </div>
        </div>
      </div>
    </section>
  );
}