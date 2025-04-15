import Image from 'next/image';

export default function Section6() {
  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto">
        {/* Tech Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="text-green-600">Tech-Driven</span> Food Revolution
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our AI-powered platform transforms food distribution with:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Predictive analytics</strong> that reduce food waste by up to 40%</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Route optimization</strong> cutting delivery emissions by 35%</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong>Real-time tracking</strong> ensuring 98% on-time deliveries</span>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <Image 
                src="/powerbytech.png" 
                alt="AI technology optimizing food supply chain" 
                width={600} 
                height={400} 
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
                <p className="font-bold">AI-Powered Efficiency</p>
              </div>
            </div>
          </div>
        </div>

        {/* SDG Section */}
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-green-100">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Supporting <span className="text-green-600">UN SDG Goals</span>
          </h3>
          <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
            We're committed to achieving the United Nations' Sustainable Development Goals through innovative food system solutions
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SDG 1 */}
            <div className="flex items-start bg-green-50 p-6 rounded-lg">
              <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                <Image src="/sdg1.png" alt="SDG 1" width={48} height={48} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">SDG 1: No Poverty</h4>
                <p className="text-gray-700 mb-3">
                  86% of Indian farmers are small/marginal (owning 2 hectares). Our solution increases income through direct market access.
                </p>
                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  Source: Agricultural Census 2015-16
                </span>
              </div>
            </div>

            {/* SDG 2 */}
            <div className="flex items-start bg-green-50 p-6 rounded-lg">
              <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                <Image src="/sdg2.png" alt="SDG 2" width={48} height={48} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">SDG 2: Zero Hunger</h4>
                <p className="text-gray-700 mb-3">
                  India ranks 111/125 on Global Hunger Index (2023). We connect crop surplus to underserved communities via hyperlocal logistics.
                </p>
                <a href="https://www.globalhungerindex.org/india.html" className="text-green-600 text-sm font-medium hover:underline">
                  View GHI Report →
                </a>
              </div>
            </div>

            {/* SDG 12 */}
            <div className="flex items-start bg-green-50 p-6 rounded-lg">
              <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                <Image src="/sdg12.png" alt="SDG 12" width={48} height={48} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">SDG 12: Responsible Consumption</h4>
                <p className="text-gray-700">
                  Reducing food waste by 75% through predictive analytics and real-time logistics optimization.
                </p>
              </div>
            </div>

            {/* SDG 13 */}
            <div className="flex items-start bg-green-50 p-6 rounded-lg">
              <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                <Image src="/sdg13.png" alt="SDG 13" width={48} height={48} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">SDG 13: Climate Action</h4>
                <p className="text-gray-700">
                  Minimizing carbon emissions by 35% through eco-efficient logistics and localized sourcing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Let's Scale Impact—Together</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join a movement that turns overproduction into profits for farmers and builds a smarter, greener food system—where every harvest fuels income, impact, and zero waste.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
}