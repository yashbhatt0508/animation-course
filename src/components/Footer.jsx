import React from 'react';
import { PlayCircle, Globe, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  { icon: "🎬", name: "Animation Courses", desc: "Learn frame by frame", link: "#" },
  { icon: "🎨", name: "Design Fundamentals", desc: "Master shapes & color", link: "#" },
  { icon: "🖥️", name: "3D Modeling", desc: "Build in three dimensions", badge: "NEW", link: "#" },
  { icon: "🎭", name: "Character Design", desc: "Bring characters to life", badge: "POPULAR", link: "#" },
  { icon: "🎵", name: "Motion + Sound", desc: "Sync visuals with audio", link: "#" },
  { icon: "🏆", name: "Certification", desc: "Get industry recognized", link: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--card)]/50 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <PlayCircle className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                Houdini Hollywood
              </span>
            </div>
            <p className="text-[var(--muted)] text-[0.78rem] leading-relaxed mb-3">
              Empowering creators with premium animation courses. Learn from the best, become the best.
            </p>
            <div className="flex gap-[0.8rem] mt-5">
              <a href="#" className="text-[var(--muted)] hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="text-[var(--muted)] hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="text-[var(--muted)] hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-semibold mb-3 text-sm">Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.4rem]">
              {products.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  className="group flex items-start gap-3 py-2 px-[0.7rem] rounded-lg hover:bg-white/5 border-l-2 border-transparent hover:border-violet-500 transition-all duration-300"
                >
                  <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-slate-200 font-medium group-hover:text-white transition-colors text-[0.82rem]">
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm ${item.badge === 'NEW' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[0.68rem] text-slate-500 group-hover:text-[var(--muted)] transition-colors mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-[0.75rem] text-center md:text-left">
            © 2026 Houdini Hollywood. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-[0.75rem] text-slate-500">
            <Link 
              to="/terms" 
              className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors decoration-transparent !no-underline"
            >
              Terms & Conditions
            </Link>
            <span className="hidden md:inline text-white/10">|</span>
            <Link 
              to="/privacy" 
              className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors decoration-transparent !no-underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
