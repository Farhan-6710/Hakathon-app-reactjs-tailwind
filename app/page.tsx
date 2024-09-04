import CardsSection from "@/src/components/CardsSection/CardsSection";
import HeroSection from "@/src/components/HeroSection";
import StatsSection from "@/src/components/StatsSection";
import WhyParticipate from "@/src/components/WhyParticipate";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <WhyParticipate />
      <CardsSection />
    </div>
  );
}
