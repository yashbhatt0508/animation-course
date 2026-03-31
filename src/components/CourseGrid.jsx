import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Video } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  { id: 1, title: "Advanced Motion Design in After Effects", author: "Sarah Jenkins", rating: 4.9, duration: "12h 30m", lessons: 48, imageStyle: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500", tags: ["Advanced", "After Effects"], price: "$149" },
  { id: 2, title: "3D Animation with Cinema 4D", author: "Mike Roberts", rating: 4.8, duration: "18h 15m", lessons: 62, imageStyle: "bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500", tags: ["3D", "Cinema 4D"], price: "$199" },
  { id: 3, title: "UI/UX Micro-Interactions", author: "Elena Santos", rating: 4.9, duration: "8h 45m", lessons: 34, imageStyle: "bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-500", tags: ["UI/UX", "Figma"], price: "$99" },
  { id: 4, title: "Character Rigging Masterclass", author: "David Chen", rating: 4.7, duration: "22h 10m", lessons: 85, imageStyle: "bg-gradient-to-tr from-orange-400 via-amber-500 to-yellow-400", tags: ["Maya", "Character"], price: "$249" },
  { id: 5, title: "Web Animations with Framer Motion", author: "Alex Morgan", rating: 5.0, duration: "10h 20m", lessons: 40, imageStyle: "bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-indigo-600", tags: ["Web", "React"], price: "$129" },
  { id: 6, title: "Kinetic Typography Patterns", author: "Nina Ricci", rating: 4.8, duration: "6h 50m", lessons: 25, imageStyle: "bg-gradient-to-tr from-violet-400 via-fuchsia-500 to-pink-500", tags: ["Typography", "Design"], price: "$79" }
];

export default function CourseGrid() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title clip-path reveal
      gsap.fromTo('.sect-title-course', 
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.sect-title-course',
            start: "top 85%",
          }
        }
      );

      // Staggered course cards reveal from bottom
      gsap.fromTo('.course-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
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
    <section ref={sectionRef} className="py-24 relative overflow-hidden shrink-0 border-b border-white/5">
      <div className="absolute top-0 right-[-100px] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="sect-title-course text-3xl md:text-5xl font-bold mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">Masterclasses</span>
            </h2>
            <p className="text-slate-400 text-lg">Learn from industry veterans and level up your animation skills today.</p>
          </div>
          <button onClick={() => navigate("/courses")} className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-semibold shrink-0 cursor-pointer text-slate-50">
            View All Courses
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div 
              key={course.id} 
              whileHover={{ y: -10 }}
              className="course-card glass rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300 relative isolation-auto"
            >
              <div className={`h-48 w-full ${course.imageStyle} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                
                <motion.div 
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 180, scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full z-20"
                />
                
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  {course.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-bold bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6">by <span className="text-slate-300 font-medium">{course.author}</span></p>
                
                <div className="flex items-center justify-between text-sm text-slate-300 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-white">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4 text-slate-400" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-2xl font-black">{course.price}</span>
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <span className="text-blue-500 group-hover:text-white font-bold text-lg">+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
