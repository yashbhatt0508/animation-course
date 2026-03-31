import React, { useState, useLayoutEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Video, Repeat, Award, Users, Briefcase, Globe, Loader2, Lock, CheckCircle, ChevronDown } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const countryCodes = [
  "🇮🇳 +91", "🇺🇸 +1", "🇬🇧 +44", "🇦🇪 +971", "🇦🇺 +61", 
  "🇨🇦 +1", "🇸🇬 +65", "🇩🇪 +49", "🇫🇷 +33", "🇯🇵 +81"
];

// Courses replaced with Plans

const ENROLL_PLANS = {
  monthly: [
    {
      id: "starter-monthly",
      name: "Starter",
      billing: "monthly",
      emoji: "🎯",
      price: "₹4,999",
      period: "/month",
      badge: null,
      color: "accent",
      features: [
        "1 Course Access",
        "Lifetime Recordings",
        "Certificate",
        "Community Access"
      ]
    },
    {
      id: "pro-monthly",
      name: "Pro",
      billing: "monthly",
      emoji: "⚡",
      price: "₹12,999",
      period: "/month",
      badge: "POPULAR",
      color: "accent",
      features: [
        "3 Course Access",
        "Live Q&A Sessions",
        "Lifetime Recordings",
        "Certificate",
        "Priority Support"
      ]
    },
    {
      id: "master-monthly",
      name: "Master",
      billing: "monthly",
      emoji: "👑",
      price: "₹24,999",
      period: "/month",
      badge: null,
      color: "accent2",
      features: [
        "All 6 Disciplines",
        "78+ Lessons",
        "1-on-1 Mentorship",
        "Placement Assistance",
        "All Pro Features"
      ]
    }
  ],
  yearly: [
    {
      id: "starter-yearly",
      name: "Starter",
      billing: "yearly",
      emoji: "🎯",
      price: "₹3,999",
      originalPrice: "₹4,999",
      period: "/month",
      badge: "SAVE 20%",
      badgeColor: "accent2",
      color: "accent",
      features: [
        "1 Course Access",
        "Lifetime Recordings",
        "Certificate",
        "Community Access"
      ]
    },
    {
      id: "pro-yearly",
      name: "Pro",
      billing: "yearly",
      emoji: "⚡",
      price: "₹9,999",
      originalPrice: "₹12,999",
      period: "/month",
      badge: "POPULAR",
      color: "accent",
      features: [
        "3 Course Access",
        "Live Q&A Sessions",
        "Lifetime Recordings",
        "Certificate",
        "Priority Support"
      ]
    },
    {
      id: "master-yearly",
      name: "Master",
      billing: "yearly",
      emoji: "👑",
      price: "₹19,999",
      originalPrice: "₹24,999",
      period: "/month",
      badge: "BEST VALUE",
      badgeColor: "accent2",
      color: "accent2",
      features: [
        "All 6 Disciplines",
        "78+ Lessons",
        "1-on-1 Mentorship",
        "Placement Assistance",
        "All Pro Features"
      ]
    }
  ]
};
const benefits = [
  { icon: Video, title: "Live Zoom Sessions", desc: "Learn directly from industry professionals in real-time interactive classes." },
  { icon: Repeat, title: "Lifetime Recording Access", desc: "Never miss a lesson — rewatch all sessions anytime, forever." },
  { icon: Award, title: "Industry Recognized Certificate", desc: "Graduate with a certificate respected across studios and production houses." },
  { icon: Users, title: "1-on-1 Mentorship", desc: "Get personalized guidance from your instructor throughout the course." },
  { icon: Briefcase, title: "Placement Assistance", desc: "We help connect you with studios and job opportunities after graduation." },
  { icon: Globe, title: "Global Community", desc: "Join 500+ animators from around the world and grow your network." }
];

export default function EnrollNow() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', 
    countryCode: '🇮🇳 +91', phone: '', gender: ''
  });
  
  const [enrollBilling, setEnrollBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("pro-monthly");
  
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  useLayoutEffect(() => {
    const plan = searchParams.get("plan");
    const billing = searchParams.get("billing");
    
    if (billing && (billing === "monthly" || billing === "yearly")) {
      setEnrollBilling(billing);
    }
    
    if (plan && billing) {
      const planId = `${plan.toLowerCase()}-${billing}`;
      setSelectedPlan(planId);
      
      const planNameRender = plan.charAt(0).toUpperCase() + plan.slice(1);
      setToastMessage(`✦ ${planNameRender} plan pre-selected for you!`);
      
      setTimeout(() => {
        gsap.fromTo('.auto-select-toast', 
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 }
        );
        setTimeout(() => {
          gsap.to('.auto-select-toast', { y: -20, opacity: 0, duration: 0.4 });
        }, 3000);
      }, 100);

      setTimeout(() => {
        document.getElementById("choose-plan-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          gsap.fromTo(`.card-${planId}`,
            { boxShadow: "0 0 0px rgba(255,92,53,0)" },
            { boxShadow: "0 0 30px rgba(255,92,53,0.4)", duration: 0.8, ease: "power2.out", yoyo: true, repeat: 1 }
          );
        }, 600);
      }, 600);
    }
  }, [searchParams]);

  const handleBillingToggle = (newBilling) => {
    if (newBilling === enrollBilling) return;
    gsap.to(".plan-card", {
      opacity: 0, y: -15, duration: 0.2, stagger: 0.05,
      onComplete: () => { 
        setEnrollBilling(newBilling);
        setSelectedPlan("");
        gsap.fromTo(".plan-card",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, delay: 0.05 }
        );
      }
    });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // GSAP Animations
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero load animations
      gsap.fromTo('.hero-label', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.hero-heading', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power3.out' });
      gsap.fromTo('.hero-subtext', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.25, ease: 'power3.out' });
      gsap.fromTo('.enroll-card', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, delay: 0.35, ease: 'power3.out' });



      // Benefit rows scroll animation
      const rows = gsap.utils.toArray('.benefit-row');
      rows.forEach((row, i) => {
        gsap.fromTo(row, 
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: "top 85%"
            }
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Success Checkmark Animation
  useLayoutEffect(() => {
    if (isSuccess) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.success-check', 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' }
        );
      });
      return () => ctx.revert();
    }
  }, [isSuccess]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required";
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      newErrors.phone = "Phone must be at least 7 digits";
    }
    
    if (!selectedPlan) {
      newErrors.plan = "Please select a plan to continue";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // Scroll to top of card roughly
      window.scrollBy({ top: -100, behavior: 'smooth' });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--bg)] pt-[140px] pb-[100px] relative font-sans">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(255,92,53,0.07) 0%, transparent 70%)' }}
      />

      {/* Confetti Styles */}
      {isSuccess && (
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes confetti {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .confetti-dot {
            position: fixed;
            top: -10px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: confetti 3s linear infinite;
            z-index: 50;
          }
        `}} />
      )}

      {/* Confetti Elements */}
      {isSuccess && [...Array(20)].map((_, i) => (
        <div key={i} className="confetti-dot" style={{
          left: `${Math.random() * 100}vw`,
          backgroundColor: ['#8b5cf6', 'var(--accent)', '#ffffff'][i % 3], // Accent, Accent2, White
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2.5 + Math.random() * 2}s`
        }} />
      ))}

      <div className="max-w-[620px] mx-auto px-4 relative z-10 w-full">
        
        {/* A) HERO TEXT BLOCK */}
        <div className="text-center mb-10">
          <div className="hero-label flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-violet-600"></div>
            <span className="text-[0.72rem] tracking-[0.22em] text-violet-500 uppercase font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
              JOIN US TODAY
            </span>
            <div className="w-8 h-px bg-violet-600"></div>
          </div>
          
          <h1 className="hero-heading font-[800] leading-none tracking-[-0.04em] text-[var(--text)] mt-[0.8rem]" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
            Enroll Now
          </h1>
          
          <p className="hero-subtext text-[1rem] font-[300] leading-[1.7] text-[var(--muted)] max-w-[420px] mx-auto mt-4 mb-12" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            Fill in your details below and take the first step toward mastering animation.
          </p>
        </div>

              {/* Toast Notification */}
              {toastMessage && (
                <div 
                  className="auto-select-toast fixed z-[200]"
                  style={{
                    top: '80px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--surface, #0f172a)', border: '1px solid var(--accent, var(--accent))',
                    borderRadius: '6px', padding: '0.7rem 1.4rem',
                    fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#f8fafc'
                  }}
                >
                  {toastMessage}
                </div>
              )}

        {/* B) FORM CARD */}
        <div className="enroll-card bg-[var(--card)] border border-[var(--border)] rounded-xl p-[1.6rem] sm:p-[2.8rem] transition-all duration-300 focus-within:shadow-[0_0_0_1px_#8b5cf6]">
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-6">
              <div className="success-check w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-3 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                You're In! 🎉
              </h2>
              <p className="text-[0.95rem] text-[var(--muted)] leading-[1.7] mb-8 max-w-[340px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                Welcome <span className="text-white font-medium">{formData.firstName}</span>! You've selected the <span className="text-white font-medium">{selectedPlan}</span> plan. Our team will reach out to <span className="text-white font-medium">{formData.email}</span> within 24 hours with next steps.
              </p>
              <Link 
                to="/"
                className="w-full sm:w-auto px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-md transition-colors text-[0.95rem] uppercase tracking-[0.06em]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="w-full">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[1.6rem]">
                <div>
                  <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-slate-500 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    First Name <span className="text-violet-500">*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-md py-[0.82rem] px-4 text-[var(--text)] text-[0.92rem] outline-none transition-all duration-200 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(255,92,53,0.12)] placeholder:text-slate-500 placeholder:opacity-60"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  />
                  {errors.firstName && <div className="text-[var(--error)] text-[0.75rem] mt-[0.35rem] animate-in fade-in slide-in-from-top-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>{errors.firstName}</div>}
                </div>
                <div>
                  <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-slate-500 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Last Name <span className="text-violet-500">*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-md py-[0.82rem] px-4 text-[var(--text)] text-[0.92rem] outline-none transition-all duration-200 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(255,92,53,0.12)] placeholder:text-slate-500 placeholder:opacity-60"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  />
                  {errors.lastName && <div className="text-[var(--error)] text-[0.75rem] mt-[0.35rem] animate-in fade-in slide-in-from-top-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>{errors.lastName}</div>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="mb-[1.6rem]">
                <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-slate-500 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Email Address <span className="text-violet-500">*</span>
                </label>
                <input 
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border)] rounded-md py-[0.82rem] px-4 text-[var(--text)] text-[0.92rem] outline-none transition-all duration-200 focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(255,92,53,0.12)] placeholder:text-slate-500 placeholder:opacity-60"
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                />
                {errors.email && <div className="text-[var(--error)] text-[0.75rem] mt-[0.35rem] animate-in fade-in slide-in-from-top-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>{errors.email}</div>}
              </div>

              {/* Row 3 */}
              <div className="mb-[1.6rem]">
                <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-slate-500 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Contact Number <span className="text-violet-500">*</span>
                </label>
                <div className="flex bg-[var(--input-bg)] border border-[var(--border)] rounded-md focus-within:border-violet-500 focus-within:shadow-[0_0_0_3px_rgba(255,92,53,0.12)] transition-all duration-200 group">
                  <select 
                    value={formData.countryCode}
                    onChange={(e) => handleChange('countryCode', e.target.value)}
                    className="w-[110px] shrink-0 bg-transparent text-[var(--text)] text-[0.92rem] border-r border-[var(--border)] group-focus-within:border-violet-500/30 px-3 py-[0.82rem] outline-none appearance-none cursor-pointer transition-colors"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {countryCodes.map(code => <option key={code} value={code} className="bg-[var(--card)]">{code}</option>)}
                  </select>
                  <input 
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="flex-1 bg-transparent text-[var(--text)] text-[0.92rem] px-4 py-[0.82rem] outline-none placeholder:text-slate-500 placeholder:opacity-60"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  />
                </div>
                {errors.phone && <div className="text-[var(--error)] text-[0.75rem] mt-[0.35rem] animate-in fade-in slide-in-from-top-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>{errors.phone}</div>}
              </div>

              {/* Row 4 */}
              <div className="mb-[1.6rem]">
                <label className="block text-[0.72rem] tracking-[0.1em] uppercase text-slate-500 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Gender
                </label>
                <div className="flex flex-wrap gap-[0.75rem]">
                  {["Male", "Female", "Prefer not to say"].map(option => {
                    const isSelected = formData.gender === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleChange('gender', option)}
                        className={`px-[1.4rem] py-[0.55rem] rounded-full text-[0.88rem] transition-all duration-200 border ${isSelected ? 'bg-violet-600 border-violet-600 text-white font-[600]' : 'bg-transparent border-[var(--border)] text-[var(--muted)] hover:border-slate-400 hover:text-[var(--text)]'}`}
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Choose Your Plan Section */}
              {/* Choose Your Plan Section */}
              <div id="choose-plan-section" className="relative flex items-center justify-center my-[2.5rem]">
                <div className="absolute w-full h-px bg-slate-800"></div>
                <span 
                  className="relative bg-[var(--card)] px-4 text-[0.75rem] tracking-[0.18em] text-slate-500 uppercase font-bold"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  ✦ Choose Your Plan ✦
                </span>
              </div>
              
              {/* Billing Toggle */}
              <div className="flex justify-center mb-[1.5rem]">
                <div className="inline-flex p-[4px] rounded-full" style={{ background: 'var(--surface, #0f172a)', border: '1px solid var(--border, #1e293b)' }}>
                  <button
                    type="button"
                    onClick={() => handleBillingToggle("monthly")}
                    className={`px-[1.4rem] py-[0.5rem] rounded-full text-[0.82rem] font-[700] transition-all duration-200 border-none outline-none ${enrollBilling === 'monthly' ? 'text-white' : 'text-[var(--muted)] bg-transparent'}`}
                    style={{ fontFamily: 'Syne, sans-serif', background: enrollBilling === 'monthly' ? 'var(--accent, var(--accent))' : 'transparent', cursor: 'pointer' }}
                  >
                    Monthly
                  </button>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleBillingToggle("yearly")}
                      className={`px-[1.4rem] py-[0.5rem] rounded-full text-[0.82rem] font-[700] transition-all duration-200 border-none outline-none ${enrollBilling === 'yearly' ? 'text-white' : 'text-[var(--muted)] bg-transparent'}`}
                      style={{ fontFamily: 'Syne, sans-serif', background: enrollBilling === 'yearly' ? 'var(--accent, var(--accent))' : 'transparent', cursor: 'pointer' }}
                    >
                      Yearly
                    </button>
                    <span 
                      className="text-[0.55rem] font-[700] px-[0.4rem] py-[0.15rem] rounded-[3px] ml-[0.4rem] mr-[0.4rem]"
                      style={{ fontFamily: 'Syne, sans-serif', background: 'rgba(255,190,0,0.15)', color: 'var(--accent2, var(--accent2))', border: '1px solid rgba(255,190,0,0.3)' }}
                    >
                      SAVE 20%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-[0.5rem] relative">
                {ENROLL_PLANS[enrollBilling].map((plan, idx) => {
                  const isSelected = selectedPlan === plan.id;
                  const isMaster = plan.color === "accent2";
                  const accentColor = isMaster ? "var(--accent2, var(--accent2))" : "var(--accent, var(--accent))";
                  
                  return (
                    <div 
                      key={plan.id}
                      onClick={() => { setSelectedPlan(plan.id); if(errors.plan) setErrors(prev => ({...prev, plan: null})) }}
                      className={`plan-card card-${plan.id} relative cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[8px] p-[1.2rem] text-center will-change-transform mt-3 sm:mt-0`}
                      style={{
                        background: isSelected ? (isMaster ? "rgba(255,190,0,0.08)" : "rgba(255,92,53,0.06)") : (isMaster ? "rgba(255,190,0,0.03)" : "var(--surface, #0f172a)"),
                        border: isSelected ? `2px solid ${accentColor}` : `1px solid ${isMaster ? 'rgba(255,190,0,0.2)' : 'var(--border, #1e293b)'}`,
                        boxShadow: isSelected ? `0 0 20px ${isMaster ? 'rgba(255,190,0,0.1)' : 'rgba(255,92,53,0.12)'}` : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = isMaster ? 'rgba(255,190,0,0.4)' : 'rgba(255,92,53,0.4)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = isMaster ? 'rgba(255,190,0,0.2)' : 'var(--border, #1e293b)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {plan.badge && (
                        <div 
                          className="absolute -top-[10px] left-1/2 -translate-x-1/2 px-[0.8rem] py-[0.2rem] rounded-full text-[0.58rem] tracking-[0.1em] font-[700] uppercase text-center w-max z-10 text-white" 
                          style={{ fontFamily: 'Syne, sans-serif', background: plan.badgeColor === "accent2" ? "var(--accent2, var(--accent2))" : "var(--accent, var(--accent))", color: plan.badgeColor === "accent2" ? "#0f172a" : "white" }}
                        >
                          {plan.badge}
                        </div>
                      )}
                      <div 
                        className="absolute top-[0.8rem] right-[0.8rem] w-[18px] h-[18px] rounded-full flex items-center justify-center transition-colors"
                        style={{
                          border: isSelected ? `2px solid ${accentColor}` : `2px solid ${isMaster ? 'rgba(255,190,0,0.2)' : 'var(--border, #1e293b)'}`,
                          background: isSelected ? accentColor : 'transparent',
                        }}
                      >
                        {isSelected && <span className={`text-[0.6rem] ${isMaster ? 'text-[#0f172a]' : 'text-white'} font-bold`}>✓</span>}
                      </div>
                      <div className="text-[1.6rem] mb-[0.6rem]">{plan.emoji}</div>
                      <h4 className="text-[0.95rem] font-[800] text-[var(--text)] mb-[0.3rem]" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.name}</h4>
                      
                      <div className="relative min-h-[40px] flex flex-col items-center justify-center">
                        {plan.originalPrice && (
                          <div className="text-[0.75rem] text-slate-500 line-through mb-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                            {plan.originalPrice}
                          </div>
                        )}
                        <div className="text-[1.3rem] font-[800] leading-none" style={{ fontFamily: 'Syne, sans-serif', color: accentColor }}>
                          {plan.price}
                        </div>
                        {enrollBilling === "yearly" && plan.originalPrice && (
                          <div className="text-[0.72rem] text-[var(--muted)] mt-1" style={{ fontFamily: '"DM Sans", sans-serif', color: 'var(--accent2, var(--accent2))' }}>
                            Save ₹{parseInt(plan.originalPrice.replace(/\D/g,'')) - parseInt(plan.price.replace(/\D/g,''))}/year
                          </div>
                        )}
                      </div>
                      
                      <div className="text-[0.72rem] text-[var(--muted)] mb-[0.8rem] mt-[0.2rem] opacity-0 h-0 p-0 m-0 hidden" style={{ fontFamily: '"DM Sans", sans-serif' }}>{plan.period}</div>
                      <ul className="text-left text-[0.75rem] text-[var(--muted)] leading-[1.8] space-y-1 mt-3" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                        {plan.features.map((feat, fidx) => (
                          <li key={fidx}><span className="mr-1" style={{ color: accentColor }}>✓</span> {feat}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {selectedPlan && (() => {
                const sp = ENROLL_PLANS[enrollBilling].find(p => p.id === selectedPlan);
                if (!sp) return null;
                return (
                  <div 
                    className="flex flex-col sm:flex-row items-center justify-between mt-[1.5rem] rounded-[6px] px-[1.2rem] py-[0.8rem] animate-in fade-in zoom-in duration-300 gap-2"
                    style={{ background: 'rgba(255,92,53,0.08)', border: '1px solid rgba(255,92,53,0.2)' }}
                  >
                    <div className="text-[0.85rem] font-[700] text-[var(--text)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Selected: <span style={{ color: 'var(--accent, var(--accent))' }}>{sp.name}</span> <span className="text-[var(--muted)] font-normal">({sp.billing.charAt(0).toUpperCase() + sp.billing.slice(1)})</span>
                    </div>
                    <div className="text-[0.9rem] font-[800]" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--accent, var(--accent))' }}>
                      {sp.price}{sp.period}
                    </div>
                  </div>
                );
              })()}
              {errors.plan && <div className="text-[var(--error)] text-[0.75rem] mt-[0.6rem] text-center" style={{ fontFamily: '"DM Sans", sans-serif' }}>{errors.plan}</div>}

              {/* Required Note */}
              <div className="text-[0.72rem] text-slate-500 mb-2" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                * Required fields
              </div>

              {/* Submit Button */}
              <button 
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-violet-600 text-white text-[0.95rem] font-[700] uppercase tracking-[0.06em] py-4 rounded-md mt-2 transition-all duration-250 border-none flex justify-center items-center gap-2 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,92,53,0.35)] disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enrollment →"
                )}
              </button>

              {/* Safe Note */}
              <div className="text-center mt-[0.8rem] flex items-center justify-center gap-1.5 text-slate-500 text-[0.72rem]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                <Lock className="w-3 h-3" />
                <span>Your information is safe with us</span>
              </div>
            </div>
          )}

        </div>

        {/* C) DIVIDER */}
        <div className="relative flex items-center justify-center margin-top my-[4rem] mb-[3rem]">
          <div className="absolute w-full h-px bg-slate-800"></div>
          <span 
            className="relative bg-[var(--bg)] px-4 text-[0.75rem] tracking-[0.18em] text-slate-500 uppercase font-bold"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            ✦ Why Join Us ✦
          </span>
        </div>

        {/* D) WHY JOIN US SECTION */}
        <div className="flex flex-col">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            const isLast = idx === benefits.length - 1;
            
            return (
              <div 
                key={idx} 
                className={`benefit-row flex items-start gap-4 flex-row ${!isLast ? 'border-b border-[var(--border)] pb-[1.2rem] mb-[1.2rem]' : ''}`}
              >
                <div 
                  className="w-[36px] h-[36px] rounded-md flex items-center justify-center shrink-0 border"
                  style={{ background: 'rgba(255,92,53,0.1)', borderColor: 'rgba(255,92,53,0.2)' }}
                >
                  <IconComponent className="w-4 h-4 text-violet-500" />
                </div>
                <div className="flex flex-col pt-[0.1rem]">
                  <h4 className="text-[var(--text)] text-[0.92rem] font-[700]" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {benefit.title}
                  </h4>
                  <p className="text-[var(--muted)] text-[0.82rem] leading-[1.6] mt-[0.2rem] max-w-[400px]" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                    {benefit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
