import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useIsEnrolled } from "../hooks/useIsEnrolled";

gsap.registerPlugin(ScrollTrigger);

export default function UnrealCourse() {
  const containerRef = useRef(null);
  const isEnrolled = useIsEnrolled('PhotoShop');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo(
        ".card-item",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 80%",
          },
        }
      );

      // Animate sections
      gsap.utils.toArray(".fade-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const learningTopics = [
    "Layer Masking & Selection Tools",
    "Professional Retouching Techniques",
    "Advanced Compositing",
    "Typography & Text Effects",
    "Photo Manipulation Workflows",
    "Non-Destructive Editing",
  ];

  const highlights = [
    { label: "Duration", value: "8 Weeks" },
    { label: "Videos", value: "40+ Videos" },
    { label: "Skill Level", value: "Beginner to Advanced" },
    { label: "Certificate", value: "Included" },
  ];

  const forWhom = [
    "Complete Beginners wanting to master digital art",
    "Graphic Designers expanding their photoshop skills",
    "Photographers wanting professional retouching",
    "Content Creators needing advanced image editing",
  ];

  return (
    <div ref={containerRef} className="bg-slate-950 text-white min-h-screen">
      {/* IF NOT ENROLLED: SHOW PUBLIC LANDING PAGE */}
      {!isEnrolled && (
        <>
          {/* LANDING HERO */}
          <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden min-h-[80vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-40 pointer-events-none" />
            
            <div className="max-w-4xl mx-auto relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Master Photoshop
                </h1>
                
                <p className="text-xl text-slate-300 mb-8">
                  Learn professional photo editing and digital art from beginner to advanced retouching techniques used by top photographers and designers worldwide.
                </p>

                <div className="mb-12 space-y-4">
                  <h3 className="text-2xl font-bold">What's Included:</h3>
                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <div className="text-left">✓ 40+ Video Lessons</div>
                    <div className="text-left">✓ Real-World Projects</div>
                    <div className="text-left">✓ Professional Techniques</div>
                    <div className="text-left">✓ Retouching Workflows</div>
                  </div>
                </div>

                <Link
                  to="/enroll"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
                >
                  Enroll Now to Access Full Course <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* IF ENROLLED: SHOW FULL COURSE CONTENT */}
      {isEnrolled && (
        <>
      {/* HERO SECTION */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-bold px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400">
                📹 RECORDED
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
              Photoshop Mastery
            </h1>
            
            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-8">
              From Basics to Professional Retouching
            </p>
            
            <p className="text-slate-300 max-w-3xl mx-auto text-lg mb-10">
              Master Adobe Photoshop from fundamentals to advanced techniques. Create stunning digital art, professional retouching, and compelling visual designs.
            </p>

            <Link
              to="/enroll"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
            >
              Enroll Now <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU WILL LEARN */}
      <section className="fade-section py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            What You Will Learn
          </h2>

          <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningTopics.map((topic, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="card-item p-6 rounded-2xl bg-white/5 border border-blue-500/20 backdrop-blur-lg hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-lg font-semibold text-white">{topic}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE HIGHLIGHTS */}
      <section className="fade-section py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Course Highlights
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((highlight, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="card-item p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 text-center"
              >
                <p className="text-sm text-slate-400 mb-2">{highlight.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-400">{highlight.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="fade-section py-20 px-6 md:px-12 lg:px-24 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Who Is This For?
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="cards-container space-y-4">
              {forWhom.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="card-item p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-lg hover:border-blue-500/50 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                  <p className="text-lg text-white">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="fade-section py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-transparent to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Master Photoshop?
          </h2>

          <p className="text-xl text-slate-300 mb-12">
            Get lifetime access to video lessons, project files, and resources to become a professional Photoshop artist.
          </p>

          <Link
            to="/enroll"
            className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            Enroll Now <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
        </>
      )}
    </div>
  );
}