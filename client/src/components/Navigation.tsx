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
    { name: "About Us", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "News & Events", href: "/news" },
    { name: "Tenders", href: "/tenders" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-xs sm:text-sm hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3" /> +254 700 123 456
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3" /> info@btti.ac.ke
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/portal" className="hover:text-accent transition-colors">Student Portal</Link>
            <Link href="/staff" className="hover:text-accent transition-colors">Staff Mail</Link>
            {user ? (
               <div className="flex items-center gap-2 ml-4">
                 <span className="text-accent text-xs">Admin: {user.firstName}</span>
                 <button onClick={() => logout()} className="hover:text-accent">
                   <LogOut className="w-3 h-3" />
                 </button>
               </div>
            ) : (
              <Link href="/api/login" className="flex items-center gap-1 hover:text-accent ml-4">
                <LogIn className="w-3 h-3" /> Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-border/40 py-2" : "bg-white py-4"
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={logoImg} 
              alt="BTTI Logo" 
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden lg:block leading-tight">
              <h1 className="font-display font-bold text-xl text-primary tracking-tight">Belgut Technical</h1>
              <p className="font-display font-semibold text-sm text-gray-600">Training Institute</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "nav-link text-sm font-semibold tracking-wide",
                  location === link.href ? "text-primary after:w-full" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/admissions">
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg shadow-accent/20">
                Apply Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg animate-in slide-in-from-top-5">
            <div className="container-custom py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    location === link.href 
                      ? "bg-primary/5 text-primary" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
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
        )}
      </header>
    </>
  );
}
