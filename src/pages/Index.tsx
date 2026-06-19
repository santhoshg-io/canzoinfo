
import HeroSection from "@/components/HeroSection";
import ProblemSolution from "@/components/ProblemSolution";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import EcosystemSection from "@/components/EcosystemSection";
import ScreenshotsSection from "@/components/ScreenshotsSection";
import OurWorkSection from "@/components/OurWorkSection";
import DownloadAppSection from "@/components/DownloadAppSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import StickyCTA from "@/components/StickyCTA";
import StackCard from "@/components/StackCard";

const Index = () => {
  return (
    <div className="min-h-screen pb-0">
      <HeroSection />
      <StackCard zIndex={2}><Reveal><ProblemSolution /></Reveal></StackCard>
      <StackCard zIndex={3}><Reveal><FeaturesSection /></Reveal></StackCard>
      <StackCard zIndex={4}><Reveal><HowItWorks /></Reveal></StackCard>
      <StackCard zIndex={5}><Reveal><EcosystemSection /></Reveal></StackCard>
      <StackCard zIndex={6}><Reveal><ScreenshotsSection /></Reveal></StackCard>
      <StackCard zIndex={7}><Reveal><OurWorkSection /></Reveal></StackCard>
      <StackCard zIndex={8}><Reveal><DownloadAppSection /></Reveal></StackCard>
      <StackCard zIndex={9} className="stack-card-combined">
        <CTASection />
        <Footer />
      </StackCard>
      <StickyCTA />
    </div>
  );
};

export default Index;
