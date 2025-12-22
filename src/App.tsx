import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MetaPixelProvider } from "@/components/MetaPixelProvider";
import Index from "./pages/Index";
import IndexHT from "./pages/IndexHT";
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MetaPixelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
