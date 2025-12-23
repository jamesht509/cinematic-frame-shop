import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetaPixelProvider } from "@/components/MetaPixelProvider";
import Index from "./pages/Index";
import IndexHT from "./pages/IndexHT";
import ThankYouPDFPage from "./pages/ThankYouPDFPage";
import Login from "./pages/Login";
import Success from "./pages/Success";
import MyPurchase from "./pages/MyPurchase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MetaPixelProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ht" element={<IndexHT />} />
            <Route path="/thank-you-pdf" element={<ThankYouPDFPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sucesso" element={<Success />} />
            <Route path="/minha-compra" element={<MyPurchase />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MetaPixelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
