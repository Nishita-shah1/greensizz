import PredictionDashboard from '@/components/PricePrediction/PredictionDashboard';
import Nav from '@/components/Nav';
import WhiteLine from '@/components/WhiteLine';
import Section7 from '@/components/Section7';

export default function PricePredictionPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <WhiteLine />
      <PredictionDashboard />
      <Section7 />
    </div>
  );
}