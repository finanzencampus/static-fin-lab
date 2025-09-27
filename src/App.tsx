import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import Instruments from "./pages/Instruments";
import Portfolio from "./pages/Portfolio";
import Quiz from "./pages/Quiz";
import Glossary from "./pages/Glossary";
import Calculator from "./pages/Calculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pb-8">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/instruments" element={<Instruments />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/calculator" element={<Calculator />} />
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
