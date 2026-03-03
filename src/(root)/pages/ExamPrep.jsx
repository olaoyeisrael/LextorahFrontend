import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Lightbulb, GraduationCap, MonitorCheck, School, BookOpen } from 'lucide-react'

function ExamPrep() {
  return (
    <section className="max-w-5xl mx-auto"> 
        <h1 className="text-4xl font-bold ">Exam Preparation</h1>
        <p className='font-Inter text-[#65758B] mb-4'>Get ready for your exams with AI-powered insights</p>
        <div className='grid md:grid-cols-2 gap-4'>
            

            <motion.div   
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
            >
                <div className="flex flex-col items-center justify-center mb-4">
                     <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="text-center mt-4">
                         <h2 className="text-xl font-bold text-slate-900 mb-2">Practice Questions</h2>
                         <p className='font-Inter text-[#65758B]'>Drill core concepts</p>
                    </div>
                   
                </div>
                <Link  className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-center transition-colors mt-10">
                    Start
                </Link>
            </motion.div>

            <motion.div   
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
            >
                <div className="flex flex-col items-center justify-center mb-4">
                     <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="text-center mt-4">
                         <h2 className="text-xl font-bold text-slate-900 mb-2">Timed Mock Exams</h2>
                         <p className='font-Inter text-[#65758B]'>Simulate real exams</p>
                    </div>
                   
                </div>
                <Link  className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-center transition-colors mt-10">
                    Start
                </Link>
            </motion.div>

        </div>
    </section>
  )
}

export default ExamPrep