import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { FileText, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function ServiceCharters() {
  const { data: downloads, isLoading } = useQuery<any[]>({
    queryKey: [api.downloads.list.path],
  });

  const charters = downloads?.filter((d: any) => d.category === "Service Charter") || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">Transparency</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2 mb-4">Service Charters</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Our commitment to providing quality technical and vocational training services to our stakeholders with excellence and efficiency.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {charters.map((charter) => (
              <Card key={charter.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full bg-white">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl font-display font-bold text-gray-900 leading-tight">{charter.title}</CardTitle>
                  <CardDescription className="text-primary font-medium mt-2 uppercase tracking-wide text-xs">BTTI Institutional Standard</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 mt-auto">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 justify-between hover:bg-primary hover:text-white border-primary/20 group/btn rounded-xl text-primary font-bold transition-all"
                    asChild
                  >
                    <a href={charter.fileUrl} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center gap-3">
                        <FileText className="w-5 h-5" />
                        Download Charter
                      </span>
                      <Download className="w-5 h-5 group-hover/btn:translate-y-0.5 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
