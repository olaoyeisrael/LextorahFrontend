import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, HelpCircle, CloudUpload, CheckCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { isAdmin } from '../../utils/auth';
import { useSelector, useDispatch } from 'react-redux';

import { updateEnrollment } from '../../store/userSlice';
import Schedule from '../../components/Schedule';

const Dashboard = () => {
  const { firstName, token, enrolledLevel } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       if (!token) return;
//       try {
//         const response = await fetch('http://localhost:8000/schedule', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.enrolled) {
//            setScheduleData(data.schedule);
//            if (!enrolledLevel) {
//                dispatch(updateEnrollment({ course: data.course, level: data.level }));
//            }
//         }
//       } catch (error) {
//         console.error("Error fetching schedule:", error);
//       }
//     };
//     fetchSchedule();
//   }, [token, enrolledLevel, dispatch]);

  const handleEnroll = async (level) => {
      if (!token) return;
      setLoading(true);
      try {
          await   fetch(`${import.meta.env.VITE_BACKEND_URL}/enroll`, 
            {
                method: 'POST',
                body: JSON.stringify({ course: "German", level: level }),
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            }
          );
          dispatch(updateEnrollment({ course: "German", level }));
          // Refetch schedule handled by useEffect dependency
      } catch (error) {
          console.error("Enrollment failed:", error);
      } finally {
          setLoading(false);
      }
  };

  useEffect(()=>{
    console.log(import.meta.env.VITE_BACKEND_URL)
  }, [])


  // Admin View
  if (isAdmin()) {
      return (
        <div className='max-w-5xl mx-auto'>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600">Manage content and view student progress.</p>
            </div>
            

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                 <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
                >
                     <div className="flex justify-between items-start mb-4">
                        <div>
                             <h2 className="text-xl font-bold text-slate-900 mb-2">Upload Material</h2>
                             <p className="text-slate-600 text-sm mb-4">Add new course materials, lecture notes, or resources.</p>
                        </div>
                         <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                            <CloudUpload className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                    <Link to="/upload" className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-center transition-colors">
                        Go to Uploads
                    </Link>
                </motion.div>

                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
                >
                     <div className="flex justify-between items-start mb-4">
                        <div>
                             <h2 className="text-xl font-bold text-slate-900 mb-2">Student Performance</h2>
                             <p className="text-slate-600 text-sm mb-4">View assessment results and progress for all students.</p>
                        </div>
                         <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <Link to="/student-performance" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-center transition-colors">
                        View Performance
                    </Link>
                </motion.div>
            </div>
        </div>
      );
  }

  // Student View
  return (
    <div className='max-w-5xl mx-auto'>
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {firstName || 'Student'}!</h1>
            <p className="text-slate-600">Let's continue your learning journey to fluency.</p>
        </div>

        {/* Live Classes Widget */}
        <div className="mb-12 bg-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Live Classes Schedule</h2>
                        <p className="text-indigo-200">Total of 6 interactive 1-hour sessions for this course.</p>
                    </div>
                     <div className="hidden md:block">
                        <span className="bg-indigo-800 px-4 py-2 rounded-full text-sm font-medium">6 Sessions Total</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { day: "Monday", time: "10:00 AM" },
                        { day: "Tuesday", time: "2:00 PM" },
                        { day: "Wednesday", time: "4:00 PM" },
                        { day: "Thursday", time: "10:00 AM" },
                        { day: "Saturday", time: "11:00 AM" },
                        { day: "Sunday", time: "6:00 PM" }
                    ].map((session, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-colors">
                            <span className="block text-indigo-300 text-xs uppercase font-bold tracking-wider mb-1">{session.day}</span>
                            <span className="block text-lg font-bold">{session.time}</span>
                            <span className="block text-xs text-indigo-200 mt-1">1 Hour</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                         <h2 className="text-xl font-bold text-slate-900 mb-2">Start Lesson</h2>
                         <p className="text-slate-600 text-sm mb-4">Continue from where you left off in your course.</p>
                    </div>
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-8 h-8 text-orange-500" />
                    </div>
                </div>
                <Link to="/learn" className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-center transition-colors">
                    Go to Classroom
                </Link>
            </motion.div>

            <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
            >
                 <div className="flex justify-between items-start mb-4">
                    <div>
                         <h2 className="text-xl font-bold text-slate-900 mb-2">Quick Question</h2>
                         <p className="text-slate-600 text-sm mb-4">Ask our AI Tutor anything about German grammar or vocabulary.</p>
                    </div>
                     <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <Link to="/ask" className="w-full py-3 bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold rounded-xl text-center transition-colors">
                    Ask AI
                </Link>
            </motion.div>
        </div>
    </div>
  )
}

export default Dashboard

