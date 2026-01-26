import { useBoardMembers } from "@/hooks/use-content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function About() {
  const { data: members, isLoading } = useBoardMembers();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <header className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">About Us</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Get to know the history, leadership, and vision driving Belgut Technical Training Institute.
          </p>
        </div>
      </header>

      {/* Vision Mission Values */}
      <section className="py-16 md:py-24 container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Vision", text: "To be a center of excellence in Technical, Vocational and Entrepreneurship Training.", color: "bg-blue-50 border-blue-100 text-blue-800" },
            { title: "Mission", text: "To provide quality Technical, Vocational and Entrepreneurship Training for sustainable development.", color: "bg-green-50 border-green-100 text-green-800" },
            { title: "Core Values", text: "Integrity, Professionalism, Innovation, Teamwork, Equity.", color: "bg-amber-50 border-amber-100 text-amber-800" }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-2xl border ${item.color} shadow-sm`}
            >
              <h3 className="font-display font-bold text-2xl mb-4">{item.title}</h3>
              <p className="leading-relaxed font-medium">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Leadership</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mt-2">Board of Directors</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our distinguished board members providing strategic guidance and governance.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {members?.map((member) => (
                <Card key={member.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-[3/4] overflow-hidden relative bg-gray-200">
                    <img 
                      src={member.imageUrl || "/images/placeholder-avatar.png"} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm opacity-90">{member.bio || "Board Member"}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white text-center relative z-10">
                    <h3 className="font-display font-bold text-lg text-gray-900">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mt-1">{member.title}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Campuses */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900">Our Campuses</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Main Campus", "Litein Campus", "Sosiot Campus", "Masarian Campus"].map((campus) => (
              <div key={campus} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">{campus.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{campus}</h3>
                <p className="text-sm text-gray-500">Offering specialized training in various technical fields.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
