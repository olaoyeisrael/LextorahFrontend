import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Video, Calendar, Clock, ExternalLink, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiClient } from '../../utils/api';

function StudentLiveClasses() {
    const user = useSelector((state) => state.user);
    const { studentSprints } = user;

    // Allow student to select which sprint to view if they have multiple
    const [selectedSprintId, setSelectedSprintId] = useState(
        studentSprints && studentSprints.length > 0 ? String(studentSprints[0].id) : null
    );

    const selectedSprint = studentSprints?.find(s => String(s.id) === selectedSprintId);

    const [liveClasses, setLiveClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLiveClasses = async () => {
        if (!selectedSprint) {
            setLiveClasses([]);
            return;
        }
        setLoading(true);
        try {
            const res = await apiClient(
                `/live_classes?course_code=${encodeURIComponent(selectedSprint.course_code)}`
            );
            if (res.ok) {
                const data = await res.json();
                setLiveClasses(data.live_classes || []);
            }
        } catch (err) {
            console.error("Failed to fetch live classes for student", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveClasses();
    }, [selectedSprintId]);

    const handleJoinClass = async (cls) => {
        // Complete/attend the live class log
        try {
            await apiClient('/complete_live_class', {
                method: 'POST',
                body: JSON.stringify({
                    topic: cls.topic,
                    course: cls.course,
                    level: cls.level,
                    week: cls.week,
                    date: cls.date
                })
            });
        } catch (e) {
            console.error("Failed to mark class as attended", e);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto p-4 md:p-8"
        >
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-InterBold text-slate-900 flex items-center gap-3">
                        <Video className="w-8 h-8 text-blue-600" /> Virtual Live Classes
                    </h1>
                    <p className="text-slate-500 font-Inter text-sm mt-1">Join scheduled virtual classes and review recorded past sessions.</p>
                </div>

                {/* Sprint Selector */}
                {studentSprints && studentSprints.length > 1 && (
                    <div className="relative min-w-[200px] self-start sm:self-auto">
                        <select
                            value={selectedSprintId || ''}
                            onChange={(e) => setSelectedSprintId(e.target.value)}
                            className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-xs"
                        >
                            {studentSprints.map(s => (
                                <option key={s.id} value={String(s.id)}>
                                    {s.name || s.course_code || `Sprint ${s.id}`}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                )}
            </div>

            {/* No active sprints */}
            {(!studentSprints || studentSprints.length === 0) ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                    <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No active course enrollments found.</p>
                    <p className="text-sm text-slate-400">Please check with support or your tutor to set up your sprint schedule.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">
                        Virtual Live Classes Schedule for <span className="text-blue-600 font-semibold">{selectedSprint?.course_code}</span>
                    </h2>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
                            <p className="text-sm text-slate-400">Fetching scheduled classes...</p>
                        </div>
                    ) : liveClasses.length === 0 ? (
                        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">No live classes scheduled for this cohort yet.</p>
                            <p className="text-sm text-slate-400">Your tutor will update links once a live class is scheduled.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {liveClasses.map((cls) => {
                                const classStart = new Date(`${cls.date}T${cls.time}`);
                                const isValidDate = !isNaN(classStart.getTime());
                                const classEnd = isValidDate ? new Date(classStart.getTime() + (cls.duration || 60) * 60 * 1000) : null;
                                const isPassed = isValidDate && classEnd ? new Date() > classEnd : false;

                                return (
                                    <div 
                                        key={cls.id} 
                                        className="border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-xs transition-shadow"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                                                <span className="text-blue-600 font-bold text-xs uppercase">{String(cls.week || '').substring(0,2)}</span>
                                                <span className="text-blue-800 font-black text-lg">{String(cls.week || '').split(' ')[1] || '0'}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 leading-tight">{cls.topic}</h3>
                                                <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(cls.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {cls.time} ({cls.duration} min)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                                            {cls.recording_link && (
                                                <a 
                                                    href={cls.recording_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                                                >
                                                    Watch Recording
                                                </a>
                                            )}
                                            {!isPassed ? (
                                                <a 
                                                    href={cls.meeting_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => handleJoinClass(cls)}
                                                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                                                >
                                                    Join Class <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            ) : (
                                                !cls.recording_link && (
                                                    <span className="text-xs text-slate-400 bg-slate-50 px-3 py-2 rounded-xl font-semibold border border-slate-100">
                                                        Ended
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}

export default StudentLiveClasses;
