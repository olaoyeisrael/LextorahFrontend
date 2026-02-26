import React from 'react'
import NavBar from '../components/NavBar'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Zap, Target, Smile, Clock, BookOpen, Shield, GraduationCap, Check, UserStar, Landmark, Instagram, Twitter, Linkedin, Facebook, CircleQuestionMark, Lightbulb, PenLine, ChartLine, NotepadText, ShieldCheck, Globe, MapPin } from 'lucide-react'
import heroBg from '../assets/lextorah-home.jpg'
import SupportChat from '../components/SupportChat'
import msLexi from '../assets/container.png'
import student from '../assets/student.png'
import teacher from '../assets/teacher.png'
import institution from '../assets/institution.png'
import ask from '../assets/ask.png'
import learn from '../assets/learn.png'
import progress from '../assets/progress.png'
import practice from '../assets/practice.png'

import educationtech from '../assets/EducationTechnology.png'


import logo from '../assets/logo.png'
import Footer from '../components/Footer'


const Home = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

 
  return (
    <section className="bg-white">
     
      <SupportChat />
      
      {/* Hero Section */}
      <div 
        className="pt-[480px] md:pt-0 pb-12 md:pb-22 px-4 md:px- mx-auto flex flex-col items-start justify-center md:items-start text-left bg-cover bg-center min-h-[600px] md:min-h-[900px] w-full"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="max-w-3xl mx-auto md:mx-0 flex flex-col items-center text-left md:pl-0">
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight text-center"
        >
            Master any subject with <span className="text-green-500 gradient-to-r from-yellow-500 to-green-600">Lextorah AI Tutor</span>
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-10 max-w-3xl leading-relaxed text-center"
        >
            Experience personalized learning with voice interaction, step-by-step guidance, and instant feedback.
        </motion.p>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
        >
            <a href="https://www.lextorah-elearning.com/elearning/register" className="px-8 py-4 bg-[#00C950] hover:bg-green-700 text-white text-lg font-bold rounded-4xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Get Started for Free
            </a>
             <Link to="/login" className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 hover:border-green-200 text-lg font-bold rounded-4xl text-center transition-all hover:-translate-y-1">
                Log In
            </Link>
        </motion.div>
      </div> 
    </div>
    {/* meet ms Lextorah*/}

    <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className='px-6 md:px-12 lg:px-28 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center' 
        id='aitutor'
    >
        <motion.div variants={fadeInUp} className="relative">
            <img src={msLexi} alt="Ms. Lexi" className="w-full h-auto" />
            <div className="absolute bottom-6 right-0 md:bottom-1.5 md:-right-10 bg-white p-4 md:p-5 rounded-2xl shadow-lg border border-slate-50 z-20 max-w-[200px] md:max-w-[240px]">
                <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse"></div>
                    <h3 className="font-bold text-slate-900 text-sm md:text-base">Available 24/7</h3>
                </div>
                <p className="text-[10px] md:text-xs text-slate-500 leading-snug">Ready to help you learn anytime, anywhere</p>
            </div>
        </motion.div>
        <motion.div variants={fadeInUp}>
        <div className='bg-[#CCFBF1] py-3 px-6 rounded-full mb-6'>
            <h1 className='text-[#0F766E] text-[24px] font-InterBold'> Meet Ms. Lexi® — Your AI Tutor & Learning Guide</h1>
        </div>
            <p className='text-[#374151] text-lg mb-6 font-Inter'>Ms. Lexi is Lextorah's AI-powered tutor and learning assistant, designed
                to support learners, teachers, and institutions with personalized, on-
                demand academic guidance. She helps learners understand concepts,
                practice skills, prepare for exams, and stay on track—without replacing
                human teachers.</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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

        </motion.div>
    </motion.div>



    {/* Comprehensive Learning Support */}
    <div className='px-6 md:px-12 lg:px-20 py-16 md:py-24' id='features'>
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className='px-4 md:px-8 pb-10'
        >
            <motion.div variants={fadeInUp} className='mb-10 text-center'>
                <h1 className='bg-[#CCFBF1] mx-auto w-fit p-4 rounded-full font-InterBold text-2xl md:text-[35px] text-[#0F766E]'>Comprehensive Learning Support</h1>
                <h1 className=' mx-auto w-fit font-InterBold text-2xl md:text-[35px] mt-3 leading-tight'>On-Demand AI Powered Personalized Support</h1>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <motion.div variants={fadeInUp} className='px-8 py-8 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] border border-[#CCFBF1] rounded-xl shadow-lg'>
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
                        <div className='flex gap-3'>
                            <Check className="w-5 h-6 text-green-600" />
                            <p className='font-Inter text-[#374151] text-sm'>Homework and assignment guidance with ethical, non-cheating support</p>
                        </div>
                    </div>

                    
                </motion.div>



                <motion.div variants={fadeInUp} className='px-8 py-8 bg-gradient-to-br from-[#FFFBEB] to-[#FFFFFF] border border-[#FEF3C7] rounded-xl shadow-lg'>
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
                    
                    
                </motion.div>


                <motion.div variants={fadeInUp} className='px-8 py-8 bg-gradient-to-br from-[#ECFDF5] to-[#FFFFFF] border border-[#D1FAE5] rounded-xl shadow-lg'>
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
                    
                    
                </motion.div>
            </div>




            </motion.div>


        
    </div>


        {/* see how it works */}

        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className='py-16 md:py-22 px-6 md:px-12 lg:px-20' 
            id='howitworks'
        >
            <motion.div variants={fadeInUp}>
                <h1 className='bg-[#CCFBF1] px-8 md:px-15 py-5 rounded-full w-fit mx-auto text-[#0F766E] font-InterBold text-[20px] md:text-[42px]'>Simple & Effective</h1>
                <h1 className='w-fit mx-auto mt-4 font-InterBold text-3xl md:text-[39px]'>How it works</h1>
                <p className='w-fit mx-auto text-[#4B5563] mt-4 font-Inter text-center'>Four simple steps to smarter learning</p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8'>
                <motion.div variants={fadeInUp} className='py-8 px-8 rounded-3xl border border-[#CCFBF1] shadow-xl'>
                    <img src={ask} alt="" className='mb-6' />
                    <CircleQuestionMark className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                    <h1 className='font-InterBold mb-3'>Ask</h1>
                    <p className='font-Inter text-[#4B5563]'>Students ask questions or request help anytime, from anywhere.</p>

                </motion.div>

                <motion.div variants={fadeInUp} className='py-8 px-8 rounded-3xl border border-[#CCFBF1] shadow-xl'>
                    <img src={learn} alt="" className='mb-6' />
                    <Lightbulb className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                    <h1 className='font-InterBold mb-3'>Learn</h1>
                    <p className='font-Inter text-[#4B5563]'>Ms. Lexi explains concepts, provides examples, and guides practice.</p>

                </motion.div>
                
                <motion.div variants={fadeInUp} className='py-8 px-8 rounded-3xl border border-[#CCFBF1] shadow-xl'>
                    <img src={practice} alt="" className='mb-6' />
                    <PenLine className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                    <h1 className='font-InterBold mb-3'>Practice</h1>
                    <p className='font-Inter text-[#4B5563] max-w-48'>Learners receive exercises, quizzes, and revision prompts.</p>

                </motion.div>

                <motion.div variants={fadeInUp} className='py-8 px-8 rounded-3xl border border-[#CCFBF1] shadow-xl'>
                    <img src={progress} alt="" className='mb-6' />
                    <ChartLine className="w-12 h-12 py-1 px-3 bg-[#CCFBF1] rounded-lg text-[#0D9488] mb-3" />
                    <h1 className='font-InterBold mb-3'>Progress</h1>
                    <p className='font-Inter text-[#4B5563]'>Learning stays aligned with Lextorah programs, study plans, tutors, and progression goals.</p>

                </motion.div>

            </div>

            
        </motion.div>


        {/* why lextorah? */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className='px-6 md:px-12 lg:px-20 py-16 md:py-20'
        >
            <motion.div variants={fadeInUp} className='px-0 md:px-6 text-center'>
                <h1 className='text-[#0F766E] font-InterBold text-xl md:text-[52px] bg-[#CCFBF1] mx-auto w-fit rounded-full py-4 px-4 mb-6'>Why Choose Lextorah AI?</h1>
                <h2 className='font-InterBold text-3xl md:text-4xl text-center mb-4'>Built for Education. Designed for Impact.</h2>
                <p className='font-Inter text-[#4B5563] text-center mt-2 text-lg'>Not just another chatbot—a purpose-built educational AI platform</p>
            </motion.div>

            <div className='grid lg:grid-cols-2 gap-12 mt-8 md:mt-16 items-center py-8'>
                <motion.div variants={fadeInUp} className='w-full rounded-xl'>


                     <img src={educationtech} alt="" className='rounded-2xl w-full h-auto' /> 

                </motion.div>

                <motion.div variants={staggerContainer} className='space-y-6'>
                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1] transition-transform hover:-translate-y-1'>
                        <BookOpen className="w-12 h-12 py-1 px-3 bg-[#0D9488] rounded-lg text-white mb-3 flex-shrink-0" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Education-First AI</h1>
                            <p className='font-Inter text-[#374151] text-sm'>Not a generic chatbot—purpose-built for learning with pedagogical principles at its core.</p>
                        </div>
                    </div>

                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1] transition-transform hover:-translate-y-1'>
                        <NotepadText className="w-12 h-12 py-1 px-3 bg-[#0D9488] rounded-lg text-white mb-3 flex-shrink-0" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Curriculum Aligned</h1>
                            <p className='font-Inter text-[#374151] text-sm'>Aligned with Lextorah curricula and programs to ensure consistent, quality education.</p>
                        </div>
                    </div>

                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1] transition-transform hover:-translate-y-1'>
                        <ShieldCheck className="w-12 h-12 py-1 px-3 bg-[#0D9488] rounded-lg text-white mb-3 flex-shrink-0" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Ethical Learning Support</h1>
                            <p className='font-Inter text-[#374151] text-sm'>No shortcuts or academic misconduct—designed to support genuine understanding.</p>
                        </div>
                    </div>

                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1] transition-transform hover:-translate-y-1'>
                        <Globe className="w-12 h-12 py-1 px-3 bg-[#0D9488] rounded-lg text-white mb-3 flex-shrink-0" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Multilingual & Inclusive</h1>
                            <p className='font-Inter text-[#374151] text-sm'>Supports multiple languages and learning levels for diverse learners worldwide.</p>
                        </div>
                    </div>

                    <div className='p-6 flex gap-4 bg-gradient-to-br from-[#F0FDFA] to-[#FFFFFF] rounded-xl shadow-xl border border-[#CCFBF1] transition-transform hover:-translate-y-1'>
                        <MapPin className="w-12 h-12 py-1 px-3 bg-[#0D9488] rounded-lg text-white mb-3 flex-shrink-0" />
                        <div className='gap-2' >
                            <h1 className='font-InterBold'>Built for Africa & Beyond</h1>
                            <p className='font-Inter text-[#374151] text-sm'>Designed for African and global learners with culturally relevant content.</p>
                        </div>
                    </div>
                </motion.div>

            </div>

            <div className="mt-20 space-y-12">
                <h1 className='font-InterBold text-3xl md:text-4xl text-center text-slate-900'>Who It's For</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Card 1 */}
                    <motion.div variants={fadeInUp} className='relative h-64 md:h-80 rounded-3xl overflow-hidden group shadow-lg cursor-pointer'>
                        <img src={student} alt="Students & Learners" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8'>
                            <h3 className='text-white text-xl md:text-2xl font-bold mb-2'>Students & Learners</h3>
                            <p className='text-white/90 text-sm md:text-base'>Anyone who wants guided, flexible, and supportive learning.</p>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div variants={fadeInUp} className='relative h-64 md:h-80 rounded-3xl overflow-hidden group shadow-lg cursor-pointer'>
                        <img src={teacher} alt="Educators" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
                         <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8'>
                            <h3 className='text-white text-xl md:text-2xl font-bold mb-2'>Educators</h3>
                            <p className='text-white/90 text-sm md:text-base'>Teachers who want students supported beyond live lessons.</p>
                        </div>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div variants={fadeInUp} className='relative h-64 md:h-80 rounded-3xl overflow-hidden group shadow-lg cursor-pointer'>
                        <img src={institution} alt="Schools & Universities" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
                         <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8'>
                            <h3 className='text-white text-xl md:text-2xl font-bold mb-2'>Schools & Universities</h3>
                            <p className='text-white/90 text-sm md:text-base'>Institutions looking to scale learning support responsibly.</p>
                        </div>
                    </motion.div>
                </div>
            </div>

        </motion.div>



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
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Loved by Students & Tutors</h2>
                  <p className="text-slate-600 text-lg">Don't just take our word for it. Here's what our users are saying.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
           <div className="max-w-7xl mx-auto px-4 text-center">
               <div className="bg-[#0F766E] rounded-3xl p-12 md:p-20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Learning Smarter with Ms. Lexi®</h2>
                        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto px-11">Join thousands of learners, educators, and institutions transforming
education with AI-powered support</p>
                        <a href="https://www.lextorah-elearning.com/elearning/register" className="inline-block px-10 py-5 bg-white hover:bg-green-600 text-[#0D9488] font-bold rounded-full transition-all shadow-lg hover:shadow-green-500/25 text-lg hover:text-white">
                            Sign Up Now
                        </a>
                    </div>
               </div>
           </div>
       </div>

{/* Footer */}

{/* <Footer/> */}
       

    </section>
  )
}

export default Home