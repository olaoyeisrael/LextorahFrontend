import React from 'react'
import { motion } from 'framer-motion'
import { ClipboardList, BookOpenCheck } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function Assessments() {
  return (
   <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-8 px-4"
   >
        <div className="mb-8">
            <h1 className='text-3xl font-bold text-slate-800 mb-2'>Assessments</h1>
            <p className='text-slate-500'>Create and manage assignments and exams.</p>
        </div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
            <motion.a variants={itemVariants} className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group block h-full' href='/assignment' >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <ClipboardList className="w-6 h-6" />
                </div>
                <h2 className='text-xl font-bold text-slate-800 mb-2'>Assignment</h2>
                <p className='text-slate-500 text-sm leading-relaxed'>Create and manage assignments for your students.</p>
            </motion.a>
            <motion.a variants={itemVariants} className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group block h-full' href='/exam-prep'>
                <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors">
                    <BookOpenCheck className="w-6 h-6" />
                </div>
                <h2 className='text-xl font-bold text-slate-800 mb-2'>Exam Prep</h2>
                <p className='text-slate-500 text-sm leading-relaxed'>Upload Materials for Exam Preparation</p>
            </motion.a>
            
        </motion.div>
   </motion.section>
  )
}

export default Assessments