// pages/why-choose-us/page.tsx
'use client';

import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import ImpactStatsSection from '@/components/ImpactStatsSection';
import TestimonialSection from '@/components/TestimonialSection';
import Section2 from '@/components/Section2';
import CTASection from '@/components/CTASection';
import Section7 from '@/components/Section7';
import FarmerImpactSection1 from '@/components/FarmerImpact/FarmerImpactSection1';
import FarmerImpactSection2 from '@/components/FarmerImpact/FarmerImpactSection2';
import FarmerImpactSection3 from '@/components/FarmerImpact/FarmerImpactSection3';
import FarmerImpactSection4 from '@/components/FarmerImpact/FarmerImpactSection4';
import FarmerImpactSection5 from '@/components/FarmerImpact/FarmerImpactSection5';
import WhiteLine from '@/components/WhiteLine';

const FarmerImpact = () => {
  const impactStats = [
    { value: "1200+", label: "Farmers Empowered" },
    { value: "85%", label: "Reduction in Food Waste" },
    { value: "40%", label: "Income Increase for Farmers" },
    { value: "99%", label: "Customer Satisfaction" }
  ];

  const farmerBenefits = [
    {
      title: "Fair & Timely Payments",
      image: "/farmer-payments.png",
      description: "Receive payments directly to your account within 24 hours of delivery",
      stats: "No more delayed payments or middlemen cuts",
      icon: "💸"
    },
    {
      title: "Market Access",
      image: "/market-access.png",
      description: "Connect directly with restaurants and retailers across your region",
      stats: "Access to 300+ verified buyers in our network",
      icon: "🛒"
    },
    {
      title: "Price Transparency",
      image: "/price-transparency.png",
      description: "Real-time market prices with no hidden deductions",
      stats: "Earn 20-30% more than traditional mandis",
      icon: "📈"
    },
    {
      title: "Reduced Waste",
      image: "/reduced-waste.png",
      description: "Our demand forecasting helps you plan crops better",
      stats: "Up to 85% reduction in unsold produce",
      icon: "♻️"
    },
    {
      title: "Smart Farming Support",
      image: "/farming-support.png",
      description: "Get agronomy advice and weather alerts through our app",
      stats: "Increase yields by 15-20% with our insights",
      icon: "🌾"
    },
    {
      title: "Logistics Simplified",
      image: "/farm-logistics.png",
      description: "We handle pickup, transportation and delivery",
      stats: "Save 5-8 hours per week on market trips",
      icon: "🚚"
    }
  ];

  const testimonials = [
    {
      quote: "Our income increased by 40% since joining AgriConnect's network.",
      name: "Rajesh Kumar",
      role: "Farmer, Punjab",
      avatar: "/farmer-avatar.jpg"
    },
    {
      quote: "The transparency in pricing has transformed our procurement process.",
      name: "Priya Sharma",
      role: "Restaurant Owner, Delhi",
      avatar: "/chef-avatar.jpg"
    },
    {
      quote: "Finally a solution that benefits everyone in the supply chain.",
      name: "Amit Patel",
      role: "Logistics Partner",
      avatar: "/logistics-avatar.jpg"
    }
  ];

  return (
    <div className="bg-green-50">
      <Nav />
      <WhiteLine/>
      <FarmerImpactSection1 />
      <FarmerImpactSection2 />
      <FarmerImpactSection3 />
      <FarmerImpactSection4 />
      <FarmerImpactSection5 />
      
      {/* Farmer-Centric Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">How We Empower Farmers</h2>
          <p className="text-lg text-green-600 max-w-3xl mx-auto">
            Our platform is designed specifically to address the challenges farmers face in traditional supply chains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farmerBenefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <img src={benefit.image} alt={benefit.title} className="h-full w-full object-cover"/>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{benefit.icon}</span>
                  <h3 className="text-xl font-semibold text-green-800">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <p className="text-green-600 font-medium">{benefit.stats}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ImpactStatsSection impactStats={impactStats} />
      <TestimonialSection testimonials={testimonials} />
      <Section7 />
    </div>
  );
};

export default FarmerImpact;