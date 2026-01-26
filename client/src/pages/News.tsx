import { useNews } from "@/hooks/use-content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function News() {
  const { data: news, isLoading } = useNews();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navigation />

      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-16 text-center">
          <h1 className="font-display font-bold text-4xl text-gray-900 mb-4">News & Events</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Stay updated with the latest happenings, announcements, and events at BTTI.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news?.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md flex flex-col h-full">
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=500&q=60"} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary">{item.category}</Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date ? new Date(item.date).toLocaleDateString() : "Date TBD"}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">{item.content}</p>
                  
                  <Link href={`/news/${item.id}`}>
                    <a className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all text-sm group">
                      Read Full Story <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </Link>
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
