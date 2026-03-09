import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, ChevronRight, Loader, LoaderCircleIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../../utils/api';

const LearnSelection = () => {
    const navigate = useNavigate();
    const { token, studentSprints } = useSelector((state) => state.user);

    // Helper to safely format array or string topics
    const getTopicString = (topic) => {
        if (Array.isArray(topic)) {
            return topic.join(', ');
        }
        return topic || '';
    };

    const [activeSprintId, setActiveSprintId] = useState(
        studentSprints && studentSprints.length > 0 ? studentSprints[0].id : null
    );

    // Scroll to top on mount
    useEffect(() => {
        const el = document.getElementById('main-content');
        if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Fetch Syllabus Topics Dynamically based on expanded Sprint
    const { data: sprintData, isLoading: loadingTopics } = useQuery({
        queryKey: ['sprintTopics', activeSprintId],
        queryFn: async () => {
            if (!activeSprintId) return null;
            const res = await apiClient(`/curriculum/sprint/${activeSprintId}`);
            if (res.ok) {
                return await res.json();
            }
            return null;
        },
        enabled: !!activeSprintId
    });

    const topics = sprintData?.curriculum || [];

    // Fetch User Progress for Locking Logic
    const { data: progressData } = useQuery({
        queryKey: ['userProgress', activeSprintId],
        queryFn: async () => {
            const activeSprint = studentSprints?.find(s => s.id === activeSprintId);
            const courseCode = activeSprint?.course_code || '';
            const res = await apiClient(`/progress?course_code=${encodeURIComponent(courseCode)}`);
            if (res.ok) return await res.json();
            return null;
        },
        enabled: !!activeSprintId
    });

    console.log("Completed topic: ", progressData?.completed_topics)

    const completedTopics = progressData?.completed_topics || [];

    const handleTopicClick = (topicObj, courseName) => {
        const activeSprint = studentSprints?.find(s => s.id === activeSprintId);
        const courseCode = activeSprint?.course_code || '';
        // Navigate to the actual lesson page passing the necessary context
        navigate('/lesson', {
            state: {
                activeSprintId,
                courseName,
                courseCode,
                topicObj
            }
        });
    };

    if (!token) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-Mada">
            
            <div className='bg-green-600 border-b border-green-700 shadow-sm sticky top-0 z-30'>
                <div className='max-w-7xl mx-auto px-6 py-8 md:py-10 text-white'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3'>
                        <BookOpen className="w-8 h-8 opacity-80" /> My Learning Path
                    </h1>
                    <p className='text-green-100 text-lg max-w-2xl'>
                        Select a course below to view available topics and begin your interactive AI lessons.
                    </p>
                </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Course List (Left Side) */}
                    <div className="lg:col-span-5 space-y-4">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                           Enrolled Courses
                        </h2>
                        {studentSprints && studentSprints.length > 0 ? (
                            studentSprints.map((course) => (
                                <motion.div 
                                    whileHover={{ y: -2 }}
                                    onClick={() => setActiveSprintId(course.id)}
                                    key={course.id} 
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                                        activeSprintId === course.id 
                                        ? 'bg-white border-green-500 shadow-md ring-4 ring-green-50' 
                                        : 'bg-white border-slate-200 hover:border-green-300 hover:shadow-sm'
                                    }`}
                                >
                                    <div className="flex flex-col pr-4">
                                        <span className={`font-bold text-lg mb-1 ${activeSprintId === course.id ? 'text-green-800' : 'text-slate-800'}`}>
                                            {course.name}
                                        </span>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                                                {course.course_code}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeSprintId === course.id ? 'bg-green-100 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                                         <ChevronRight className={`w-6 h-6 transition-transform ${activeSprintId === course.id ? 'rotate-90' : ''}`} />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
                                No courses currently assigned.
                            </div>
                        )}
                    </div>

                    {/* Topics List (Right Side) */}
                    <div className="lg:col-span-7">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 sticky top-[130px] md:top-[120px] bg-slate-50 pt-4 pb-4 z-10 shadow-sm -mt-4 -mx-2 px-2">
                           {activeSprintId ? "Course Modules" : "Select a Course"}
                        </h2>
                        
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2">
                            {activeSprintId ? (
                                loadingTopics ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                                        <LoaderCircleIcon className="w-10 h-10 animate-spin text-green-500" /> 
                                        <span>Loading syllabus...</span>
                                    </div>
                                ) : topics.length > 0 ? (
                                    <div className="divide-y divide-slate-100">
                                        {topics.map((t, idx) => {
                                            const topicStr = getTopicString(t.topic);
                                            const prevTopicStr = idx > 0 ? getTopicString(topics[idx - 1].topic) : null;
                                            
                                            const isSequenceLocked = idx > 0 && !completedTopics.includes(prevTopicStr);
                                            const isDateLocked = t.session_date ? new Date(t.session_date) > new Date() : false;
                                            
                                            const isLocked = isSequenceLocked || isDateLocked;
                                            const isCompleted = completedTopics.includes(topicStr);

                                            return (
                                                <div
                                                    key={idx}
                                                    className={`p-4 md:p-6 transition-colors flex items-center sm:items-start flex-col sm:flex-row gap-4 sm:gap-6 ${
                                                        isLocked ? 'opacity-60 bg-slate-50/50' : 'hover:bg-green-50/50'
                                                    }`}
                                                >
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg border-2 ${
                                                        isLocked ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-green-100 border-green-200 text-green-700'
                                                    }`}>
                                                        {idx + 1}
                                                    </div>
                                                    
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1 justify-center sm:justify-start">
                                                            <h3 className={`font-bold text-lg sm:text-xl ${isLocked ? 'text-slate-500' : 'text-slate-800'}`}>
                                                                {topicStr || `Session ${t.session_number}`}
                                                            </h3>
                                                            {isCompleted && (
                                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded-md border border-green-200">
                                                                    <CheckCircle2 className="w-3 h-3" /> Completed
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-slate-500 text-sm mb-4">
                                                            {t.description || "Interactive AI Lesson & Quiz"}
                                                        </p>
                                                        
                                                        {isLocked ? (
                                                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                                                                <Loader className="w-3.5 h-3.5" /> 
                                                                {isDateLocked && t.session_date 
                                                                    ? `Available ${new Date(t.session_date).toLocaleDateString()}` 
                                                                    : 'Locked'}
                                                            </div>
                                                        ) : (
                                                            <button 
                                                                onClick={() => {
                                                                    if (!isCompleted) {
                                                                        const cName = studentSprints.find(s => s.id === activeSprintId)?.name;
                                                                        handleTopicClick(t, cName);
                                                                    }
                                                                }}
                                                                disabled={isCompleted}
                                                                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95 ${
                                                                    isCompleted 
                                                                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                                                                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg text-white'
                                                                }`}
                                                            >
                                                                {isCompleted ? "Completed" : <>Start Lesson <ChevronRight className="w-4 h-4" /></>} 
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-4">
                                         <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                                              <BookOpen className="w-8 h-8" />
                                         </div>
                                        <p>No lesson modules found for this course.</p>
                                    </div>
                                )
                            ) : (
                                <div className="py-24 text-center text-slate-400">
                                    Click on a course from the left to view its topics.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnSelection;
