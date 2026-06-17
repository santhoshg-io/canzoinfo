import BrandStrip from "@/components/BrandStrip";
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

const Index = () => {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <BrandStrip />
      <HeroSection />
      <div className="stack-card" style={{ zIndex: 2 }}><Reveal><ProblemSolution /></Reveal></div>
      <div className="stack-card" style={{ zIndex: 3 }}><Reveal><FeaturesSection /></Reveal></div>
      <div className="stack-card" style={{ zIndex: 4 }}><Reveal><HowItWorks /></Reveal></div>
      <div className="stack-card" style={{ zIndex: 5 }}><Reveal><EcosystemSection /></Reveal></div>
      <div className="stack-card" style={{ zIndex: 6 }}><Reveal><ScreenshotsSection /></Reveal></div>
      <div className="stack-card" style={{ zIndex: 7 }}><Reveal><OurWorkSection /></Reveal></div>
      <div className="stack-card" style={{ zIndex: 8 }}><Reveal><DownloadAppSection /></Reveal></div>
      <div className="stack-card" style={{ zIndex: 9 }}><Reveal><CTASection /></Reveal></div>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
