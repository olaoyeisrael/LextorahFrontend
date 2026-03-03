import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, HelpCircle, CloudUpload, CheckCircle, Lock, Book, BookOpen, User, TriangleAlert, FileExclamationPoint, Calendar, Clock, Target, TrendingUp, ArrowRight, Zap, Play, ClipboardCheck, GraduationCap, Bot, BarChart2, Award, FileCheck, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { isAdmin, isTutor } from '../../utils/auth';
import { useSelector, useDispatch } from 'react-redux';

import { updateEnrollment } from '../../store/userSlice';
import Schedule from '../../components/Schedule';

import { apiClient } from '../../utils/api';

const classData = [
    {
        course: "German",
        level: "A1",
        students: 5,
        Alerts: "1 alert"
    },
    {
        course: "Spanish",
        level: "A2",
        students: 4,
        Alerts: "No alerts"},
    {
        course: "French",
        level: "B1",
        students: 3,
        Alerts: "2 alerts"
    }
]
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
          await apiClient('/enroll', 
            {
                method: 'POST',
                body: JSON.stringify({ course: "German", level: level }),
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
  if (isTutor()) {    

return (
    <div className='max-w-6xl mx-auto'>
        <h1 className='font-InterBold text-2xl'>Dashboard</h1>
        <p className='text-[#65758B] font-Inter'>Welcome back, Tutor</p>
        <div className="mb-8 mt-6 grid md:grid-cols-4 gap-4">
            <TutorDashboard 
                title="My Classes" 
                value= '3'
                icon={BookOpen} 
                color="blue-700"
            />

            <TutorDashboard 
                title="Total Students" 
                value= '12'
                icon={User} 
                color="blue-500"
            />
             <TutorDashboard 
                title="Reports Pending" 
                value= '2'
                icon={FileExclamationPoint} 
                color="yellow-500"
            />

             <TutorDashboard 
                title="Students at Risk" 
                value= '2'
                icon={TriangleAlert} 
                color="red-500"
            />

            
        </div>

        {/* my classes here */}
        <div className='border-[#E1E7EF] border rounded-xl p-6 bg-white shadow-sm'>
            <h1 className='font-InterBold text-3xl'>My Classes</h1>
                <div className="overflow-x-auto mt-4">
                <table className="w-full text-left">
                    <thead className='text-[#65758B] font-Inter text-sm'>
                        <tr className="border-b border-[#E1E7EF]">
                            <th className="py-2">Course</th>
                            <th className="py-2">Level</th>
                            <th className="py-2">Students</th>
                            <th className="py-2">Alerts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classData.map((cls, index) => (
                            <tr key={index} className="border-b border-[#E1E7EF] transition-colors">
                                <td className="py-3">{cls.course}</td>
                                <td className="py-3">{cls.level}</td>
                                <td className="py-3">{cls.students}</td>
                                <td className="py-3">{cls.Alerts}</td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            

        </div>

        
    </div>

    <div className='max-w-6xl mx-auto mt-6'>
        <div className='flex items-center gap-2 mb-4'>
        <Zap className="w-6 h-6 text-yellow-500" />
        <h1 className='font-InterBold'>Quick Actions</h1>
        </div>
        <div className="mb-8 mt-6 grid md:grid-cols-4 gap-4">

            <QuickActionCard

                title="Live Classes"
                icon={Video}
                color="green-500"
                onClick={() => alert("Starting class...")}
            />

            <QuickActionCard
                title="Student Performance"
                icon={ClipboardCheck}
                color="blue-500"
                onClick={() => alert("Viewing performance...")}
            />
            </div>

        </div>
    </div>
)
}



  // Student View
  const [liveClasses, setLiveClasses] = useState([]);
 
//   const enrolledLevel = useSelector((state) => state.user.enrolledLevel); // Already selected above

       
            {/* Today's Classes */}
            console.log("Enrolled course:", enrolledCourse)

  useEffect(() => {
    const fetchLiveClasses = async () => {
        if (!enrolledCourse || !enrolledLevel) return;
        try {
            const res = await apiClient(`/live_classes?course=${enrolledCourse.toLowerCase()}&level=${enrolledLevel.toLowerCase()}`);
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
                                            session.recording_link ? (
                                                <a href={session.recording_link} target="_blank" rel="noreferrer" className="block w-full py-1.5 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 transition-colors">
                                                    Watch Recording
                                                </a>
                                            ) : (
                                                <span className="inline-block px-3 py-1 bg-black/20 rounded-full text-[10px] font-medium text-indigo-300">Ended</span>
                                            )
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
                         <p className="text-slate-600 text-sm mb-4">Ask Ms Lexi - Our AI Tutor anything about Lessons.</p>
                    </div>
                     <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <Link to="/ask" className="w-full py-3 bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold rounded-xl text-center transition-colors">
                    Ask Ms Lexi
                </Link>
            </motion.div>
        </div>
    </div>
  )
}

// Tutors Dashboard


export default Dashboard

const TutorDashboard = ({title, value, icon: Icon, color }) => {
    return (
        <div className="border border-[#1C43B0] border-t-4 rounded-xl px-6 py-5 flex items-center  max-w-2xs">
            <div>
                <h1 className="text-sm font-Inter text-[#65758B]">{title}</h1>
                <p className="font-InterBold text-3xl">{value}</p>
            </div>
            <div className="ml-auto">
                <Icon className={`w-8 h-8 text-${color}`} />
            </div>
        </div>
    )
}
           
        
    
const QuickActionCard = ({ title, description, icon: Icon, color, link }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between"
        >
             <div className="flex justify-between items-start mb-4">
                <div>
                     <h2 className="text-xl font-bold text-slate-900 mb-2">{title}</h2>
                     <p className="text-slate-600 text-sm mb-4">{description}</p>
                </div>
                 <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Icon className={`w-8 h-8 text-${color}`} />
                </div>
            </div>
            <Link to={link} className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-center transition-colors">
                View
            </Link>
        </motion.div>
    )
}
  


