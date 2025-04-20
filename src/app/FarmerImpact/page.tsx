import React from 'react';
import FarmerImpactSection1 from '@/components/FarmerImpact/FarmerImpactSection1';
import FarmerImpactSection2 from '@/components/FarmerImpact/FarmerImpactSection2';
import FarmerImpactSection3 from '@/components/FarmerImpact/FarmerImpactSection3';
import FarmerImpactSection4 from '@/components/FarmerImpact/FarmerImpactSection4';
import FarmerImpactSection5 from '@/components/FarmerImpact/FarmerImpactSection5';
import Nav from '@/components/Nav';
import Section7 from '@/components/Section7';

const FarmerImpact = () => {
  return (
    <div className="bg-green-50">
      <Nav/>
      <FarmerImpactSection1 />
      <FarmerImpactSection2 />
      <FarmerImpactSection3 />
      <FarmerImpactSection4 />
      <FarmerImpactSection5 />
      <Section7 />
    </div>
  );
};

export default FarmerImpact;