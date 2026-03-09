import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Save, Calendar, Clock, CheckCircle, AlertCircle, ChevronDown, Check } from 'lucide-react';
import { apiClient } from '../utils/api';

const SprintSyllabusForm = ({ sprint }) => {
    const [sessions, setSessions] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [availableTopics, setAvailableTopics] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null); // Track which dropdown is open
    const dropdownRef = useRef(null); // To close dropdown on outside click

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch available topics for this course code
    useEffect(() => {
        if (!sprint || !sprint.course_code) return;
        
        const fetchTopics = async () => {
            try {
                // Encode the course code in case it contains slashes like FRE/A1/WD/177
                const res = await apiClient(`/available_topics/${encodeURIComponent(sprint.course_code)}`);
                if (res.ok) {
                    const data = await res.json();
                    setAvailableTopics(data.topics || []);
                }
            } catch (err) {
                console.error("Failed to fetch available topics", err);
            }
        };
        fetchTopics();
    }, [sprint]);

    // Initialize sessions based on sprint data
    useEffect(() => {
        if (!sprint) return;

        // 1. Calculate how many total sessions
        const durationWeeks = parseInt(sprint.duration_weeks) || 0;
        const schedules = sprint.schedules || [];
        
        // Sort schedules by day of week roughly (Monday to Sunday)
        const daysOrder = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 };
        const sortedSchedules = [...schedules].sort((a, b) => daysOrder[a.day_of_week] - daysOrder[b.day_of_week]);

        const sessionsPerWeek = sortedSchedules.length;
        const totalSessions = durationWeeks * sessionsPerWeek;

        if (totalSessions === 0) return;

        // Parse start date, fallback to today if invalid or missing
        let sprintStartDate = new Date(sprint.start_date);
        if (isNaN(sprintStartDate.getTime())) {
            sprintStartDate = new Date();
        }

        // We want to find the first actual class date.
        // The sprint start_date might be a Monday, but classes might be only Wed/Fri.
        // We'll iterate day by day from start_date and assign dates.
        
        // Helper to add days to a date
        const addDays = (date, days) => {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };

        // Get day index (0 = Sunday, 1 = Monday... 6 = Saturday)
        const getDayIndex = (dayName) => {
            const map = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
            return map[dayName];
        };

        // 2. Generate the blank session structure
        const generatedSessions = [];
        let sessionCounter = 1;
        let currentDate = new Date(sprintStartDate);

        for (let week = 1; week <= durationWeeks; week++) {
            sortedSchedules.forEach((schedule) => {
                // Find the next date that matches this schedule's day_of_week
                const targetDayIndex = getDayIndex(schedule.day_of_week);
                
                // Advance currentDate until it matches targetDayIndex
                while (currentDate.getDay() !== targetDayIndex) {
                    currentDate = addDays(currentDate, 1);
                }

                // Format date as YYYY-MM-DD for the input[type="date"]
                const formattedDate = currentDate.toISOString().split('T')[0];

                generatedSessions.push({
                    id: `session-${sessionCounter}`,
                    session_number: sessionCounter,
                    week: week,
                    day_of_week: schedule.day_of_week,
                    start_time: schedule.start_time,
                    end_time: schedule.end_time,
                    topic: [], // Back to Array
                    session_date: formattedDate
                });
                sessionCounter++;
                
                // Advance exactly 1 day so the next schedule search doesn't get stuck on the same day
                currentDate = addDays(currentDate, 1);
            });
            // At the end of the week, the currentDate is advanced naturally by the loop finding the next days
        }

        setSessions(generatedSessions);
        console.log("Generated Session: ", generatedSessions)
        
        // TODO: In a real implementation, you would try to fetch the existing
        // syllabus for this sprint here and merge it with the generated structure
        fetchExistingSyllabus(sprint.id, generatedSessions);

    }, [sprint]);

    const fetchExistingSyllabus = async (sprintId, baseSessions) => {
        try {
            // Attempt to fetch existing syllabus for this sprint
            const res = await apiClient(`/curriculum/sprint/${sprintId}`);
            if (res.ok) {
                const data = await res.json();
                const existingTopics = data.curriculum || data.topics || [];
                
                if (existingTopics.length > 0) {
                     // Merge the fetched data into our generated baseSessions
                     const mergedSessions = baseSessions.map(session => {
                         // Find matching existing topic by session_number (or week/day if your backend works differently)
                         const match = existingTopics.find(t => 
                            t.session_number === session.session_number || 
                            (t.week === session.week && t.day === session.day_of_week)
                         );
                         
                         if (match) {
                             // Handle backward compatibility where topic might be string or missing
                             let matchedTopics = [];
                             if (Array.isArray(match.topic)) {
                                 matchedTopics = match.topic;
                             } else if (typeof match.topic === 'string' && match.topic.trim() !== '') {
                                 matchedTopics = [match.topic];
                             }
                             
                             return {
                                 ...session,
                                 topic: matchedTopics,
                                 session_date: match.session_date || ''
                             };
                         }
                         return session;
                     });
                     
                     setSessions(mergedSessions);
                }
            }
        } catch (error) {
            console.error("Failed to fetch existing syllabus", error);
            // Non-fatal, just means they start with a blank form
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedSessions = [...sessions];
        updatedSessions[index][field] = value;
        setSessions(updatedSessions);
    };

    const handleSave = async () => {
        setMessage({ type: '', text: '' });
        setIsSaving(true);
        
        try {
            // Validate: Warn if any sessions have empty topic arrays
            const emptyTopics = sessions.filter(s => !s.topic || s.topic.length === 0);
            if (emptyTopics.length > 0) {
                 console.warn(`${emptyTopics.length} sessions have no topics assigned.`);
            }

            const payload = {
                sprint_id: sprint.id,
                course_code: sprint.course_code,
                syllabus: sessions.map(s => ({
                    session_number: s.session_number,
                    week: s.week,
                    day: s.day_of_week,
                    topic: s.topic,
                    session_date: s.session_date
                }))
            };
            
            // Execute the POST request to save the syllabus
            const res = await apiClient(`/curriculum/sprint/${sprint.id}`, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to save syllabus");
            }

            setMessage({ type: 'success', text: 'Syllabus saved successfully!' });

        } catch (error) {
            console.error("Error saving syllabus", error);
            setMessage({ type: 'error', text: error.message || 'Failed to save syllabus. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (!sprint || !sprint.schedules) {
        return <div className="p-4 text-slate-500">No sprint data available.</div>;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                            <BookOpen className="w-6 h-6" />
                            Manage Course Syllabus
                        </h2>
                        <p className="text-green-50 text-sm opacity-90">
                            {sprint.name} ({sprint.course_code})
                        </p>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm text-sm font-medium border border-white/20">
                        {sprint.duration_weeks} Weeks • {sessions.length} Total Sessions
                    </div>
                </div>
            </div>

            {/* Controls & Feedback */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
                <div className="text-sm text-slate-500 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4 text-amber-500"/>
                     Fill out the topics for each class session.
                </div>
                
                <div className="flex items-center gap-4">
                     {message.text && (
                        <span className={`text-sm flex items-center gap-1.5 font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                            {message.type === 'success' && <CheckCircle className="w-4 h-4"/>}
                            {message.text}
                        </span>
                     )}
                     <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isSaving ? 'Saving...' : 'Save Syllabus'}
                     </button>
                </div>
            </div>

            {/* Syllabus Form List */}
            <div className="p-6">
                <div className="space-y-8">
                    {/* Group by Week for nicer UX */}
                    {Array.from({ length: sprint.duration_weeks }, (_, i) => i + 1).map(weekNum => {
                        const weekSessions = sessions.filter(s => s.week === weekNum);
                        
                        if (weekSessions.length === 0) return null;

                        return (
                            <div key={`week-${weekNum}`} className="relative pl-4 border-l-2 border-slate-100">
                                <div className="absolute -left-3 top-0 bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-full border border-slate-200">
                                    WEEK {weekNum}
                                </div>
                                
                                <div className="mt-6 space-y-4">
                                    {weekSessions.map((session) => {
                                        const globalIndex = sessions.findIndex(s => s.id === session.id);
                                        
                                        return (
                                            <div key={session.id} className="group bg-white border border-slate-200 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all">
                                                <div className="flex items-start gap-4">
                                                    {/* Session Metadata Badge */}
                                                    <div className="w-32 shrink-0 space-y-2">
                                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md border border-green-100 w-full">
                                                            <Calendar className="w-3.5 h-3.5 opacity-70" />
                                                            Session {session.session_number}
                                                        </div>
                                                        <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5 pl-1">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                                            {session.day_of_week}
                                                        </div>
                                                        {session.start_time && (
                                                            <div className="text-xs text-slate-400 flex items-center gap-1.5 pl-1">
                                                                <Clock className="w-3 h-3" />
                                                                {session.start_time.substring(0,5)}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Inputs */}
                                                    <div className="flex-1 space-y-3">
                                                        <div className="relative" ref={openDropdownId === session.id ? dropdownRef : null}>
                                                            <label className="sr-only">Topic Title</label>
                                                            <div 
                                                                onClick={() => setOpenDropdownId(openDropdownId === session.id ? null : session.id)}
                                                                className="w-full text-sm font-semibold text-slate-800 border-0 border-b border-transparent hover:border-slate-200 cursor-pointer px-0 py-1 transition-colors bg-transparent flex justify-between items-center"
                                                            >
                                                                <span className="truncate pr-4 block">
                                                                    {!session.topic || session.topic.length === 0 
                                                                        ? "-- Select Topics --" 
                                                                        : session.topic.join(', ')}
                                                                </span>
                                                                <ChevronDown className="w-4 h-4 text-slate-400" />
                                                            </div>
                                                            
                                                            {openDropdownId === session.id && (
                                                                <div className="absolute z-50 left-0 top-full mt-1 w-full sm:w-[120%] bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto p-2 outline-none">
                                                                    {availableTopics.length > 0 ? (
                                                                        availableTopics.map((t, tidx) => {
                                                                            const currentTopics = session.topic || [];
                                                                            const isSelected = currentTopics.includes(t);
                                                                            
                                                                            return (
                                                                                <div 
                                                                                    key={tidx}
                                                                                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-md cursor-pointer transition-colors"
                                                                                    onClick={() => {
                                                                                        let newTopics;
                                                                                        if (isSelected) {
                                                                                            newTopics = currentTopics.filter(topicStr => topicStr !== t);
                                                                                        } else {
                                                                                            newTopics = [...currentTopics, t];
                                                                                        }
                                                                                        handleInputChange(globalIndex, 'topic', newTopics);
                                                                                    }}
                                                                                >
                                                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-green-600 border-green-600 text-white' : 'border-slate-300 bg-white'}`}>
                                                                                        {isSelected && <Check className="w-3 h-3" />}
                                                                                    </div>
                                                                                    <span className={`text-sm ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                                                                        {t}
                                                                                    </span>
                                                                                </div>
                                                                            );
                                                                        })
                                                                    ) : (
                                                                        <div className="p-3 text-sm text-slate-400 italic text-center">No topics found for this course</div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <label className="sr-only">Session Date</label>
                                                            <input
                                                                type="date"
                                                                value={session.session_date || ''}
                                                                readOnly
                                                                className="w-full text-sm text-slate-500 border-0 border-b border-transparent bg-transparent cursor-not-allowed focus:ring-0 px-0 py-1"
                                                                title="Date is automatically calculated by the system"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SprintSyllabusForm;
