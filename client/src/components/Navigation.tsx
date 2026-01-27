import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, GraduationCap, Phone, MapPin, Mail, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import logoImg from "/images/logo.jpg";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "About Us", 
      href: "/about",
      subItems: [
        { name: "Overview", href: "/about" },
        { name: "The Principal", href: "/about#principal" },
        { name: "Dean of Students", href: "/about#dean-students" },
        { name: "Dean of Academics", href: "/about#dean-academics" },
        { name: "The Registrar", href: "/about#registrar" },
        { name: "Service Charters", href: "/service-charters" },
      ]
    },
    { name: "Academics", href: "/academics" },
    { name: "Campuses", href: "/campuses" },
    { name: "Admissions", href: "/admissions" },
    { name: "News & Events", href: "/news" },
    { name: "Tenders", href: "/tenders" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 py-3 text-xs sm:text-sm hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 leading-none mb-1">Address</p>
                <p className="font-bold text-gray-900 leading-none">Kericho-Litein Rd, Kericho</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 leading-none mb-1">Email</p>
                <p className="font-bold text-gray-900 leading-none">info@btti.ac.ke</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 leading-none mb-1">Phone Number</p>
                <p className="font-bold text-gray-900 leading-none">+254 700 123 456</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/portal" className="text-sm font-bold text-gray-700 hover:text-primary transition-colors">Student Portal</Link>
            <div className="h-4 w-px bg-gray-200 mx-2" />
            <Link href="/admissions">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 h-10 rounded-md">
                CONTACT US
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-border/40 py-2" : "bg-white py-3"
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={logoImg} 
              alt="BTTI Logo" 
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="leading-tight">
              <h1 className="font-display font-black text-xl text-gray-900 tracking-tight flex items-center gap-1">
                <span className="text-primary">B</span>TTI
              </h1>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              link.subItems ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger className={cn(
                    "text-[13px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors hover:text-primary",
                    location.startsWith(link.href) ? "text-primary" : "text-gray-900"
                  )}>
                    {link.name} <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[200px] p-2">
                    {link.subItems.map(sub => (
                      <DropdownMenuItem key={sub.name} asChild className="rounded-md cursor-pointer">
                        <Link href={sub.href}>{sub.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "text-[13px] font-black uppercase tracking-wider transition-colors hover:text-primary",
                    location === link.href ? "text-primary" : "text-gray-900"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

                  <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg animate-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
                    <div className="container-custom py-4 flex flex-col gap-2">
                      {navLinks.map((link) => (
                        <div key={link.name}>
                          {link.subItems ? (
                            <div className="flex flex-col gap-2">
                              <div className="px-4 py-3 text-sm font-bold text-primary border-b border-primary/5">{link.name}</div>
                              {link.subItems.map(sub => (
                                <Link 
                                  key={sub.name} 
                                  href={sub.href}
                                  className={cn(
                                    "px-8 py-2 rounded-md text-sm font-medium transition-colors",
                                    location === sub.href ? "bg-primary/5 text-primary" : "text-gray-600 hover:bg-gray-50"
                                  )}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <Link 
                              href={link.href}
                              className={cn(
                                "px-4 py-3 rounded-md text-sm font-medium transition-colors block",
                                location === link.href 
                                  ? "bg-primary/5 text-primary" 
                                  : "text-gray-600 hover:bg-gray-50"
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              {link.name}
                            </Link>
                          )}
                        </div>
                      ))}
                      <div className="h-px bg-gray-100 my-2" />
                      <Link href="/portal" className="px-4 py-2 text-sm text-gray-600 hover:text-primary">Student Portal</Link>
                      {user ? (
                        <button onClick={() => logout()} className="px-4 py-2 text-sm text-left text-destructive font-medium">Log Out</button>
                      ) : (
                        <Link href="/api/login" className="px-4 py-2 text-sm text-primary font-medium">Admin Login</Link>
                      )}
                    </div>
                  </div>
      </header>
    </>
  );
}
