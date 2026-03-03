import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Lightbulb, GraduationCap, MonitorCheck, School } from 'lucide-react'
import Results from '../../components/Results'
function Assessment() {
  return (
    <section className="max-w-5xl mx-auto"> 
    
      <h1 className="text-4xl font-bold mb-4 ">Assessment Center</h1>
      <div className='grid md:grid-cols-2 gap-3 space-y-3'>
         <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                         <h2 className="text-xl font-bold text-slate-900 mb-2">Take a test</h2>

                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MonitorCheck className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <Link to="/test" className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-center transition-colors">
                    Start Test
                </Link>
            </motion.div>

             <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                         <h2 className="text-xl font-bold text-slate-900 mb-2">Assignment</h2>

                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <School className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <Link  className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-center transition-colors">
                    Start Assignment
                </Link>
            </motion.div>
            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                         <h2 className="text-xl font-bold text-slate-900 mb-2">Exam Prep</h2>

                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <Link to="/exam-prep" className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-center transition-colors">
                    Start Exam Prep
                </Link>
            </motion.div>
           
      
      

    </div>
    <Results/>
      

    
    </section>
  )
}

export default Assessment