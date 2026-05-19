import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LineChart, BellRing } from 'lucide-react'

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

function Analytics() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-8 px-4"
    >
        <div className="mb-8">
            <h1 className='text-3xl font-bold text-slate-800 mb-2'>Analytics</h1>
            <p className='text-slate-500'>View detailed student performance, and AI insights.</p>
        </div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
            <motion.div variants={itemVariants}>
                <Link className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group block h-full' to='/student-performance' >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <LineChart className="w-6 h-6" />
                    </div>
                    <h2 className='text-xl font-bold text-slate-800 mb-2'>Student Performance</h2>
                    <p className='text-slate-500 text-sm leading-relaxed'>Track individual and class performance across subjects and topics.</p>
                </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <Link className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group block h-full' to='/ai-report'>
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                        <BellRing className="w-6 h-6" />
                    </div>
                    <h2 className='text-xl font-bold text-slate-800 mb-2'>AI Alert</h2>
                    <p className='text-slate-500 text-sm leading-relaxed'>Receive real-time alerts about student progress and potential issues.</p>
                </Link>
            </motion.div>
            
        </motion.div>  

    </motion.section>
    

  )
}

export default Analytics