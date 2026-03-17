import EnhancedPredictionDashboard from '@/components/PricePrediction/EnhancedPredictionDashboard';
import Nav from '@/components/Nav';
import WhiteLine from '@/components/WhiteLine';
import Section7 from '@/components/Section7';

export default function PricePredictionPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <WhiteLine />
      <EnhancedPredictionDashboard />
      <Section7 />
    </div>
  );
}