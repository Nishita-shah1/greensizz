import Image from 'next/image';

export default function Section4() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-8 md:p-12 bg-gradient-to-br from-green-50 to-green-100">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-4 md:pr-10">
        <h2 className="text-4xl font-bold text-green-800">
          Empowering <span className="text-green-600">Farmers!</span>
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Every harvest tells a story of hard work and hope. We're rewriting that story by:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Ensuring <strong>competitive fair pricing</strong> during demand spikes</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Providing <strong>direct market access</strong> to maximize profits</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Implementing <strong>transparent logistics</strong> that farmers can trust</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Promoting <strong>sustainable practices</strong> for future generations</span>
          </li>
        </ul>
        <div className="pt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Join the Movement →
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <div className="relative w-full max-w-md">
          <Image 
            src="/empower.png" 
            alt="Happy farmer holding fresh produce" 
            width={500} 
            height={350} 
            className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute -bottom-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
            <span className="font-semibold">Increase in Income</span> for partner farmers
          </div>
        </div>
      </div>
    </section>
  );
}