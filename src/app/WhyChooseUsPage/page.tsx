// pages/why-choose-us/page.tsx
'use client';

import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import ImpactStatsSection from '@/components/ImpactStatsSection';
import EnhancedBenefitsSection from '@/components/EnhancedBenefitsSection';
import TestimonialSection from '@/components/TestimonialSection';
import Section2 from '@/components/Section2'; // Your existing Section2
import CTASection from '@/components/CTASection';
import Section7 from '@/components/Section7';
import WhiteLine from '@/components/WhiteLine';

const WhyChooseUsPage = () => {
  const impactStats = [
    { value: "1200+", label: "Farmers Empowered" },
    { value: "85%", label: "Reduction in Food Waste" },
    { value: "40%", label: "Income Increase for Farmers" },
    { value: "99%", label: "Customer Satisfaction" }
  ];

  const detailedBenefits = [
    {
      title: "Farm Fresh Produce",
      image: "/farm-fresh.png",
      description: "Direct from local farms within 24 hours of harvest",
      stats: "98% freshness guarantee",
      icon: "🌱"
    },
    {
      title: "Transparent Pricing",
      image: "/pricing.png",
      description: "Real-time market pricing with no hidden fees",
      stats: "20% better prices than traditional markets",
      icon: "💸"
    },
    {
      title: "Automated Scheduling",
      image: "/scheduling.png",
      description: "AI-powered delivery optimization",
      stats: "Reduces delivery times by 35%",
      icon: "⏱️"
    },
    {
      title: "Live Tracking",
      image: "/tracking.png",
      description: "GPS-enabled from farm to your location",
      stats: "99.9% on-time delivery rate",
      icon: "📍"
    },
    {
      title: "Smart Invoicing",
      image: "/invoicing.png",
      description: "Automated digital records with blockchain",
      stats: "100% payment transparency",
      icon: "📊"
    },
    {
      title: "24/7 Support",
      image: "/support.png",
      description: "Dedicated relationship managers",
      stats: "2-minute average response time",
      icon: "📞"
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
      <HeroSection />
      <ImpactStatsSection impactStats={impactStats} />
      <EnhancedBenefitsSection detailedBenefits={detailedBenefits} />
      <TestimonialSection testimonials={testimonials} />
      <Section2 /> {/* Your existing Section2 */}
      <CTASection />
      <Section7/>
    </div>
  );
};

export default WhyChooseUsPage;