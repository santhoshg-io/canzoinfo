import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentPage from "./pages/StudentPage";
import CollegesCanteensPage from "./pages/CollegesCanteensPage";
import InternshipPage from "./pages/InternshipPage";
import InternshipApplyPage from "./pages/InternshipApplyPage";
import WorkDetailPage from "./pages/WorkDetailPage";
import CareersPage from "./pages/CareersPage";
import CareersApplyPage from "./pages/CareersApplyPage";
import AboutUsPage from "./pages/AboutUsPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/student" element={<StudentPage />} />
              <Route path="/colleges-canteens" element={<CollegesCanteensPage />} />
              <Route path="/internship" element={<InternshipPage />} />
              <Route path="/internship/apply" element={<InternshipApplyPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/careers/apply" element={<CareersApplyPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/our-work/:slug" element={<WorkDetailPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
