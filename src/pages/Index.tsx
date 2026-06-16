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

const Index = () => {
  return (
    <div className="min-h-screen">
      <BrandStrip />
      <HeroSection />
      <Reveal><ProblemSolution /></Reveal>
      <Reveal><FeaturesSection /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><EcosystemSection /></Reveal>
      <Reveal><ScreenshotsSection /></Reveal>
      <Reveal><OurWorkSection /></Reveal>
      <Reveal><DownloadAppSection /></Reveal>
      <Reveal><CTASection /></Reveal>
      <Footer />
    </div>
  );
};

export default Index;
