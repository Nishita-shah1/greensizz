// pages/home/page.tsx
import Nav from '@/components/Nav';
import WhiteLine from '@/components/WhiteLine';
import SdgSection1 from '@/components/SdgSection1';
import SdgSection2 from '@/components/SdgSection2';
import SdgSection3 from '@/components/SdgSection3';
import SdgSection4 from '@/components/SdgSection4';
import SdgSection5 from '@/components/SdgSection5';
import Section7 from '@/components/Section7';

export default function Sdggoal() {
  return (
    <div className="min-h-screen">
      <Nav />
      <WhiteLine />
      
      <SdgSection1 />
      <SdgSection2 />
      <SdgSection3 />
      <SdgSection4 />
      <SdgSection5 />
      <Section7 />
    </div>
  );
}