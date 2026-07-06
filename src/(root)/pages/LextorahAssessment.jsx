import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import AssesmentImage from '../../../public/images/AssesmentImage.png'
import { apiClient } from '../../utils/api';
import { 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  ArrowDown, 
  Check, 
  ArrowRight, 
  ChevronDown, 
  Loader2, 
  ShieldCheck, 
  Lightbulb, 
  GraduationCap, 
  LineChart, 
  Brain, 
  Building2, 
  Layers,
  Settings,
  Shield,
  BookOpen
} from 'lucide-react';

// Form validation schema using Zod
const formSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  fullName: z.string().min(1, 'Your name is required'),
  position: z.string().min(1, 'Position is required'),
  email: z.string().email('Please enter a valid school email address'),
  phone: z.string().min(10, 'Please enter a valid phone number (minimum 10 digits)'),
  schoolSize: z.string().min(1, 'Please select your school size'),
});

const LextorahAssessment = () => {
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState('');

  // TanStack Form Setup
  const form = useForm({
    defaultValues: {
      schoolName: '',
      fullName: '',
      position: '',
      email: '',
      phone: '',
      schoolSize: '',
      preferredMode: 'Online only',
    },
    onSubmit: async ({ value }) => {
      try {
        // Validate payload using Zod schema
        const validatedData = formSchema.parse(value);
        
        const res = await apiClient('/api/consultations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...validatedData,
            preferredMode: 'Online only'
          }),
        });

        const json = await res.json();
        if (res.ok) {
          setSubmitStatus('success');
          setSubmitMessage(json.msg || 'Your consultation request has been successfully submitted!');
          form.reset();
        } else {
          setSubmitStatus('error');
          setSubmitMessage(json.detail || 'Failed to submit request. Please try again.');
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          setSubmitStatus('error');
          setSubmitMessage('Please fill in all fields correctly.');
        } else {
          setSubmitStatus('error');
          setSubmitMessage('Failed to connect to server. Please try again later.');
        }
      }
    },
  });

  const scrollToForm = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 font-Inter text-slate-800 antialiased overflow-hidden">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            AI Readiness for Schools
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Is Your School Ready for an <span className="text-green-600 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">AI-Powered</span> Future?
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            The schools leading tomorrow are adopting AI today. Discover how prepared your school is with a complimentary, data-driven AI Readiness Consultation.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "Personalized AI Readiness Assessment",
              "Strategic Technology & Training Recommendations",
              "Tailored 90-Day Implementation Roadmap"
            ].map((text, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-3 text-sm font-semibold text-slate-700"
              >
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-105 hover:shadow-xl hover:shadow-green-200 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              Book My Free Consultation
              
            </button>
          </div>
        </motion.div>

        {/* Right Dashboard Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-5 relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-[420px]">
            {/* Main Mockup Image */}
            <img 
              src={AssesmentImage} 
              alt="Lextorah AI Readiness Assessment Dashboard" 
              className="w-full h-auto object-cover rounded-3xl border border-slate-200 shadow-2xl relative z-10"
            />
            
            {/* Floating Stats Card Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl flex items-center gap-3 z-20 min-w-[210px]">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                <LineChart className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Avg. Readiness Score</p>
                <p className="text-sm font-black text-slate-800 mt-1.5 leading-none">Improve by 3.4x</p>
              </div>
            </div>
            
            {/* Background Blur Decorative Glows */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-green-300/30 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none z-0" />
          </div>
        </motion.div>
      </section>

      {/* ─── 2. WHY THIS MATTERS ─── */}
      <section className="bg-white border-y border-slate-200 py-16 px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-green-600 font-bold text-xs uppercase tracking-wider">Why This Matters</p>
          <h2 className="text-3xl font-bold text-slate-955">Education Has Changed.</h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Your students will graduate into an AI-driven economy. <br/>
            The question isn't whether artificial intelligence will change education. It already has. 
          </p>
          <p className="text-[#3DB44A] font-extrabold text-xl">
            <span className='text-black'>The question is:</span> Will your school be ready?
          </p>
        </div>
      </section>

      {/* ─── 3. COMPLIMENTARY CONSULTATION INCLUDES ─── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <p className="text-green-600 font-bold text-xs uppercase tracking-wider">What You'll Get</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-955 mt-2">Your Complimentary Consultation Includes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { num: "01", title: "AI Readiness Score" },
            { num: "02", title: "Executive Strategy Session" },
            { num: "03", title: "Strengths & Opportunities" },
            { num: "04", title: "Practical Recommendations" },
            { num: "05", title: "90-Day AI Roadmap" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs flex flex-col justify-between items-start min-h-[170px]"
            >
              <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">{item.num}</span>
              <div className="my-auto py-2">
                <div className="w-8 h-8 bg-[#3DB44A26] text-green-600 rounded-full flex items-center justify-center shadow-xs">
                  <Check className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm leading-snug tracking-tight text-left">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 4. SEVEN STRATEGIC AREAS ─── */}
      <section className="bg-[#0B1E19] text-white py-20 px-6 mx-auto mb-24 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-3 relative z-10">
          <span className="text-green-400 font-bold text-xs uppercase tracking-wider">What We Assess</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Seven strategic areas.</h2>
          <p className="text-emerald-100/70 text-sm max-w-xl mx-auto">
            We evaluate your school across the pillars that determine AI readiness.
          </p>
        </div>

        {/* Row 1: 4 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto relative z-10">
          {[
            { icon: Users, title: "Leadership" },
            { icon: GraduationCap, title: "Teaching" },
            { icon: Users, title: "Students" },
            { icon: BookOpen, title: "Curriculum" },
              { icon: LineChart, title: "Learning Analytics" },
            { icon: Settings, title: "Operations" },
            { icon: Shield, title: "AI Governance" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 bg-[#3DB44A] text-white rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-white tracking-wide">{item.title}</h3>
            </div>
          ))}
        </div>

        
       

        {/* Decorative Grid Blurs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
      </section>

      {/* ─── 5. DESIGNED FOR DECISION-MAKERS ─── */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-8 items-center mb-24">
        <div className="md:col-span-6 space-y-4">
          <span className="text-xs font-bold text-green-600 uppercase tracking-widest block">Who It's For</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Designed for the decision-makers.
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md font-medium">
            If you set the vision for your school, this consultation gives you the clarity and confidence to lead your AI transition.
          </p>
        </div>
        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "School Owners",
            "Proprietors",
            "Principals",
            "Academic Directors",
            "Heads of School"
          ].map((role, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/80 px-4 py-3.5 rounded-2xl flex items-center gap-3 shadow-xs hover:border-green-300 transition-colors"
            >
              <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800">{role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. THREE SIMPLE STEPS ─── */}
      <section className="md:px-52 mx-auto py-24 bg-[#F1F7F266] px-6 text-center mb-24">
        <div className="mb-12">
          <p className="text-green-600 font-bold text-xs uppercase tracking-wider">How It Works</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Three Simple Steps</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
          {[
            { step: "Step 1", icon: Calendar, title: "Book", desc: "Choose a date." },
            { step: "Step 2", icon: Users, title: "Meet", desc: "45-minute consultation." },
            { step: "Step 3", icon: FileText, title: "Receive", desc: "Your AI Readiness Report." }
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl w-full max-w-[240px] shadow-sm relative flex flex-col items-center">
                <span className="absolute -top-3 px-3 py-0.5 bg-green-600 text-white text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">
                  {item.step}
                </span>
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 mt-2">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>

        
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ─── 7. LEAD WITH DATA / CTA BANNER ─── */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center space-y-6 mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Lead with Data.<br />
          <span className="text-green-600 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Teach with Purpose.</span>
        </h2>
        <p className="text-slate-500 text-sm font-medium">
          Book your complimentary AI Readiness Consultation.
        </p>
        <div className="pt-2">
          <button 
            onClick={scrollToForm}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            Book Consultation
          </button>
        </div>
      </section>

      {/* ─── 8. BOOKING FORM (RESERVE YOUR SESSION) ─── */}
      <section id="booking-section" className="bg-[#F1F7F266] border-t border-slate-200/80 py-20 px-6 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
          <span className="text-xs font-bold text-green-600 uppercase tracking-widest block">Book Your Consultation</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-955">Reserve your session</h2>
          <p className="text-xs text-slate-500 font-semibold">
            Preferred consultation mode: <span className="text-slate-800 font-bold">Online only.</span>
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Session Requested!</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed font-semibold">
                  {submitMessage}
                </p>
                <button 
                  onClick={() => setSubmitStatus(null)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors border border-slate-200 cursor-pointer"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form 
                key="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-semibold">
                    {submitMessage}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {/* School Name */}
                  <form.Field
                    name="schoolName"
                    validators={{
                      onChange: ({ value }) => {
                        const result = formSchema.shape.schoolName.safeParse(value);
                        return !result.success ? result.error.issues[0]?.message : undefined;
                      }
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase" htmlFor={field.name}>School Name</label>
                        <input
                          id={field.name}
                          type="text"
                          placeholder="e.g. Bright Future Academy"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-slate-700 bg-[#FFFFFF]"
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <p className="text-red-500 text-xs font-semibold">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  {/* Your Name */}
                  <form.Field
                    name="fullName"
                    validators={{
                      onChange: ({ value }) => {
                        const result = formSchema.shape.fullName.safeParse(value);
                        return !result.success ? result.error.issues[0]?.message : undefined;
                      }
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase" htmlFor={field.name}>Your Name</label>
                        <input
                          id={field.name}
                          type="text"
                          placeholder="Full name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-slate-700 bg-[#FFFFFF]"
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <p className="text-red-500 text-xs font-semibold">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {/* Position */}
                  <form.Field
                    name="position"
                    validators={{
                      onChange: ({ value }) => {
                        const result = formSchema.shape.position.safeParse(value);
                        return !result.success ? result.error.issues[0]?.message : undefined;
                      }
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase" htmlFor={field.name}>Position</label>
                        <input
                          id={field.name}
                          type="text"
                          placeholder="e.g. Principal"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-slate-700 bg-[#FFFFFF]"
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <p className="text-red-500 text-xs font-semibold">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  {/* Email */}
                  <form.Field
                    name="email"
                    validators={{
                      onChange: ({ value }) => {
                        const result = formSchema.shape.email.safeParse(value);
                        return !result.success ? result.error.issues[0]?.message : undefined;
                      }
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase" htmlFor={field.name}>Email</label>
                        <input
                          id={field.name}
                          type="email"
                          placeholder="you@school.edu"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-slate-700 bg-[#FFFFFF]"
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <p className="text-red-500 text-xs font-semibold">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {/* Phone */}
                  <form.Field
                    name="phone"
                    validators={{
                      onChange: ({ value }) => {
                        const result = formSchema.shape.phone.safeParse(value);
                        return !result.success ? result.error.issues[0]?.message : undefined;
                      }
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 uppercase" htmlFor={field.name}>Phone</label>
                        <input
                          id={field.name}
                          type="text"
                          placeholder="+234..."
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-slate-700 bg-[#FFFFFF]"
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <p className="text-red-500 text-xs font-semibold">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  {/* School Size */}
                  <form.Field
                    name="schoolSize"
                    validators={{
                      onChange: ({ value }) => {
                        const result = formSchema.shape.schoolSize.safeParse(value);
                        return !result.success ? result.error.issues[0]?.message : undefined;
                      }
                    }}
                  >
                    {(field) => (
                      <div className="space-y-1.5 relative">
                        <label className="text-xs font-bold text-slate-600 uppercase" htmlFor={field.name}>School Size</label>
                        <select
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-slate-700 bg-white appearance-none cursor-pointer pr-10"
                        >
                          <option value="">Select size</option>
                          <option value="Under 250 students">Under 250 students</option>
                          <option value="250 - 500 students">250 - 500 students</option>
                          <option value="500 - 1000 students">500 - 1000 students</option>
                          <option value="1000 - 2000 students">1000 - 2000 students</option>
                          <option value="Over 2000 students">Over 2000 students</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-[32px] w-4 h-4 text-slate-400 pointer-events-none" />
                        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                          <p className="text-red-500 text-xs font-semibold">{field.state.meta.errors[0]}</p>
                        )}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Consultation Mode Alert */}
                <div className="px-6 py-4 text-sm bg-[#F4FBF7] border border-[#D8F3E5] rounded-2xl text-left">
                  <span className="text-slate-600 font-medium">Preferred Consultation Mode: </span>
                  <span className="text-slate-800 font-bold">Online only.</span>
                </div>

                <div className="pt-2">
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-xl text-center shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Book Consultation"
                        )}
                      </button>
                    )}
                  </form.Subscribe>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="max-w-6xl mx-auto px-6 border-t border-slate-200/80 mt-20 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 font-semibold gap-4">
        <span>&copy; 2026 Lextorah. All rights reserved.</span>
        <span>AI Readiness Consultation for Schools</span>
      </footer> */}
      
    </div>
  );
};

export default LextorahAssessment;