import { useCampuses } from "@/hooks/use-content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Campuses() {
  const { data: campuses, isLoading } = useCampuses();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navigation />
      
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Our Campuses</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Belgut Technical Training Institute has several campuses offering specialized training across the region.
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24 container-custom">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {campuses?.map((campus) => (
              <Card key={campus.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all group">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={campus.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&w=800&q=60"} 
                    alt={campus.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {campus.name}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">{campus.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-primary">
                    <MapPin className="w-4 h-4" /> {campus.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    {campus.description || "Providing high-quality technical education and vocational training in a modern learning environment."}
                  </p>
                  <div className="pt-4 border-t border-gray-100 flex flex-col gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" /> {campus.contactInfo || "+254 700 000 000"}
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" /> info@btti.ac.ke
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
