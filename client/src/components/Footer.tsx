import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0b1727] text-gray-400 pt-24 pb-8 border-t border-white/5">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-black text-white tracking-tighter">BTTI.</h3>
              <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                Empowering the next generation through industry-connected technical excellence and professional innovation.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-md bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-md bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-md bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Academics", href: "/academics" },
                { name: "Admissions", href: "/admissions" },
                { name: "Student Portal", href: "/portal" },
                { name: "News & Events", href: "/news" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="flex items-center gap-2 hover:text-accent transition-colors group">
                    <ArrowRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-6">Departments</h4>
            <ul className="space-y-3">
              {[
                "Computing & Informatics",
                "Electrical Engineering",
                "Building & Civil Eng.",
                "Business Studies",
                "Hospitality & Institutional",
              ].map((dept) => (
                <li key={dept}>
                  <Link href="/academics" className="hover:text-accent transition-colors">
                    {dept}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">P.O. Box 486 - 20200, Kericho, Kenya.<br/>Off Kericho-Litein Road</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm">+254 700 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm">info@btti.ac.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Belgut Technical Training Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
