import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Award, Users, Calendar, ArrowUpRight, GraduationCap } from "lucide-react";
import { useNews } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Animations
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { data: newsItems } = useNews();
  const latestNews = newsItems?.slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />
      
      {/* Update Bar */}
      <div className="bg-primary-foreground text-primary border-b border-primary/10 overflow-hidden">
        <div className="container-custom py-2 flex items-center">
          <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded uppercase mr-4 shrink-0">Urgent</span>
          <div className="whitespace-nowrap animate-marquee text-sm font-medium">
            Applications ongoing for January, May, and September intakes! Apply online today. &nbsp;&nbsp; • &nbsp;&nbsp; Graduation Ceremony to be held on December 15th.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10" />
          <motion.div 
            className="flex h-full w-[200%]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <img 
              src="/images/hero/hero1.webp" 
              alt="BTTI Campus" 
              className="w-1/2 h-full object-cover"
            />
            <img 
              src="/images/hero/hero2.webp" 
              alt="BTTI Building" 
              className="w-1/2 h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="container-custom relative h-full flex items-center z-20">
          <div className="max-w-2xl">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-6">
                <Award className="w-4 h-4" /> Center of Excellence
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="font-display font-bold text-5xl lg:text-7xl leading-[1.1] mb-6 text-white">
                Skills for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Industrialization</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                Belgut Technical Training Institute empowers the next generation of innovators with practical, industry-relevant skills for a dynamic world.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/admissions">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-12 text-lg rounded-full shadow-lg shadow-primary/30">
                    Apply Now
                  </Button>
                </Link>
                <Link href="/service-charters">
                  <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white h-12 px-8 rounded-full backdrop-blur-sm">
                    Our Charters
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Highlights */}
      <section className="py-12 bg-white relative z-30 -mt-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "CBET Modular", desc: "Competency Based Education Training tailored for industry needs." },
              { icon: Users, title: "Industry Partners", desc: "Strong linkages with leading companies for student attachments." },
              { icon: GraduationCap, title: "Certified Excellence", desc: "TVET Authority accredited institution with proven track record." },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2 text-gray-900">{stat.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Auto-Scroll */}
      <section className="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <div className="container-custom mb-8 text-center">
          <span className="text-primary font-bold uppercase tracking-wider text-xs">Our Partners & Regulators</span>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap py-4">
            {[
              { name: "TVETA", logo: "/images/partners/tveta.png" },
              { name: "KUCCPS", logo: "/images/partners/kuccps.png" },
              { name: "NTSA", logo: "/images/partners/ntsa.png" },
              { name: "Vision 2030", logo: "/images/partners/vision2030.png" },
              { name: "NG-CDF", logo: "/images/partners/ngcdf.png" },
              { name: "NITA", logo: "/images/partners/nita.png" },
            ].map((partner, i) => (
              <div key={i} className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all duration-300">
                <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              { name: "TVETA", logo: "/images/partners/tveta.png" },
              { name: "KUCCPS", logo: "/images/partners/kuccps.png" },
              { name: "NTSA", logo: "/images/partners/ntsa.png" },
              { name: "Vision 2030", logo: "/images/partners/vision2030.png" },
              { name: "NG-CDF", logo: "/images/partners/ngcdf.png" },
              { name: "NITA", logo: "/images/partners/nita.png" },
            ].map((partner, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all duration-300">
                <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              
              <img 
                src="https://pixabay.com/get/gf79750aa7f35d2d544707eca040ab84e13d5f3ed362b5cdd2a32e9e508b765a5e14f2f4c85cd12ff2c992bce249dbc050ed1a85c88aabb900885f2687513d0df_1280.png" 
                alt="Campus Life" 
                className="relative rounded-2xl shadow-2xl z-10 w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs hidden md:block border border-gray-100">
                <p className="font-serif italic text-gray-600 text-sm">"Education is the passport to the future, for tomorrow belongs to those who prepare for it today."</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <span className="text-primary font-bold uppercase tracking-wider text-sm">About BTTI</span>
              <h2 className="font-display font-bold text-4xl text-gray-900">A Tradition of Excellence in Technical Training</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Located in a serene environment conducive for learning, Belgut Technical Training Institute has established itself as a hub for innovation and technical mastery. Our diverse range of courses is designed to meet the dynamic demands of the global job market.
              </p>
              <ul className="space-y-4 pt-4">
                {["State-of-the-art Workshops", "Experienced Faculty", "Holistic Development", "Serene Learning Environment"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Link href="/about">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent font-bold uppercase tracking-wider text-sm">Updates</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mt-2">Latest News & Events</h2>
            </div>
            <Link href="/news">
              <Button variant="ghost" className="text-primary hover:text-primary/80 group">
                View All <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.length > 0 ? (
              latestNews.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors z-10" />
                      <img 
                        src={item.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=60"} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-gray-800">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {item.date ? new Date(item.date).toLocaleDateString() : "Date TBD"}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                        {item.content}
                      </p>
                      <div className="mt-4 flex items-center text-primary font-medium text-sm">
                        Read More <ArrowUpRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 italic">No news updates available at the moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container-custom relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Join thousands of students who are shaping their future with technical skills. Application is simple and online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-10 h-14 rounded-full text-lg shadow-xl shadow-black/20">
                Apply Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-10 rounded-full text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
