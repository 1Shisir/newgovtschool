import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-school-primary text-white pt-24 pb-12 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-texture opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* School Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-school-primary">
                <GraduationCap size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-white leading-tight">
                  Evergreen
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-sans">
                  Government School
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-sans">
              A tradition of excellence in education, fostering a community of learners, leaders, and innovators since 1954.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-school-accent transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-school-accent transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-school-accent transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-school-accent transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-xl font-serif font-bold text-white">Quick Links</h3>
            <ul className="space-y-4 text-sm text-white/60 font-sans">
              <li><a href="#" className="hover:text-school-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-school-accent transition-colors">About Us</a></li>
              <li><a href="#academics" className="hover:text-school-accent transition-colors">Academics</a></li>
              <li><a href="#admissions" className="hover:text-school-accent transition-colors">Admissions</a></li>
              <li><a href="#notices" className="hover:text-school-accent transition-colors">Notices</a></li>
              <li><a href="#gallery" className="hover:text-school-accent transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-xl font-serif font-bold text-white">Contact Us</h3>
            <ul className="space-y-6 text-sm text-white/60 font-sans">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-school-accent flex-shrink-0" />
                <span>123 Education Lane, Green Valley, State 45678, Country</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-school-accent flex-shrink-0" />
                <span>+1 (234) 567-8901</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-school-accent flex-shrink-0" />
                <span>info@evergreenschool.gov.edu</span>
              </li>
            </ul>
          </div>

          {/* Map Placeholder */}
          <div className="space-y-8">
            <h3 className="text-xl font-serif font-bold text-white">Find Us</h3>
            <div className="w-full h-48 bg-white/10 rounded-xl overflow-hidden border border-white/20 relative group">
              <img
                src="https://picsum.photos/seed/school-map/400/300"
                alt="School Map Location"
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 py-2 bg-school-primary/80 backdrop-blur-sm text-xs font-bold uppercase tracking-widest rounded-full border border-white/20">
                  View Large Map
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs text-white/40 font-sans text-center md:text-left">
            <p>© 2026 Evergreen Government School. All Rights Reserved.</p>
            <p className="mt-1 italic">Affiliated with the Ministry of Education & National Board of Excellence.</p>
          </div>
          <div className="flex items-center gap-8 text-xs text-white/40 font-sans">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
