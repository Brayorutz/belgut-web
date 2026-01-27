import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, BookOpen, Award, Users, Calendar, ArrowUpRight, 
  GraduationCap, ChevronLeft, ChevronRight, Star, Heart, Lightbulb 
} from "lucide-react";
import { useNews } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import schoolLifeHero from "../../../attached_assets/school_life_hero_1769508223008.JPG";
import websiteHero from "../../../attached_assets/website_hero_section_1769508223005.JPG";
import studentLife1 from "../../../attached_assets/student_life_1_1769508223008.JPG";
import studentLife2 from "../../../attached_assets/student_life_2_1769508223008.JPG";
import studentLife3 from "../../../attached_assets/student_life_3_1769508223007.JPG";

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
  const [currentHero, setCurrentHero] = useState(0);
  
  const heroImages = [
    { src: websiteHero, alt: "BTTI Campus Life", title: "Excellence in Technical Education", subtitle: "Skills for Industrialization" },
    { src: schoolLifeHero, alt: "BTTI Student Event", title: "Vibrant Campus Life", subtitle: "Beyond the Classroom" }
  ];

  const nextHero = () => setCurrentHero((prev) => (prev + 1) % heroImages.length);
  const prevHero = () => setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />
      
      {/* Update Bar */}
      <div className="bg-primary text-white overflow-hidden">
        <div className="container-custom py-2 flex items-center">
          <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded uppercase mr-4 shrink-0">News</span>
          <div className="whitespace-nowrap animate-marquee text-sm font-medium">
            Applications ongoing for January, May, and September intakes! Apply online today. &nbsp;&nbsp; • &nbsp;&nbsp; Graduation Ceremony to be held on December 15th. &nbsp;&nbsp; • &nbsp;&nbsp; New Tenders released - check the Tenders page for details.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[650px] lg:h-[750px] overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentHero}
              src={heroImages[currentHero].src} 
              alt={heroImages[currentHero].alt} 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Hero Controls */}
        <div className="container-custom relative h-full flex items-center justify-between pointer-events-none z-30 px-4">
          <button 
            onClick={prevHero}
            className="pointer-events-auto p-4 rounded-full bg-black/40 text-white hover:bg-primary hover:scale-110 transition-all backdrop-blur-md border border-white/20 shadow-2xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={nextHero}
            className="pointer-events-auto p-4 rounded-full bg-black/40 text-white hover:bg-primary hover:scale-110 transition-all backdrop-blur-md border border-white/20 shadow-2xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        <div className="container-custom absolute inset-0 flex items-center z-20">
          <div className="max-w-3xl px-4 md:px-0">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-bold mb-6 shadow-xl">
                <Star className="w-4 h-4 fill-current" /> Leading TVET Institution
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="font-display font-black text-5xl lg:text-8xl leading-[1.05] mb-6 text-white text-shadow-xl drop-shadow-2xl">
                {heroImages[currentHero].title.split(" ").map((word, i) => (
                  <span key={i} className={i === 2 ? "text-accent" : ""}>{word} </span>
                ))}
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed font-medium drop-shadow-lg max-w-2xl">
                {heroImages[currentHero].subtitle}
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5">
                <Link href="/admissions">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 h-14 text-xl rounded-full shadow-2xl shadow-primary/40 group">
                    Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/academics">
                  <Button size="lg" variant="outline" className="border-white/50 bg-white/10 hover:bg-white/30 text-white h-14 px-10 rounded-full backdrop-blur-md shadow-xl font-bold text-lg">
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave Decor */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-px">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.21,103.42,115,103.41,171.21,95.8c58.58-7.94,115.37-23.3,171.21-41.86Z"></path>
          </svg>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Experience BTTI</h2>
            <p className="text-xl text-gray-600">Take a look at the vibrant life and activities at our institution.</p>
          </div>
          <div className="aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dNxJZnOMjBE" 
              title="BTTI Activities Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-12 bg-white relative z-30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Academic Programs", desc: "Discover our diverse range of courses.", color: "bg-blue-600", href: "/academics" },
              { icon: GraduationCap, title: "Apply Online", desc: "Start your application process today.", color: "bg-green-600", href: "/admissions" },
              { icon: Calendar, title: "School Calendar", desc: "Important dates and upcoming events.", color: "bg-yellow-500", href: "/news" },
              { icon: Users, title: "Student Portal", desc: "Access your grades and records.", color: "bg-blue-800", href: "https://betti.mycampuscura.com/Campuscura/?TenantID=betti#login;TenantID=betti;Apply=false" },
            ].map((item, i) => (
              <a href={item.href} key={i} target={item.href.startsWith('http') ? "_blank" : "_self"} rel="noreferrer">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-lg`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-black text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50/50 overflow-hidden relative">
        <div className="container-custom relative z-10 mb-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              <Award className="w-3 h-3" /> Regulators & Partners
            </div>
            <h2 className="text-3xl font-black text-gray-900">Our Strategic Partners</h2>
          </div>
        </div>
        
        <div className="flex overflow-hidden group">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-20 whitespace-nowrap px-10"
          >
            {[
              { name: "TVETA", logo: "/images/partners/tveta.png" },
              { name: "KUCCPS", logo: "/images/partners/kuccps.png" },
              { name: "NTSA", logo: "/images/partners/ntsa.png" },
              { name: "Vision 2030", logo: "/images/partners/vision2030.png" },
              { name: "NG-CDF", logo: "/images/partners/ngcdf.png" },
              { name: "NITA", logo: "/images/partners/nita.png" },
            ].map((partner, i) => (
              <div key={i} className="flex items-center justify-center h-24 min-w-[150px] grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
                <img src={partner.logo} alt={partner.name} className="h-full w-auto object-contain" />
              </div>
            ))}
            {/* Repeat for seamlessness */}
            {[
              { name: "TVETA", logo: "/images/partners/tveta.png" },
              { name: "KUCCPS", logo: "/images/partners/kuccps.png" },
              { name: "NTSA", logo: "/images/partners/ntsa.png" },
              { name: "Vision 2030", logo: "/images/partners/vision2030.png" },
              { name: "NG-CDF", logo: "/images/partners/ngcdf.png" },
              { name: "NITA", logo: "/images/partners/nita.png" },
            ].map((partner, i) => (
              <div key={`dup-${i}`} className="flex items-center justify-center h-24 min-w-[150px] grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
                <img src={partner.logo} alt={partner.name} className="h-full w-auto object-contain" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* School Life Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest">
                  <Heart className="w-3 h-3 fill-current" /> Vibrant Community
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Beyond Academic Excellence: <span className="text-primary">Life at BTTI</span></h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We believe in nurturing the whole student. Our campus life is a rich tapestry of cultural expression, leadership opportunities, and community engagement.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Cultural Festivals", icon: Lightbulb, color: "text-blue-500" },
                  { title: "Sports & Athletics", icon: Award, color: "text-primary" },
                  { title: "Student Leadership", icon: Users, color: "text-orange-500" },
                  { title: "Clubs & Societies", icon: Star, color: "text-purple-500" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    <span className="font-bold text-gray-800">{feature.title}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/about">
                  <Button className="rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20">Experience More</Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
                  <img src={studentLife1} alt="Student Life 1" className="rounded-3xl shadow-xl w-full h-[250px] object-cover" />
                  <img src={studentLife2} alt="Student Life 2" className="rounded-3xl shadow-xl w-full h-[350px] object-cover" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4 pt-12">
                  <img src={studentLife3} alt="Student Life 3" className="rounded-3xl shadow-xl w-full h-[350px] object-cover" />
                  <img src="/attached_assets/mr_and_miss_belgut_1769508223007.JPG" alt="Mr and Miss Belgut" className="rounded-3xl shadow-xl w-full h-[250px] object-cover" />
                </motion.div>
              </div>
              {/* Floating Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 text-center z-10 hidden md:block animate-bounce">
                <span className="block text-4xl font-black text-primary">50+</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Student Activities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Highlights */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <Calendar className="w-3 h-3" /> Latest Updates
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight">Stay Informed with <span className="text-primary">Our Community</span></h2>
            </div>
            <Link href="/news">
              <Button variant="outline" className="rounded-full px-8 h-12 font-bold group border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                All News <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((item, i) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/news/${item.id}`}>
                  <Card className="group h-full rounded-[32px] overflow-hidden border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=60"} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-8 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Coming Soon"}
                      </div>
                      <h3 className="font-display font-black text-2xl text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm">
                        {item.content}
                      </p>
                      <div className="pt-2 flex items-center text-primary font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                        Read Story <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px]" />
        
        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h2 className="font-display font-black text-5xl md:text-7xl leading-tight">Your Future Starts <span className="text-accent italic">Here.</span></h2>
            <p className="text-2xl text-primary-foreground/90 font-medium max-w-2xl mx-auto">
              Join Belgut TTI and gain the technical mastery needed for the modern industry.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/admissions">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-black px-12 h-16 rounded-full text-xl shadow-2xl shadow-black/20 group">
                Apply Today <ArrowUpRight className="ml-2 group-hover:scale-125 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/20 h-16 px-12 rounded-full text-xl font-bold backdrop-blur-md">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
