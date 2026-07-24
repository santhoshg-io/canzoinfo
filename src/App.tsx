import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
const DevTools = lazy(() => import("agentation").then((m) => ({ default: m.Agentation })));

const Index = lazy(() => import("./pages/Index"));
const StudentPage = lazy(() => import("./pages/StudentPage"));
const CollegesCanteensPage = lazy(() => import("./pages/CollegesCanteensPage"));
const InternshipPage = lazy(() => import("./pages/InternshipPage"));
const InternshipApplyPage = lazy(() => import("./pages/InternshipApplyPage"));
const CertificateVerifyPage = lazy(() => import("./pages/CertificateVerifyPage"));
const WorkDetailPage = lazy(() => import("./pages/WorkDetailPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const CareersApplyPage = lazy(() => import("./pages/CareersApplyPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/student" element={<StudentPage />} />
                <Route path="/colleges-canteens" element={<CollegesCanteensPage />} />
                <Route path="/internship" element={<InternshipPage />} />
                <Route path="/internship/apply" element={<InternshipApplyPage />} />
                <Route path="/internship/verify" element={<CertificateVerifyPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/careers/apply" element={<CareersApplyPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/our-work/:slug" element={<WorkDetailPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <DevTools />
        </Suspense>
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
