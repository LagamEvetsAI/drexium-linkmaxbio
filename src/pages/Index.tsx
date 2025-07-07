
import { useAuth } from "@/contexts/AuthContext";
import { NavigationHeader } from "@/components/landing/NavigationHeader";
import { FloatingButtons } from "@/components/landing/FloatingButtons";
import { HeroSection } from "@/components/landing/HeroSection";
import { DifferentialsSection } from "@/components/landing/DifferentialsSection";
import { PlansSection } from "@/components/landing/PlansSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ExamplesSection } from "@/components/landing/ExamplesSection";
import { VideoSection } from "@/components/landing/VideoSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1a1a1a] flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <NavigationHeader />
      <FloatingButtons />
      
      <main>
        <HeroSection />
        <DifferentialsSection />
        <PlansSection />
        <TestimonialsSection />
        <ExamplesSection />
        <VideoSection />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
