import React, { useState, useLayoutEffect, useRef } from 'react';
import { PlayCircle, Clock, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const COURSE_DATA = [
  {
    category: "FLIP & River Simulation",
    tag: "FLIP & River",
    color: "#1a6fff",
    gradient: "linear-gradient(135deg, #060d1a 0%, #001233 100%)",
    icon: "💧",
    totalLessons: 25,
    level: "Intermediate",
    courses: [
      { id: 1, title: "River Simulation / Meshing / Render", duration: "2h 15m", preview: true },
      { id: 2, title: "FLIP Tank Simulation / Narrow Band", duration: "1h 45m", preview: false },
      { id: 3, title: "FLIP Tank Meshing", duration: "1h 20m", preview: false },
      { id: 4, title: "Boundary Layer", duration: "55m", preview: false },
      { id: 5, title: "Rock Splash With Speed Limit", duration: "1h 10m", preview: false },
      { id: 6, title: "River Modelling", duration: "1h 30m", preview: false },
      { id: 7, title: "Ocean Spectrum — Setting Up White Water", duration: "2h 00m", preview: true },
      { id: 8, title: "Merging With FLIP Tank", duration: "1h 05m", preview: false },
      { id: 9, title: "River Simulation", duration: "1h 50m", preview: false },
      { id: 10, title: "River Meshing", duration: "1h 15m", preview: false },
      { id: 11, title: "River Render", duration: "1h 00m", preview: false },
      { id: 12, title: "FLIP Tank Setup and Collisions F = MA", duration: "2h 10m", preview: false },
      { id: 13, title: "FLIP Tank Narrow Band", duration: "1h 25m", preview: false },
      { id: 14, title: "FLIP Tank Boundary Layer", duration: "1h 10m", preview: false },
      { id: 15, title: "FLIP Tank Double Surface Fix & Basic Meshing", duration: "1h 35m", preview: false },
      { id: 16, title: "FLIP Tank Meshing and Noise Removal", duration: "1h 20m", preview: false },
      { id: 17, title: "River Modelling (Advanced)", duration: "1h 45m", preview: false },
      { id: 18, title: "Setting Up Base Mesh Using Boolean and Noises", duration: "1h 15m", preview: false },
      { id: 19, title: "Attribute Noise and Randomize Pscale, N, Cd", duration: "1h 00m", preview: false },
      { id: 20, title: "Ocean Spectrum", duration: "1h 30m", preview: false },
      { id: 21, title: "Ocean Spectrum Basic Setup", duration: "55m", preview: false },
      { id: 22, title: "Ocean Spectrum Waves Direction", duration: "1h 05m", preview: false },
      { id: 23, title: "Ocean Spectrum Rendering", duration: "1h 20m", preview: false },
      { id: 24, title: "Ocean Ship With Fake Movements", duration: "1h 40m", preview: false },
      { id: 25, title: "POP Advect / Custom Velocity Fields", duration: "1h 15m", preview: false }
    ]
  },
  {
    category: "Pyro",
    tag: "Pyro",
    color: "#ff5c35",
    gradient: "linear-gradient(135deg, #1a0800 0%, #3d0f00 100%)",
    icon: "🔥",
    totalLessons: 10,
    level: "Advanced",
    courses: [
      { id: 1, title: "Air Concept Explanation", duration: "1h 00m", preview: true },
      { id: 2, title: "Divergence and Velocity Field", duration: "1h 20m", preview: false },
      { id: 3, title: "Tank Missile Scene — Velocity Explanation", duration: "1h 45m", preview: false },
      { id: 4, title: "Tank Missile Scene — Vortex Confinement", duration: "1h 30m", preview: false },
      { id: 5, title: "Tank Missile Scene — Disturbance", duration: "1h 15m", preview: false },
      { id: 6, title: "Advanced Control Over Explosions", duration: "2h 00m", preview: false },
      { id: 7, title: "Temperature vs Flame Field", duration: "1h 10m", preview: false },
      { id: 8, title: "Realistic Fire", duration: "1h 35m", preview: false },
      { id: 9, title: "Flame Thrower Using Particles", duration: "1h 50m", preview: false },
      { id: 10, title: "Advanced Custom Fields", duration: "2h 15m", preview: false }
    ]
  },
  {
    category: "Vellum",
    tag: "Vellum",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #0d0620 0%, #1a0a33 100%)",
    icon: "🧵",
    totalLessons: 11,
    level: "Intermediate",
    courses: [
      { id: 1, title: "Cloth Working With Particles and Constraints", duration: "1h 30m", preview: true },
      { id: 2, title: "Cloth Stretch and Bend Constraints and Rest Length", duration: "1h 20m", preview: false },
      { id: 3, title: "Attach to Geo and Ship Cloth", duration: "1h 10m", preview: false },
      { id: 4, title: "Animate Constraints and Flag", duration: "55m", preview: false },
      { id: 5, title: "Soft Bodies Pressure, Strut and Tetrahedra Constraints", duration: "1h 45m", preview: false },
      { id: 6, title: "Tet Volume vs Stretch", duration: "1h 00m", preview: false },
      { id: 7, title: "Peeling Effect", duration: "1h 15m", preview: false },
      { id: 8, title: "Cloth Tightening", duration: "50m", preview: false },
      { id: 9, title: "Active Inactive", duration: "45m", preview: false },
      { id: 10, title: "Cloth Tearing", duration: "1h 05m", preview: false },
      { id: 11, title: "Grains", duration: "1h 20m", preview: false }
    ]
  },
  {
    category: "POP",
    tag: "POP",
    color: "#ffbe00",
    gradient: "linear-gradient(135deg, #1a1200 0%, #332200 100%)",
    icon: "✨",
    totalLessons: 14,
    level: "Beginner",
    courses: [
      { id: 1, title: "Friction, Bounce, Bounce Forward Inherit", duration: "1h 10m", preview: true },
      { id: 2, title: "Velocity and Velocity Variance", duration: "55m", preview: false },
      { id: 3, title: "POP Just Born and POP Force", duration: "1h 00m", preview: false },
      { id: 4, title: "POP Replicate", duration: "45m", preview: false },
      { id: 5, title: "POP Collision Detect", duration: "1h 15m", preview: false },
      { id: 6, title: "POP Rain", duration: "1h 00m", preview: false },
      { id: 7, title: "POP Rain FLIP and Just Born Group", duration: "1h 20m", preview: false },
      { id: 8, title: "POP Canon Debris", duration: "1h 10m", preview: false },
      { id: 9, title: "POP Tornado", duration: "1h 30m", preview: false },
      { id: 10, title: "POP Randomize Mass", duration: "50m", preview: false },
      { id: 11, title: "POP Disintegrate", duration: "1h 05m", preview: false },
      { id: 12, title: "POP Shield Pieces Formation", duration: "1h 20m", preview: false },
      { id: 13, title: "POP Shield Energy Blast With Age Attraction", duration: "1h 35m", preview: false },
      { id: 14, title: "POP Fireworks", duration: "1h 45m", preview: false }
    ]
  },
  {
    category: "RBD",
    tag: "RBD",
    color: "#00d4aa",
    gradient: "linear-gradient(135deg, #001a15 0%, #003328 100%)",
    icon: "💥",
    totalLessons: 14,
    level: "Advanced",
    courses: [
      { id: 1, title: "Different Types of Fractures — Voronoi vs RBD vs Boolean", duration: "2h 00m", preview: true },
      { id: 2, title: "Active vs Inactive Attributes", duration: "1h 10m", preview: false },
      { id: 3, title: "Ground Destruction With Custom Fractures", duration: "1h 45m", preview: false },
      { id: 4, title: "Ground Fracture With Custom Velocities", duration: "1h 30m", preview: false },
      { id: 5, title: "Working With Debris", duration: "1h 20m", preview: false },
      { id: 6, title: "Working With Constraints and For Each Loop", duration: "1h 35m", preview: false },
      { id: 7, title: "Working With Different Materials and Their Constraints", duration: "1h 50m", preview: false },
      { id: 8, title: "Understanding Propagation and Iteration in Constraints", duration: "1h 40m", preview: false },
      { id: 9, title: "Working With Cluster Constraints", duration: "1h 15m", preview: false },
      { id: 10, title: "Working With Custom Clusters", duration: "1h 00m", preview: false },
      { id: 11, title: "Understanding Soft Constraints", duration: "55m", preview: false },
      { id: 12, title: "Metal Bending Effects", duration: "1h 25m", preview: false },
      { id: 13, title: "Building Destruction", duration: "2h 10m", preview: false },
      { id: 14, title: "Building Destruction With Debris and Smoke", duration: "2h 30m", preview: false }
    ]
  },
  {
    category: "Nuke",
    tag: "Nuke",
    color: "#00cfff",
    gradient: "linear-gradient(135deg, #001a1f 0%, #003040 100%)",
    icon: "🎬",
    totalLessons: 4,
    level: "Intermediate",
    courses: [
      { id: 1, title: "All Basics — Navigation and UI", duration: "2h 00m", preview: true },
      { id: 2, title: "Multi-Pass Compositing", duration: "2h 30m", preview: false },
      { id: 3, title: "ACES Workflow", duration: "1h 45m", preview: false },
      { id: 4, title: "Houdini Renders Compositing", duration: "2h 15m", preview: false }
    ]
  }
];

export default function Courses() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedCats, setExpandedCats] = useState({});

  const filterTabs = ["All", "FLIP & River", "Pyro", "Vellum", "POP", "RBD", "Nuke"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const sectionsNode = document.getElementById("course-sections");
    if (sectionsNode) {
      const yOffset = -100; // accounting for sticky nav
      const y = sectionsNode.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero reveal animations
      gsap.fromTo('.hero-label', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.hero-heading', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.hero-subtext', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.25, ease: 'power3.out' });

      gsap.fromTo('.hero-stat',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, stagger: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo('.hero-tabs',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.5, ease: 'power3.out' }
      );

      // Scroll triggers for dynamic sections
      const categorySections = gsap.utils.toArray('.category-section');
      categorySections.forEach((sec) => {
        // Only trigger header animation if it's there
        const header = sec.querySelector('.cat-header');
        if (header) {
          gsap.fromTo(header,
            { x: -60, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: "top 85%"
              }
            }
          );
        }

        // Stagger course cards within each section independently
        const cards = sec.querySelectorAll('.course-card');
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: "top 85%"
              }
            }
          );
        }
      });

      // CTA scroll animation
      gsap.fromTo('.cta-section',
        { scale: 0.97, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: "top 85%"
          }
        }
      );

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [activeTab]); // Depend on activeTab to re-trigger GSAP binds on mount/filter

  // Get data directly corresponding to selection
  const visibleCategories = activeTab === "All"
    ? COURSE_DATA
    : COURSE_DATA.filter(c => c.tag === activeTab);

  return (
    <div ref={containerRef} className="bg-slate-950 min-h-screen text-slate-50 font-sans pb-10">

      {/* Global Embedded Styles for Interactive Overlays */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .scanlines {
          background: repeating-linear-gradient(
            0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px
          );
        }
      `}} />

      {/* HERO SECTION */}
      <div
        className="w-full relative min-h-[420px] pt-[160px] pb-10 flex flex-col items-center justify-center text-center px-4"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(255,92,53,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(255,190,0,0.07) 0%, transparent 50%),
            #020617
          `
        }}
      >
        <div className="hero-label flex items-center justify-center gap-4 mb-3">
          <div className="w-8 h-px bg-violet-600"></div>
          <span className="text-[0.72rem] tracking-[0.22em] text-violet-500 uppercase font-bold" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>
            HOUDINI HOLLYWOOD
          </span>
          <div className="w-8 h-px bg-violet-600"></div>
        </div>

        <h1 className="hero-heading font-[800] leading-none tracking-[-0.04em] text-slate-50 mt-[0.8rem]" style={{ fontFamily: 'var(--font-heading), var(--font-body)', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
          Master Every Discipline
        </h1>

        <p className="hero-subtext text-[1.05rem] font-[300] leading-relaxed text-slate-400 max-w-[520px] mx-auto mt-4 mb-10" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>
          From fluid simulations to pyro explosions — handcrafted courses built for serious artists.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-10 w-full px-4">
          <div className="hero-stat flex flex-col items-center">
            <span className="text-violet-500 text-[1.8rem] font-[800]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>78+</span>
            <span className="text-slate-400 text-[0.78rem]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>Lessons</span>
          </div>
          <div className="hero-stat flex flex-col items-center">
            <span className="text-violet-500 text-[1.8rem] font-[800]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>6</span>
            <span className="text-slate-400 text-[0.78rem]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>Disciplines</span>
          </div>
          <div className="hero-stat flex flex-col items-center">
            <span className="text-violet-500 text-[1.8rem] font-[800]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>Industry</span>
            <span className="text-slate-400 text-[0.78rem]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>Level</span>
          </div>
          <div className="hero-stat flex flex-col items-center">
            <span className="text-violet-500 text-[1.8rem] font-[800]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>FX + Comp</span>
            <span className="text-slate-400 text-[0.78rem]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>Houdini + Nuke</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="hero-tabs mt-10 w-full overflow-hidden max-w-4xl mx-auto px-4">
          <div className="flex gap-[0.6rem] overflow-x-auto pb-2 justify-start md:justify-center scrollbar-hide flex-nowrap md:flex-wrap">
            {filterTabs.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-[1.4rem] py-[0.55rem] rounded-full text-[0.8rem] tracking-[0.06em] whitespace-nowrap transition-all duration-200 border ${isActive ? 'bg-violet-600 border-violet-600 text-white font-[700]' : 'bg-transparent border-slate-700 text-slate-400 hover:border-slate-400 hover:text-slate-50'}`}
                  style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* COURSE SECTIONS */}
      <div id="course-sections" className="w-full max-w-[1400px] mx-auto px-5 lg:px-12 py-10 lg:py-[5rem]">
        {visibleCategories.map((catData, idx) => {

          let levelColor = '#10b981'; // Beginner
          if (catData.level === 'Intermediate') levelColor = '#eab308';
          if (catData.level === 'Advanced') levelColor = '#ef4444';

          const isExpanded = expandedCats[catData.category];
          const displayedCourses = isExpanded ? catData.courses : catData.courses.slice(0, 5);

          return (
            <div key={idx} className="category-section mb-[5rem]">

              {/* Category Header Row */}
              <div className="cat-header flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-[1.2rem] mb-8 gap-4">
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <div
                    className="w-[48px] h-[48px] rounded-lg border flex items-center justify-center text-[1.4rem] shrink-0"
                    style={{ background: `${catData.color}26`, borderColor: `${catData.color}4d` }}
                  >
                    {catData.icon}
                  </div>
                  <h2 className="text-slate-50 text-[1.6rem] font-[800]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>
                    {catData.category}
                  </h2>
                  <div className="flex gap-2 items-center flex-wrap">
                    <span
                      className="px-[0.8rem] py-[0.25rem] rounded-full border text-[0.72rem] tracking-[0.08em] font-[700]"
                      style={{ fontFamily: 'var(--font-heading), var(--font-body)', color: catData.color, background: `${catData.color}1f`, borderColor: `${catData.color}40` }}
                    >
                      {catData.totalLessons} Lessons
                    </span>
                    <span
                      className="px-[0.8rem] py-[0.25rem] rounded-full border text-[0.72rem] tracking-[0.08em] font-[700]"
                      style={{ fontFamily: 'var(--font-heading), var(--font-body)', color: levelColor, background: `${levelColor}1f`, borderColor: `${levelColor}40` }}
                    >
                      {catData.level}
                    </span>
                  </div>
                </div>

                {catData.courses.length > 5 && (
                  <div className="flex shrink-0">
                    <button
                      onClick={() => setExpandedCats(prev => ({ ...prev, [catData.category]: !prev[catData.category] }))}
                      className="text-violet-500 font-[700] text-[0.82rem] cursor-pointer hover:text-violet-400 transition-colors flex items-center gap-1 bg-transparent border-none outline-none"
                      style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}
                    >
                      {isExpanded ? "Show Less" : "View All"}
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  </div>
                )}
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.2rem]">
                {displayedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="course-card group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg overflow-hidden relative cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-[6px]"
                    style={{
                      boxShadow: '0 0 0 0 rgba(0,0,0,0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${catData.color}4d`;
                      e.currentTarget.style.borderColor = `${catData.color}66`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0,0,0,0)';
                      e.currentTarget.style.borderColor = '#1e293b'; // slate-800
                    }}
                  >

                    {/* Thumbnail Area */}
                    <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center shrink-0">

                      {/* Gradient Base */}
                      <div className="absolute inset-0 z-0" style={{ background: catData.gradient }}></div>

                      {/* Animated Hover Gradient */}
                      <div
                        className="absolute inset-0 z-[1] bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen"
                        style={{
                          background: `linear-gradient(135deg, ${catData.color}33 0%, transparent 100%)`,
                          animation: 'gradientShift 3s ease infinite'
                        }}
                      />

                      {/* Giant Faded Icon Element */}
                      <span className="relative z-10 text-[2.5rem] opacity-40 select-none">
                        {catData.icon}
                      </span>

                      {/* Default Badges */}
                      <div className="absolute top-[10px] left-[10px] z-[5] bg-black/60 backdrop-blur-sm text-white px-[0.7rem] py-[0.3rem] rounded-[4px] text-[0.68rem] font-[700]" style={{ fontFamily: 'Syne, sans-serif' }}>
                        Lesson {course.id}
                      </div>

                      {course.preview && (
                        <div className="absolute top-[10px] right-[10px] z-[5] bg-violet-600 text-white px-[0.6rem] py-[0.25rem] rounded-[3px] text-[0.62rem] font-[700] uppercase text-center flex items-center" style={{ fontFamily: 'Syne, sans-serif' }}>
                          Free Preview
                        </div>
                      )}

                      <div className="absolute bottom-[10px] right-[10px] z-[5] bg-black/60 backdrop-blur-sm text-white px-[0.7rem] py-[0.3rem] rounded-[4px] text-[0.68rem] font-[700] flex items-center gap-[0.35rem]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>

                      {/* Video Player Hover Overlay */}
                      <div className="absolute inset-0 z-[20] bg-black/85 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="scanlines absolute inset-0 z-[1] opacity-60"></div>
                        <div className="relative z-[2] w-[56px] h-[56px] rounded-full flex items-center justify-center bg-violet-600 text-white transform scale-80 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_0_0_rgba(139,92,246,0)] group-hover:shadow-[0_0_0_8px_rgba(139,92,246,0.25)]">
                          <PlayCircle className="w-8 h-8 ml-1" />
                        </div>
                        <span className="relative z-[2] font-[500] text-[0.78rem] text-white/70 mt-[0.6rem]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>
                          {course.preview ? "Preview Lesson" : "Enroll to Watch"}
                        </span>
                      </div>

                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col p-[1.1rem] px-[1.3rem] pb-[1.3rem] flex-1 z-10 bg-slate-900 border-t border-slate-800">
                      <h3
                        className="text-slate-50 font-[700] text-[0.92rem] leading-[1.35] mb-[0.6rem] line-clamp-2 overflow-hidden flex-1"
                        style={{ fontFamily: 'var(--font-heading), var(--font-body)', WebkitBoxOrient: 'vertical', display: '-webkit-box' }}
                      >
                        {course.title}
                      </h3>
                      <div className="flex justify-between items-center mt-auto">
                        <span
                          className="px-[0.6rem] py-[0.2rem] rounded-full border text-[0.62rem] tracking-[0.08em] uppercase font-[700]"
                          style={{ fontFamily: 'var(--font-heading), var(--font-body)', color: catData.color, background: `${catData.color}1a`, borderColor: `${catData.color}33` }}
                        >
                          {catData.tag}
                        </span>
                        <div className="flex items-center gap-[0.3rem] text-slate-500 text-[0.75rem]" style={{ fontFamily: 'var(--font-heading), var(--font-body)' }}>
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* ENROLL CTA BANNER SECTION */}
      <div
        className="cta-section w-full border-t border-b border-slate-800 px-5 lg:px-12 py-[5rem]"
        style={{
          background: 'linear-gradient(135deg, rgba(255,92,53,0.15) 0%, rgba(255,190,0,0.08) 100%)'
        }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="font-[800] text-slate-50" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-[1rem] font-[300] text-slate-400 mt-[1rem] mb-[2rem]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            Join 500+ artists already learning at Houdini Hollywood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/enroll"
              className="w-full sm:w-auto px-10 py-4 bg-violet-600 hover:bg-violet-500 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(139,92,246,0.35)] text-white rounded-md font-[700] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Enroll Now <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-10 py-4 border border-slate-700 hover:bg-slate-800 text-white rounded-md font-[700] transition-colors flex items-center justify-center"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
