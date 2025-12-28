import React from 'react'
import NavBar from '../components/NavBar'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Zap, Target, Smile, Clock, BookOpen, Shield, GraduationCap, Check, UserStar, Landmark, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react'
import heroBg from '../assets/lextorah-home.jpg'
import SupportChat from '../components/SupportChat'
import lextorah from '../assets/container.png'
import student from '../assets/student.png'
import teacher from '../assets/teacher.png'
import institution from '../assets/institution.png'
import ask from '../assets/ask.png'
import learn from '../assets/learn.png'
import progress from '../assets/progress.png'
import practice from '../assets/practice.png'
import educationtech from '../assets/educationtechnology.png'


const Home = () => {
 
  return (
    <section className="bg-white">
      <NavBar/>
      <SupportChat />
      
      {/* Hero Section */}
      <div 
        className="pt-28 pb-20 px-4 md:px-8 mx-auto flex flex-col items-center text-center bg-cover bg-center min-h-[900px] w-full"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
            Master any subject with <span className="text-green-500 gradient-to-r from-yellow-500 to-green-600">Lextorah AI Tutor</span>
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
    {/* meet ms Lextorah*/}

    <div className='px-28 py-24 grid md:grid-cols-2 gap-12' id='aitutor'>
        <img src={lextorah} alt="" />
        <div>
        <div className='bg-[#CCFBF1] py-3 px-6 rounded-full mb-6'>
            <h1 className='text-[#0F766E] text-[24px] font-InterBold'> Meet Ms. Lexi     — Your AI Tutor & Learning Guide</h1>
        </div>
            <p className='text-[#374151] text-lg mb-6 font-Inter'>Ms. Lexi is Lextorah's AI-powered tutor and learning assistant, designed
                to support learners, teachers, and institutions with personalized, on-
                demand academic guidance. She helps learners understand concepts,
                practice skills, prepare for exams, and stay on track—without replacing
                human teachers.</p>
            <div className='grid grid-cols-2 gap-4'>
                <div className='p-6 shadow-lg border border-[#CCFBF1] rounded-lg hover:border-green-600 hover:bg-[] hover:translate-y-1 transition-all'>
                    <Smile className='w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-green-600 mb-3'/>
                    <h1 className=' text-[24px] font-InterBold'> Personalized</h1>
                    <p className='text-[#4B5563] mt-1 font-Inter'>Adapts to your learning style</p>

                </div>
                <div className='p-6 shadow-lg border border-[#CCFBF1] rounded-lg hover:border-green-600 hover:bg-[] hover:translate-y-1 transition-all'>
                    <Clock className='w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-green-600 mb-3'/>
                    <h1 className=' text-[24px] font-InterBold'> Always Available</h1>
                    <p className='text-[#4B5563] mt-1 font-Inter'>24/7 learning support</p>

                </div>
                <div className='p-6 shadow-lg border border-[#CCFBF1] rounded-lg hover:border-green-600 hover:bg-[] hover:translate-y-1 transition-all'>
                    <BookOpen className='w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-green-600 mb-3'/>
                    <h1 className=' text-[24px] font-InterBold'> Multi-Subject</h1>
                    <p className='text-[#4B5563] mt-1 font-Inter'>All subjects covered</p>

                </div>
                <div className='p-6 shadow-lg border border-[#CCFBF1] rounded-lg hover:border-green-600 hover:bg-[] hover:translate-y-1 transition-all'>
                    <Shield className='w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-green-600 mb-3'/>
                    <h1 className=' text-[24px] font-InterBold'> Safe & Ethical</h1>
                    <p className='text-[#4B5563] mt-1 font-Inter'>Supports real learning</p>

                </div>
                
            </div>
        </div>
    </div>



    {/* Comprehensive Learning Support */}
    <div className='px-20 py-24' id='features'>
        <div className='px-8 pb-10'>
            <div className='mb-10'>
                <h1 className='bg-[#CCFBF1] mx-auto w-fit p-4 rounded-full font-InterBold font-[35px] text-[#0F766E]'>Comprehensive Learning Support</h1>
                <h1 className=' mx-auto w-fit font-InterBold font-[35px] mt-3'>On-Demand AI Powered Personalized Support</h1>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
                <div className='px-8 pt-8 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] border border-[#CCFBF1] rounded-xl shadow-lg'>
                    <img src={student} alt="" className='mb-6' />
                    <GraduationCap className='w-12 h-12 py-1 px-3 bg-[#0D9488] rounded-lg text-white mb-3'/>
                    <h1 className='text-[24px] font-InterBold text-[#111827]'>For Students & Learners</h1>
                    
                    <div className='space-y-3 mt-4'>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-green-600" />
                            <p className='font-Inter text-[#374151] text-sm'>Step-by-step explanations in simple language</p>
                        </div>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-green-600" />
                            <p className='font-Inter text-[#374151] text-sm'>Language practice including speaking prompts, grammar help, and vocabulary</p>
                        </div>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-green-600" />
                            <p className='font-Inter text-[#374151] text-sm'>Exam preparation and revision support</p>
                        </div>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-green-600" />
                            <p className='font-Inter text-[#374151] text-sm'>Study planning and learning reminders</p>
                        </div>
                        <div className='flex gap-3 mb-[108px]'>
                            <Check className="w-5 h-6 text-green-600" />
                            <p className='font-Inter text-[#374151] text-sm'>Homework and assignment guidance with ethical, non-cheating support</p>
                        </div>
                    </div>

                    
                </div>



                <div className='px-8 pt-8 bg-gradient-to-br from-[#FFFBEB] to-[#FFFFFF] border border-[#FEF3C7] rounded-xl shadow-lg'>
                    <img src={teacher} alt="" className='mb-6' />
                    <UserStar className='w-12 h-12 py-1 px-3 bg-[#D97706] rounded-lg text-white mb-3'/>
                    <h1 className='text-[24px] font-InterBold text-[#111827]'>For Teachers & Tutors</h1>
                    <div className='space-y-3 mt-4'>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-[#D97706]" />
                            <p className='font-Inter text-[#374151] text-sm'>Lesson reinforcement outside class time</p>
                        </div>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-[#D97706]" />
                            <p className='font-Inter text-[#374151] text-sm'>Student practice and revision support</p>
                        </div>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-[#D97706]" />
                            <p className='font-Inter text-[#374151] text-sm'>Reduced repetitive explanations</p>
                        </div>
                        <div className='flex gap-3 '>
                            <Check className="w-5 h-6 text-[#D97706]" />
                            <p className='font-Inter text-[#374151] text-sm'>Learning continuity between live sessions</p>
                        </div>
                       
                    </div>
                    
                    
                </div>


                <div className='px-8 pt-8 bg-gradient-to-br from-[#ECFDF5] to-[#FFFFFF] border border-[#D1FAE5] rounded-xl shadow-lg'>
                    <img src={institution} alt="" className='mb-6 rounded-xl' />
                    <Landmark className='w-12 h-12 py-1 px-3 bg-[#059669] rounded-lg text-white mb-3'/>
                    <h1 className='text-[24px] font-InterBold text-[#111827]'>For Institutions</h1>
                    <div className='space-y-3 mt-4'>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-[#059669]" />
                            <p className='font-Inter text-[#374151] text-sm'>Scalable learner support</p>
                        </div>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-[#059669]" />
                            <p className='font-Inter text-[#374151] text-sm'>Consistent academic guidance</p>
                        </div>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-[#059669]" />
                            <p className='font-Inter text-[#374151] text-sm'>Improved learner engagement and retention</p>
                        </div>
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-[#059669]" />
                            <p className='font-Inter text-[#374151] text-sm'>AI-assisted learning analytics and insights</p>
                        </div>
                       
                    </div>
                    
                    
                </div>
            </div>



        </div>
        
    </div>


        {/* see how it works */}

        <div className='py-22 px-20' id='howitworks'>
            <div>
                <h1 className='bg-[#CCFBF1] px-15 py-5 rounded-full w-fit mx-auto text-[#0F766E] font-InterBold text-[24px]'>Simple & Effective</h1>
                <h1 className='w-fit mx-auto mt-4 font-InterBold text-[39px]'>How it works</h1>
                <p className='w-fit mx-auto text-[#4B5563] mt-4 font-Inter '>Four simple steps to smarter learning</p>
            </div>

            <div className='grid lg:grid-cols-4 gap-8 mt-3'>
                <div className='py-8 px-8 rounded-3xl border border-[#CCFBF1] shadow-xl'>
                    <img src={ask} alt="" className='mb-6' />
                    <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                    <h1 className='font-InterBold mb-3'>Ask</h1>
                    <p className='font-Inter text-[#4B5563]'>Students ask questions or request help anytime, from anywhere.</p>

                </div>

                <div className='py-8 px-8 rounded-3xl border border-[#CCFBF1] shadow-xl'>
                    <img src={learn} alt="" className='mb-6' />
                    <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                    <h1 className='font-InterBold mb-3'>Learn</h1>
                    <p className='font-Inter text-[#4B5563]'>Ms. Lexi explains concepts, provides examples, and guides practice.</p>

                </div>
                
                <div className='py-8 px-8 rounded-3xl border border-[#CCFBF1] shadow-xl'>
                    <img src={practice} alt="" className='mb-6' />
                    <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                    <h1 className='font-InterBold mb-3'>Practice</h1>
                    <p className='font-Inter text-[#4B5563]'>Learners receive exercises, quizzes, and revision prompts.</p>

                </div>

                <div className='py-8 px-8 rounded-3xl border border-[#CCFBF1] shadow-xl'>
                    <img src={progress} alt="" className='mb-6' />
                    <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                    <h1 className='font-InterBold mb-3'>Progress</h1>
                    <p className='font-Inter text-[#4B5563]'>Learning stays aligned with Lextorah programs, study plans, tutors, and progression goals.</p>

                </div>

            </div>

            
        </div>


        {/* why lextorah? */}
        <div className='p-20 '>
            <div className='px-6'>
                <h1 className='text-[#0F766E] font-InterBold text-2xl bg-[#CCFBF1] mx-auto w-fit rounded-full py-4 px-4 mb-6'>Why Choose Lextorah AI?</h1>
                <h2 className='font-InterBold text-xl text-center'>Built for Education. Designed for Impact.</h2>
                <p className='font-Inter text-[#4B5563] text-center mt-2'>Not just another chatbot—a purpose-built educational AI platform</p>
            </div>

            <div className='grid lg:grid-cols-2 gap-12 mt-16 items-center py-8'>
                <div className='w-full rounded-xl'>
                    <img src={educationtech} alt="" className='rounded-2xl' />
                </div>

                <div className='space-y-6'>
                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1]'>
                        <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Education-First AI</h1>
                            <p className='font-Inter text-[#374151] text-sm'>Not a generic chatbot—purpose-built for learning with pedagogical principles at its core.</p>
                        </div>
                    </div>

                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1]'>
                        <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Curriculum Aligned</h1>
                            <p className='font-Inter text-[#374151] text-sm'>Aligned with Lextorah curricula and programs to ensure consistent, quality education.</p>
                        </div>
                    </div>

                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1]'>
                        <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Ethical Learning Support</h1>
                            <p className='font-Inter text-[#374151] text-sm'>No shortcuts or academic misconduct—designed to support genuine understanding.</p>
                        </div>
                    </div>

                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1]'>
                        <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Multilingual & Inclusive</h1>
                            <p className='font-Inter text-[#374151] text-sm'>Supports multiple languages and learning levels for diverse learners worldwide.</p>
                        </div>
                    </div>

                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1]'>
                        <BookOpen className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Built for Africa & Beyond</h1>
                            <p className='font-Inter text-[#374151] text-sm'>Designed for African and global learners with culturally relevant content.</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-16 space-y-12">
                <h1 className='font-InterBold text-2xl text-center'>Who It's For</h1>
                <div className="grid grid-cols-3 gap-6">
                    <div className='' >

                    </div>
                   
                </div>
            </div>

        </div>



      {/* See How It Works */}
      {/* <div className="py-24 bg-slate-50 relative overflow-hidden" id='features'>
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
      </div> */}

      {/* Testimonials */}
      <div className=" bg-white">
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
       <div className="py-18 relative">
           <div className="max-w-5xl mx-auto px-4 text-center">
               <div className="bg-[#0F766E] rounded-3xl p-12 md:p-20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Learning Smarter with Ms. Lexi®</h2>
                        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">Join thousands of learners, educators, and institutions transforming
education with AI-powered support</p>
                        <a href="https://www.lextorah-elearning.com/elearning/register" className="inline-block px-10 py-5 bg-white hover:bg-green-600 text-[#0D9488] font-bold rounded-full transition-all shadow-lg hover:shadow-green-500/25 text-lg hover:text-white">
                            Sign Up Now
                        </a>
                    </div>
               </div>
           </div>
       </div>

       <footer className="px-20 bg-gradient-to-r from-[#0D9488] to-[#0F766E]">
        <div className="py-16 px-8 space-y-12">
            <div className='grid grid-cols-4 gap-12'>
                <div className='space-y-8'>
                    <img alt="" />
                    <h1 className='text-white font-Inter'>Empowering Learning. Guiding Progress Globally.</h1>
                    <div className='flex gap-4 '>
                        <Instagram className='text-white'/>
                        <Twitter className='text-white'/>
                        <Linkedin className='text-white'/>
                        <Facebook className='text-white'/>
                    </div>
                </div>

                <div className='space-y-8 '>
                    <h1 className='font-InterBold text-white'>Product</h1>
                    <ul className='space-y-3'>
                        <li className='text-sm font-Inter text-white'>AI Tutor</li>
                        <li className='text-sm font-Inter text-white'>Digital Learning Support</li>
                        <li className='text-sm font-Inter text-white'>For Students</li>
                        <li className='text-sm font-Inter text-white'>For Parents</li>
                       
                    </ul>
                </div>
                <div className='space-y-8 '>
                    <h1 className='font-InterBold text-white'>Company</h1>
                    <ul className='space-y-3'>
                        <li className='text-sm font-Inter text-white'>About Us</li>
                        <li className='text-sm font-Inter text-white'>Contact Us</li>
                    </ul>
                </div>
                <div className='space-y-8 '>
                    <h1 className='font-InterBold text-white'>Resources</h1>
                    <ul className='space-y-3'>
                        <li className='text-sm font-Inter text-white'>Help Center</li>
                        <li className='text-sm font-Inter text-white'>Privacy Policy</li>
                        <li className='text-sm font-Inter text-white'>Terms of Use</li>
                        <li className='text-sm font-Inter text-white'>Cookie Policy</li>
                    </ul>
                </div>

            </div>
            <div className="border-t border-[#FFFFFF33] pt-8 ">
                <h1 className="text-white text-center ">© 2025 Lextorah.ai. All rights reserved.</h1>
            </div>


        </div>

       </footer>

    </section>
  )
}

export default Home