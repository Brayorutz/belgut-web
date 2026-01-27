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
      <section className="relative h-[700px] lg:h-[800px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gray-900/60 z-10" />
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentHero}
              src={heroImages[currentHero].src} 
              alt={heroImages[currentHero].alt} 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="container-custom absolute inset-0 flex items-center justify-center z-20 text-center">
          <div className="max-w-4xl px-4">
            <motion.div initial="initial" animate="animate" variants={staggerContainer}>
              <motion.h1 variants={fadeIn} className="font-display font-black text-5xl lg:text-8xl leading-[1.05] mb-8 text-white">
                We Design and Improve a <span className="text-primary italic">Brighter</span> Future For Your Education
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link href="/admissions">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black px-12 h-14 rounded-md text-sm uppercase tracking-widest shadow-xl">
                    APPLY NOW
                  </Button>
                </Link>
                <Link href="/academics">
                  <Button size="lg" variant="outline" className="border-white bg-white text-gray-900 hover:bg-gray-100 h-14 px-12 rounded-md font-black text-sm uppercase tracking-widest shadow-xl">
                    OUR ACADEMICS
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Overlapping Info Cards */}
        <div className="absolute bottom-0 left-0 w-full z-30 translate-y-1/2">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="bg-gray-900 text-white p-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-wider">Skilled Lectures</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="bg-primary text-white p-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-wider">Scholarship Facility</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="bg-destructive text-white p-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-black text-lg uppercase tracking-wider">Top Graduates</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[200px] lg:h-[150px]" /> {/* Spacer for overlapping cards */}

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-primary font-black uppercase tracking-[0.2em] text-xs">About</p>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                  Welcome to <span className="text-primary">BTTI</span>, Creator of Underrated Graduated
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed pt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                </p>
                <p className="font-bold text-gray-900 pt-2">Established since <span className="text-primary">2010</span></p>
              </div>
              <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-white font-black px-10 h-14 rounded-md text-xs uppercase tracking-widest">
                LEARN MORE
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <div className="bg-gray-50 p-10 border-l-4 border-primary flex justify-between items-center group hover:bg-white hover:shadow-2xl transition-all">
                <div className="space-y-1">
                  <p className="text-4xl font-black text-destructive italic">92%</p>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500">Graduation Rate</p>
                </div>
                <p className="text-gray-400 text-xs max-w-[200px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
              </div>
              <div className="bg-white p-10 border-l-4 border-gray-100 flex justify-between items-center group hover:shadow-2xl transition-all">
                <div className="space-y-1">
                  <p className="text-4xl font-black text-gray-900 italic">2.4M</p>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500">Undergrads from Ours</p>
                </div>
                <p className="text-gray-400 text-xs max-w-[200px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
              </div>
              <div className="bg-gray-50 p-10 border-l-4 border-gray-100 flex justify-between items-center group hover:bg-white hover:shadow-2xl transition-all">
                <div className="space-y-1">
                  <p className="text-4xl font-black text-gray-900 italic">45 Years</p>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500">Educate Experience</p>
                </div>
                <p className="text-gray-400 text-xs max-w-[200px] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-b-[20px] border-primary">
              <img src={studentLife1} alt="BTTI Campus" className="w-full h-[600px] object-cover" />
              <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-2">Why University?</p>
                <h3 className="text-2xl font-black text-gray-900 leading-tight">Why We Are the Right Fit for Your Educational Future</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
               {[
                 { icon: BookOpen, title: "Industry Connected Learning", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do." },
                 { icon: Award, title: "Cutting-Edge Campus Facilities", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do." },
                 { icon: Users, title: "Your Mentors for Success", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do." },
                 { icon: GraduationCap, title: "Collaboration Across Worlds", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do." }
               ].map((item, i) => (
                 <div key={i} className="space-y-4">
                   <div className="w-12 h-12 rounded-lg bg-destructive text-white flex items-center justify-center shadow-lg shadow-destructive/20">
                     <item.icon className="w-6 h-6" />
                   </div>
                   <h4 className="font-black text-sm uppercase tracking-wider text-gray-900">{item.title}</h4>
                   <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Roadmap */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <p className="text-primary font-black uppercase tracking-[0.2em] text-xs">How to Apply</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">Your Journey Starts Here, Steps to Your Educational Success</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2" />
            
            <div className="space-y-16 lg:space-y-24">
              {[
                { step: "01", title: "Choose Your Faculty and Program", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
                { step: "02", title: "Review Admission Requirements", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
                { step: "03", title: "Submit Document Requirements", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
                { step: "04", title: "Application Review and Interview", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
                { step: "05", title: "Receive Your Admission Decision", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." }
              ].map((item, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/2 text-center lg:text-left px-10">
                    <h4 className="font-black text-xl mb-4 text-gray-900">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-destructive text-white font-black text-sm shadow-xl shadow-destructive/30">
                    {item.step}
                  </div>
                  <div className="lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section (Existing but styled to match) */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 -skew-x-12 translate-x-1/2" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">Embrace Visibility Without Losing Your Passion for Learning</h2>
              <p className="text-gray-400 leading-relaxed max-w-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black px-12 h-14 rounded-md text-xs uppercase tracking-widest group">
                  LEARN MORE <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dNxJZnOMjBE?si=XzJUdUZBQqs-hCNb" 
                title="BTTI Activities Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container-custom">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <p className="text-primary font-black uppercase tracking-[0.2em] text-xs">Latest Updates</p>
              <h2 className="text-4xl font-black text-gray-900 leading-tight">Stay Informed with <span className="text-primary">Our Community</span></h2>
            </div>
            <Link href="/news">
              <Button variant="outline" className="rounded-md px-10 h-14 font-black text-xs uppercase tracking-widest group border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                ALL NEWS
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
                  <Card className="group h-full rounded-none overflow-hidden border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.imageUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=60"} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <span className="bg-white px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-10 space-y-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Coming Soon"}
                      </div>
                      <h3 className="font-display font-black text-2xl text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm line-clamp-3">
                        {item.content}
                      </p>
                      <div className="pt-2 flex items-center text-primary font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                        READ MORE <ArrowRight className="w-3 h-3 ml-2" />
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
