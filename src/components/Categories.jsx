import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MonitorPlay, Layers, Video, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 1, title: 'VFX Compositing', icon: <MonitorPlay className="w-8 h-8 text-blue-400" /> },
  { id: 2, title: '3D Modeling', icon: <Layers className="w-8 h-8 text-violet-400" /> },
  { id: 3, title: 'Motion Capture', icon: <Video className="w-8 h-8 text-emerald-400" /> },
  { id: 4, title: 'Dynamics & FX', icon: <Zap className="w-8 h-8 text-amber-400" /> }
];

export default function Categories() {
  const sectionRef = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo('.sect-title', 
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.sect-title',
            start: "top 85%",
          }
        }
      );

      // Card staggered fade-in & scale
      gsap.fromTo('.category-card',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-900 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="sect-title text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 pb-2">
            Explore Categories
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card glass p-8 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer border border-white/5 hover:border-white/20 transition-colors duration-300">
              <div className="mb-4 bg-white/5 p-4 rounded-full">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-100">{cat.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
