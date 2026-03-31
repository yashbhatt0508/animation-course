import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { id: 1, text: "Houdini Hollywood elevated my composite skills beyond anything I thought possible. Truly next-level teaching.", author: "Mike R.", role: "Junior Compositor" },
  { id: 2, text: "The instructors are industry veterans. Every lesson is packed with production-ready tips. Worth every penny.", author: "Lisa V.", role: "3D Generalist" },
  { id: 3, text: "I landed my dream job at a major studio within 6 months of completing the dynamics track.", author: "James M.", role: "FX TD" },
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo('.sect-title-test', 
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.sect-title-test',
            start: "top 85%"
          }
        }
      );

      // Staggered fade and scale up
      gsap.fromTo('.testimonial-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.1)",
          scrollTrigger: {
            trigger: '.testimonial-card',
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="sect-title-test text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 pb-2">
            Student Success
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card glass p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
              <p className="text-slate-300 italic mb-8">&quot;{item.text}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20" />
                <div>
                  <h4 className="font-bold text-white">{item.author}</h4>
                  <p className="text-xs text-amber-500 uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
