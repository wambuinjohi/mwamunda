import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import FairPersonalLoans from "./pages/products/FairPersonalLoans";
import ChamaLoans from "./pages/products/ChamaLoans";
import DebtAdviceServices from "./pages/products/DebtAdviceServices";
import FinancialCapabilityTraining from "./pages/products/FinancialCapabilityTraining";
import AdminSetup from "./pages/AdminSetup";
import AdminInit from "./pages/AdminInit";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/fair-personal-loans" element={<FairPersonalLoans />} />
          <Route path="/products/chama-loans" element={<ChamaLoans />} />
          <Route path="/products/debt-advice-services" element={<DebtAdviceServices />} />
          <Route path="/products/financial-capability-training" element={<FinancialCapabilityTraining />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/init" element={<AdminInit />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
