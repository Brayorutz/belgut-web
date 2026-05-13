import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Page Imports
import Home from "@/pages/Home";
import About from "@/pages/About";
import Academics from "@/pages/Academics";
import Admissions from "@/pages/Admissions";
import Contact from "@/pages/Contact";
import News from "@/pages/News";
import Tenders from "@/pages/Tenders";
import Careers from "@/pages/Careers";
import ServiceCharters from "@/pages/ServiceCharters";
import Campuses from "@/pages/Campuses";
import Admin from "@/pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/campuses" component={Campuses} />
      <Route path="/service-charters" component={ServiceCharters} />
      <Route path="/academics" component={Academics} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/contact" component={Contact} />
      <Route path="/news" component={News} />
      <Route path="/tenders" component={Tenders} />
      <Route path="/careers" component={Careers} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
