import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, HelpCircle, CloudUpload, CheckCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { isAdmin } from '../../utils/auth';
import { useSelector, useDispatch } from 'react-redux';

import { updateEnrollment } from '../../store/userSlice';
import Schedule from '../../components/Schedule';

const Dashboard = () => {
  const { firstName, token, enrolledLevel, enrolledCourse } = useSelector((state) => state.user);
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
  const [liveClasses, setLiveClasses] = useState([]);
 
//   const enrolledLevel = useSelector((state) => state.user.enrolledLevel); // Already selected above
console.log("Enrolled course:", enrolledCourse)

  useEffect(() => {
    const fetchLiveClasses = async () => {
        if (!enrolledCourse || !enrolledLevel) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/live_classes?course=${enrolledCourse.toLowerCase()}&level=${enrolledLevel.toLowerCase()}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            console.log("Live classes:", data)
            setLiveClasses(data.live_classes || []);
        } catch (err) {
            console.error("Failed to fetch live classes", err);
        }
    };
    if (token) fetchLiveClasses();
  }, [token, enrolledCourse, enrolledLevel]);

  const getStatus = (dateStr, timeStr, duration) => {
      // Parse date and time to Date object
      // Assumption: dateStr is YYYY-MM-DD, timeStr is HH:MM
      const now = new Date();
      const classStart = new Date(`${dateStr}T${timeStr}`);
      const classEnd = new Date(classStart.getTime() + duration * 60000);
      
      // Allow joining 15 mins before
      const joinStart = new Date(classStart.getTime() - 15 * 60000);

      if (now > classEnd) return 'ended';
      if (now >= joinStart && now <= classEnd) return 'active';
      return 'upcoming';
  };

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
                        <p className="text-indigo-200 capitalize">Interactive sessions for {enrolledCourse} {enrolledLevel}</p>
                    </div>
                     <div className="hidden md:block">
                        <span className="bg-indigo-800 px-4 py-2 rounded-full text-sm font-medium">{liveClasses.length} Sessions</span>
                    </div>
                </div>

                {liveClasses.length === 0 ? (
                    <div className="text-center py-8 text-indigo-300 bg-white/5 rounded-xl border border-white/10">
                        No live classes scheduled for your course level yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {liveClasses.map((session) => {
                            const status = getStatus(session.date, session.time, session.duration);
                            return (
                                <div key={session.id} className={`p-4 rounded-xl border transition-all relative overflow-hidden group ${
                                    status === 'active' 
                                        ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-900/50 transform scale-105 z-10' 
                                        : 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20'
                                }`}>
                                    <div className="text-center">
                                        <span className="block text-indigo-300 text-[10px] uppercase font-bold tracking-wider mb-1">{session.week}</span>
                                        <span className="block text-xs font-bold mb-1 opacity-75">{new Date(session.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                        <span className="block text-lg font-bold mb-2">{session.time}</span>
                                        
                                        {status === 'active' ? (
                                            <a href={session.meeting_link} target="_blank" rel="noreferrer" className="block w-full py-1.5 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors animate-pulse">
                                                Join Now
                                            </a>
                                        ) : status === 'ended' ? (
                                            <span className="inline-block px-3 py-1 bg-black/20 rounded-full text-[10px] font-medium text-indigo-300">Ended</span>
                                        ) : (
                                            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-medium text-indigo-200">Upcoming</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
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
                         <p className="text-slate-600 text-sm mb-4">Ask Ms Lexi - Our Tutor AI anything about Lessons.</p>
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

