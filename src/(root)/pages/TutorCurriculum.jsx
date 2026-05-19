import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Layers } from 'lucide-react'

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

function TutorCurriculum() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-8 px-4"
    >
        <div className="mb-8">
            <h1 className='text-3xl font-bold text-slate-800 mb-2' >Curriculum Management</h1>
            <p className='text-slate-500'>Create and manage your curriculum and topics.</p> 
        </div>
        
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
            <motion.a 
                variants={itemVariants}
                className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group block' 
                href='/curriculum' 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
            >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                </div>
                <h2 className='text-xl font-bold text-slate-800 mb-2'>Curriculum</h2>
                <p className='text-slate-500 text-sm leading-relaxed'>Create and organize your curriculum with topics.</p>
            </motion.a>

            <motion.a 
                variants={itemVariants}
                className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group block' 
                href='/assign-topics' 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }} 
            >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Layers className="w-6 h-6" />
                </div>
                <h2 className='text-xl font-bold text-slate-800 mb-2'>Assign Topics</h2>
                <p className='text-slate-500 text-sm leading-relaxed'>Assign specific topics to sprints.</p>
            </motion.a>
        </motion.div>  
    </motion.section>
  )
}

export default TutorCurriculum