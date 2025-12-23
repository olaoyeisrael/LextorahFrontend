import React from 'react'
import NavBar from '../components/NavBar'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Zap, Target } from 'lucide-react'
import heroBg from '../assets/hero-bg.png' // Import the new image
import SupportChat from '../components/SupportChat'

const Home = () => {
 
  return (
    <section className="bg-white">
      <NavBar/>
      <SupportChat />
      
      {/* Hero Section */}
      <div 
        className="pt-28 pb-20 px-4 md:px-8 mx-auto flex flex-col items-center text-center bg-cover bg-center min-h-[600px] w-full"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
            Master any subject with <span className="text-green-500">Lextorah AI</span>
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-10 max-w-3xl leading-relaxed"
        >
            Experience personalized learning with voice interaction, step-by-step guidance, and instant feedback.
        </motion.p>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
        >
            <a href="https://www.lextorah-elearning.com/elearning/register" className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Get Started for Free
            </a>
             <Link to="/login" className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 hover:border-green-200 text-lg font-bold rounded-full transition-all hover:-translate-y-1">
                Log In
            </Link>
        </motion.div>
      </div> 
    </div>

      {/* See How It Works */}
      <div className="py-24 bg-slate-50 relative overflow-hidden" id='features'>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">See How It Works</h2>
                  <p className="text-slate-600 text-lg">Getting started is as easy as one, two, three.</p>
              </div>

              <div className="space-y-12">
                  <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                          <MessageSquare className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">1. Ask Any Question</h3>
                      <p className="text-slate-600 max-w-lg leading-relaxed">Simply type in your question.</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                       <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                          <Zap className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">2. Get Instant Help</h3>
                      <p className="text-slate-600 max-w-lg leading-relaxed">Our AI provides clear, step-by-step explanations and guidance immediately.</p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                       <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                          <Target className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">3. Master the Concept</h3>
                      <p className="text-slate-600 max-w-lg leading-relaxed">Reinforce your understanding with follow-up questions and related topics.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">Loved by Students & Tutors</h2>
                  <p className="text-slate-600 text-lg">Don't just take our word for it. Here's what our users are saying.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {[
                      {
                          text: "This app is a lifesaver! I was struggling with calculus, and the step-by-step explanations made everything click. My grades have improved so much.",
                          name: "Sarah J.",
                          role: "High School Student",
                          initial: "S"
                      },
                      {
                          text: "As a parent, I love that my son has a safe and reliable tool for homework help. He's more confident in his schoolwork and less stressed.",
                          name: "David L.",
                          role: "Parent",
                          initial: "D"
                      },
                      {
                          text: "The 24/7 availability is perfect for my unpredictable study schedule. I can get help at midnight or 6 AM. It's incredibly convenient.",
                          name: "Emily R.",
                          role: "University Student",
                          initial: "E"
                      }
                  ].map((testimonial, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-2xl border border-slate-100 shadow-sm bg-white"
                      >
                          <div className="flex text-green-400 mb-4">
                              {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                          </div>
                          <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600 text-xl">
                                  {testimonial.initial}
                              </div>
                              <div>
                                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </div>

       {/* CTA Section */}
       <div className="py-24 bg-white relative">
           <div className="max-w-4xl mx-auto px-4 text-center">
               <div className="bg-slate-900 rounded-3xl p-12 md:p-20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to boost your grades?</h2>
                        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">Join thousands of students learning smarter, not harder. Get started for free today and unlock your full potential.</p>
                        <a href="https://www.lextorah-elearning.com/elearning/register" className="inline-block px-10 py-5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-green-500/25 text-lg">
                            Sign Up Now
                        </a>
                    </div>
               </div>
           </div>
       </div>

    </section>
  )
}

export default Home