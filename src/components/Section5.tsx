import Image from 'next/image';

export default function Section5() {
  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Real <span className="text-green-600">Stories.</span> Real <span className="text-green-600">Impact.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the farmers, communities, and partners whose lives have transformed through our tech-driven supply chain.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Testimonials Section */}
          <div className="lg:w-1/2 space-y-8">
            {/* Testimonial 1 */}
            <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 italic mb-3">
                    "Before, 30% of my tomatoes would go to waste. Now with direct buyers, I sell everything at fair prices. My income has doubled in just one year!"
                  </p>
                  <p className="font-semibold text-green-700">— Rajesh Kumar, Tomato Farmer</p>
                  <div className="flex mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+120% income</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">0% waste</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 italic mb-3">
                    "As a small grocery owner, I now get fresh produce directly from farms at better prices. My customers love the quality and my profits are up 40%."
                  </p>
                  <p className="font-semibold text-green-700">— Priya Sharma, Local Grocer</p>
                  <div className="flex mt-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">+40% profit</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">95% customer satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border border-green-100 text-center">
                <p className="text-3xl font-bold text-green-600">2.5M+</p>
                <p className="text-sm text-gray-600">Pounds of food saved</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-100 text-center">
                <p className="text-3xl font-bold text-green-600">5,000+</p>
                <p className="text-sm text-gray-600">Farmers empowered</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-100 text-center">
                <p className="text-3xl font-bold text-green-600">75%</p>
                <p className="text-sm text-gray-600">Reduced waste</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-100 text-center">
                <p className="text-3xl font-bold text-green-600">2.2x</p>
                <p className="text-sm text-gray-600">Average income growth</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image 
                src="/empower.png" 
                alt="Happy farmers celebrating good harvest" 
                width={600} 
                height={400} 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-5 -right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <p className="font-bold">Since 2020</p>
                <p className="text-xs">Transforming agriculture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}