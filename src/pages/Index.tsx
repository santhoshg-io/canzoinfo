import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import StickyCTA from "@/components/StickyCTA";
import StackCard from "@/components/StackCard";

// Lazy loaded below-the-fold components
const ProblemSolution = lazy(() => import("@/components/ProblemSolution"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const EcosystemSection = lazy(() => import("@/components/EcosystemSection"));
const ScreenshotsSection = lazy(() => import("@/components/ScreenshotsSection"));
const OurWorkSection = lazy(() => import("@/components/OurWorkSection"));
const DownloadAppSection = lazy(() => import("@/components/DownloadAppSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));

// Dynamic loader placeholder to reserve height and prevent layout shift
const SectionPlaceholder = ({ height = "400px" }: { height?: string }) => (
  <div style={{ minHeight: height }} className="w-full flex items-center justify-center bg-transparent" />
);

const Index = () => {
  return (
    <div className="min-h-screen pb-0">
      <HeroSection />
      
      <StackCard zIndex={2}>
        <Reveal>
          <Suspense fallback={<SectionPlaceholder height="500px" />}>
            <ProblemSolution />
          </Suspense>
        </Reveal>
      </StackCard>
      
      <StackCard zIndex={3}>
        <Reveal>
          <Suspense fallback={<SectionPlaceholder height="600px" />}>
            <FeaturesSection />
          </Suspense>
        </Reveal>
      </StackCard>
      
      <StackCard zIndex={4}>
        <Reveal>
          <Suspense fallback={<SectionPlaceholder height="600px" />}>
            <HowItWorks />
          </Suspense>
        </Reveal>
      </StackCard>
      
      <StackCard zIndex={5}>
        <Reveal>
          <Suspense fallback={<SectionPlaceholder height="500px" />}>
            <EcosystemSection />
          </Suspense>
        </Reveal>
      </StackCard>
      
      <StackCard zIndex={6}>
        <Reveal>
          <Suspense fallback={<SectionPlaceholder height="700px" />}>
            <ScreenshotsSection />
          </Suspense>
        </Reveal>
      </StackCard>
      
      <StackCard zIndex={7}>
        <Reveal>
          <Suspense fallback={<SectionPlaceholder height="600px" />}>
            <OurWorkSection />
          </Suspense>
        </Reveal>
      </StackCard>
      
      <StackCard zIndex={8}>
        <Reveal>
          <Suspense fallback={<SectionPlaceholder height="600px" />}>
            <DownloadAppSection />
          </Suspense>
        </Reveal>
      </StackCard>
      
      <StackCard zIndex={9} className="stack-card-combined">
        <Suspense fallback={<SectionPlaceholder height="300px" />}>
          <CTASection />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder height="400px" />}>
          <Footer />
        </Suspense>
      </StackCard>
      
      <StickyCTA />
    </div>
  );
};

export default Index;
