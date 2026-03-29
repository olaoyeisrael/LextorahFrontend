import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Lightbulb, HelpCircle, CloudUpload, CheckCircle, Lock, Book, BookOpen, User, TriangleAlert, FileExclamationPoint, Calendar, Clock, Target, TrendingUp, ArrowRight, Zap, Play, ClipboardCheck, GraduationCap, Bot, BarChart2, Award, FileCheck, Video, Calendar1, Clock1, Clock4, TestTube, Calculator, PenTool, ChartLine, MonitorCheck, ChartColumnIncreasing } from 'lucide-react';
import { motion, time } from 'framer-motion';
import { isAdmin, isTutor } from '../../utils/auth';
import { useSelector, useDispatch } from 'react-redux';

import { updateEnrollment } from '../../store/userSlice';
import Schedule from '../../components/Schedule';
import { StudentDashboard } from '../../components/StudentsDashboard/UpcomingClass';
import { TodaysClass } from '../../components/StudentsDashboard/TodayClass';

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
  const user = useSelector((state) => state.user);
  const { firstName, token, enrolledLevel, enrolledCourse, studentSprints } = user;
  const dispatch = useDispatch();
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(false);
    const managedSprints = useSelector((state) => state.user?.managedSprints);

    const numberOfStudent = managedSprints
    const studentCount = managedSprints.reduce((acc, sprint) => {
    return acc + (sprint.students?.length || 0);
}, 0);
console.log(studentCount)

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
    <>
    <div className='max-w-6xl mx-auto'>
        <h1 className='font-InterBold text-2xl'>Dashboard</h1>
        <p className='text-[#65758B] font-Inter'>Welcome back, Tutor</p>
        <div className="mb-8 mt-6 grid md:grid-cols-4 gap-4">
            <TutorDashboard 
                title="My Classes" 
                value= '1'
                icon={BookOpen} 
                color="blue-700"
            />

            <TutorDashboard 
                title="Total Students" 
                value= {studentCount}
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

        </div>

        {/* My Sprints Grid (New Request) */}
        <div className='border-[#E1E7EF] border rounded-xl p-6 bg-white shadow-sm mt-8'>
            <div className="flex items-center gap-3 mb-6">
                <Book className="w-6 h-6 text-green-600" />
                <h1 className='font-InterBold text-2xl'>My Active Sprints</h1>
            </div>
            
            {(!user?.managedSprints && !user?.user?.managed_sprints) || (user?.managedSprints?.length === 0 && user?.user?.managed_sprints?.length === 0) ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-slate-500 font-medium">No active sprints assigned to you.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(user?.managedSprints || user?.user?.managed_sprints || []).map((sprint) => (
                        <div key={sprint.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
                                <h3 className="font-bold text-lg truncate" title={sprint.name}>{sprint.name}</h3>
                                <p className="text-green-100 text-sm font-medium">{sprint.course_code}</p>
                            </div>
                            
                            <div className="p-4 flex-1 flex flex-col gap-4 bg-white">
                                {/* Date & Duration Info */}
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <div className="text-slate-500 text-xs mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Start</div>
                                        <div className="font-semibold text-slate-800">{new Date(sprint.start_date).toLocaleDateString(undefined, { month:'short', day:'numeric'})}</div>
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <div className="text-slate-500 text-xs mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> End</div>
                                        <div className="font-semibold text-slate-800">{new Date(sprint.end_date).toLocaleDateString(undefined, { month:'short', day:'numeric'})}</div>
                                    </div>
                                    <div className="col-span-2 bg-green-50/50 p-2 rounded-lg border border-green-100/50 flex justify-between items-center">
                                        <span className="text-slate-600 text-xs font-medium">Duration</span>
                                        <span className="font-bold text-green-700 text-sm">{sprint.duration_weeks} Weeks</span>
                                    </div>
                                </div>

                                {/* Timetable Schedule */}
                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Weekly Schedule
                                    </h4>
                                    <div className="space-y-1.5">
                                        {sprint.schedules && sprint.schedules.length > 0 ? (
                                            sprint.schedules.map(sch => (
                                                <div key={sch.id} className="flex justify-between items-center text-sm">
                                                    <span className="font-medium text-slate-700">{sch.day_of_week}</span>
                                                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-xs">{sch.start_time.substring(0,5)} - {sch.end_time.substring(0,5)}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-xs text-slate-400 italic">No schedule set</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* my classes here */}
        <div className='border-[#E1E7EF] border rounded-xl p-6 bg-white shadow-sm mt-8'>
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
        
         {/* Quick Actions */}
         <div className="grid md:grid-cols-2 gap-6 mb-12 mt-8">
             <QuickActionCard
                 title="Live Classes"
                 icon={Video}
                 color="green-500"
                 link="/live-classes-admin" // adjust link if needed for tutor
             />
             <QuickActionCard
                 title="Student Performance"
                 icon={ClipboardCheck}
                 color="blue-500"
                 link="/student-performance"
             />
         </div>
     </>
 )
 }



  // Student View
  const [liveClasses, setLiveClasses] = useState([]);
 
//   const enrolledLevel = useSelector((state) => state.user.enrolledLevel); // Already selected above

    // Fetch Topics for the active student sprint using Tanstack Query
    const activeSprintId = studentSprints && studentSprints.length > 0 ? studentSprints[0].id : null;
    
    const { data: topics = [], isLoading: isLoadingTopics } = useQuery({
        queryKey: ['studentTopics', activeSprintId],
        queryFn: async () => {
            if (!activeSprintId) return [];
            const response = await apiClient(`/curriculum/sprint/${activeSprintId}`);
            if (response.ok) {
                const data = await response.json();
                return data.curriculum || [];
            }
            return [];
        },
        enabled: !!activeSprintId,
    });

    // Transform fetched topics into Courses array format for StudentDashboard component
    const mappedCourses = useMemo(() => {
        if (!topics || topics.length === 0) return [];
        return topics.slice(0, 5).map(topic => {
            const topicStr = Array.isArray(topic.topic) ? topic.topic.join(', ') : (topic.topic || "Untitled Topic");
            return {
                title: topicStr,
                time: `${new Date(topic.session_date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})} - ${topic.day}`,
                tutor: `Week ${topic.week} - Session ${topic.session_number}`,
            };
        });
    }, [topics]);

    // Transform fetched topics into ScheduleDash tracking format
    const mappedSchedule = useMemo(() => {
        if (!topics || topics.length === 0) return [];
        return topics.slice(0, 5).map(topic => {
            const topicStr = Array.isArray(topic.topic) ? topic.topic.join(', ') : (topic.topic || "Untitled Topic");
            return {
                title: topicStr,
                day: topic.day,
                time: new Date(topic.session_date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})
            };
        });
    }, [topics]);

  return (
    <div className='max-w-6xl mx-auto'>
        <div className='grid col-span-2 '>
            <div className=' bg-linear-to-r from-[#3C83F6] to-[#5048E5] w-fit p-6 rounded-xl '>
            <h1 className="text-3xl font-bold text-white">Welcome back, {firstName || 'Student'}</h1>
            <p className="text-white/80">Let's continue your learning journey to fluency.</p>

        </div>

        </div>

        <div className='mb-8 mt-6 grid md:grid-cols-2 gap-4'>
            <TodaysClass />
            <StudentDashboard  />
            {/* <StudentDashboard title="Upcoming Schedule" data={mappedSchedule} /> */}
        
            
        </div>

        <div className='mb-6'>
            <div className='flex gap-3'>
                <Zap className='w-6 h-6 text-yellow-500' />
                <h1 className='mb-3 font-InterBold'>Quick Actions</h1>

            </div>
            

            <div className='grid md:grid-cols-4 gap-4'>
                <StudentQuickActionCard 
                    title="Start Lesson"
                    description="Continue where you left off"
                    icon={Play}
                    color="blue-500"
                    link="/learn"
                />
                <StudentQuickActionCard
                    title="Take a Test"
                    description="Challenge your knowledge"
                    icon={MonitorCheck}
                    color="yellow-500"
                    link="/test"
                />
                <StudentQuickActionCard
                    title="Exam Preparation"
                    description="Get ready for exams"
                    icon={MonitorCheck}
                    color="blue-500"
                    
                />
                <StudentQuickActionCard
                    title="Ask AI Tutor"
                    description="Get instant answers"
                    icon={Bot}
                    color="green-500"
                    link="/ask"
                />
            </div>
            
        </div>

        <div>
                <div className='flex gap-3'>
            <ChartColumnIncreasing className="w-6 h-6 text-blue-500" />
            <h1 className='mb-3 font-InterBold'>Performance Snapshot</h1>
            </div>
            <div className='grid md:grid-cols-4 gap-4 mt-4'>    
                <StudentPerformanceSnapShot 
                    title="Average Score"
                    score="82%"
                    icon={Award}
                    color="blue-500"
                />
                <StudentPerformanceSnapShot 
                    title="Tests Completed"
                    score="14"
                    icon={MonitorCheck}
                    color="green-500"
                />
                <StudentPerformanceSnapShot 
                    title="Improvement"
                    score="+15%"
                    icon={ChartLine}
                    color="green-500"
                />
                <StudentPerformanceSnapShot 
                    title="Strength"
                    score="Vocabulary"
                    icon={BookOpen}
                    color="blue-500"
                />
            </div>
        </div>

        

      
    </div>
  )
}

// Tutors Dashboard

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


  


    const StudentQuickActionCard = ({title, description, icon: Icon, color, link}) =>{
        return (
            <Link to={link} className="bg-white flex flex-col items-center rounded-xl p-4 mb-4 justify-center gap-4 border border-[#E1E7EF] shadow-sm hover:shadow-md transition-shadow">
                <div>
                     <Icon className={`w-6 h-6 text-${color}`} />
                </div>
               
                
                <div>
                    <h3 className="font-medium font-Inter text-lg text-center">{title}</h3>
                    <p className="text-[#65758B] font-Inter text-center">{description}</p>
                </div>
            </Link>
        )

    }


    const StudentPerformanceSnapShot = ({title, score, icon: Icon, color}) => {
        return (
            <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] flex items-center gap-4 shadow-sm ">
               
                    <Icon className={`w-6 h-6 text-${color}`} />
                
                <div>
                    <h3 className="text-sm text-slate-500">{title}</h3>
                    <p className="font-bold text-lg">{score}</p>
                </div>
            </div>
        )
    }

export default Dashboard;
