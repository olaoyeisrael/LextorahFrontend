import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Clock, Video, Save, Check, X, Trash2, ChevronDown, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../../utils/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

function TutorLiveClasses() {
    const user = useSelector((state) => state.user);
    const { managedSprints } = user;

    // Filter to selected sprint ID
    const [selectedSprintId, setSelectedSprintId] = useState(
        managedSprints && managedSprints.length > 0 ? String(managedSprints[0].id) : null
    );

    const selectedSprint = managedSprints?.find(s => String(s.id) === selectedSprintId);

    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        week: 1,
        topic: '',
        date: '',
        time: '',
        duration: 60,
        meeting_link: ''
    });

    const [editingId, setEditingId] = useState(null);
    const [editLink, setEditLink] = useState('');

    const fetchClasses = async () => {
        if (!selectedSprint) {
            setSchedule([]);
            return;
        }
        setLoading(true);
        try {
            const res = await apiClient(`/live_classes?course_code=${encodeURIComponent(selectedSprint.course_code)}`);
            if (res.ok) {
                const data = await res.json();
                setSchedule(data.live_classes || []);
            }
        } catch (err) {
            console.error("Failed to fetch tutor classes", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [selectedSprintId]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSprint) return;

        const parts = selectedSprint.course_code.split('/');
        const course = parts[0] || 'general';
        const level = parts[1] || 'all';

        try {
            const submitData = {
                ...formData,
                week: `Week ${formData.week}`,
                course: course.toLowerCase(),
                level: level.toLowerCase(),
                course_code: selectedSprint.course_code.toUpperCase(),
                tutor: `${user.firstName} ${user.lastName}`.trim()
            };

            const res = await apiClient('/live_class', {
                method: 'POST',
                body: JSON.stringify(submitData)
            });
            
            if (res.ok) {
                alert("Class scheduled successfully!");
                fetchClasses();
                // Reset form fields
                setFormData({
                    week: 1,
                    topic: '',
                    date: '',
                    time: '',
                    duration: 60,
                    meeting_link: ''
                });
            } else {
                alert("Failed to schedule class");
            }
        } catch (err) {
            console.error(err);
            alert("Error scheduling class");
        }
    };

    const handleUpdateRecording = async (id) => {
        try {
            const res = await apiClient(`/live_class/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ recording_link: editLink })
            });

            if (res.ok) {
                setEditingId(null);
                fetchClasses();
            } else {
                alert("Failed to update recording link");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this class?")) return;
        
        try {
            const res = await apiClient(`/live_class/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchClasses();
            } else {
                alert("Failed to delete class");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto p-4 md:p-8"
        >
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-InterBold text-slate-900 flex items-center gap-3">
                        <Video className="w-8 h-8 text-green-600" /> Live Classes
                    </h1>
                    <p className="text-slate-500 font-Inter text-sm mt-1">Manage scheduled Zoom/Meet live cohorts and recordings.</p>
                </div>
                
                {/* Sprint Selector */}
                {managedSprints && managedSprints.length > 0 && (
                    <div className="relative min-w-[200px]">
                        <select
                            value={selectedSprintId || ''}
                            onChange={(e) => {
                                setSelectedSprintId(e.target.value);
                                setEditingId(null);
                            }}
                            className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer shadow-xs"
                        >
                            {managedSprints.map(s => (
                                <option key={s.id} value={String(s.id)}>
                                    {s.name || s.course_code || `Sprint ${s.id}`}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                )}
            </div>

            {/* Check if tutor has no managed sprints */}
            {(!managedSprints || managedSprints.length === 0) ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 max-w-xl mx-auto">
                    <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No assigned sprints found.</p>
                    <p className="text-sm text-slate-400">Please contact an admin to be assigned as a tutor to a sprint.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT PANEL: SCHEDULE FORM */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-fit">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">
                            + Schedule Class
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Week</label>
                                <input 
                                    type="number" 
                                    name="week" 
                                    value={formData.week} 
                                    onChange={handleInputChange} 
                                    min="1"
                                    className="w-full p-2 rounded-lg border border-slate-200 text-sm" 
                                    required 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Topic</label>
                                <input 
                                    type="text" 
                                    name="topic" 
                                    value={formData.topic} 
                                    onChange={handleInputChange} 
                                    placeholder="e.g. Conversation Practice" 
                                    className="w-full p-2 rounded-lg border border-slate-200 text-sm" 
                                    required 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                                    <input 
                                        type="date" 
                                        name="date" 
                                        value={formData.date} 
                                        onChange={handleInputChange} 
                                        className="w-full p-2 rounded-lg border border-slate-200 text-sm" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time</label>
                                    <input 
                                        type="time" 
                                        name="time" 
                                        value={formData.time} 
                                        onChange={handleInputChange} 
                                        className="w-full p-2 rounded-lg border border-slate-200 text-sm" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Duration (Min)</label>
                                <input 
                                    type="number" 
                                    name="duration" 
                                    value={formData.duration} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 rounded-lg border border-slate-200 text-sm" 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Meeting Link</label>
                                <input 
                                    type="url" 
                                    name="meeting_link" 
                                    value={formData.meeting_link} 
                                    onChange={handleInputChange} 
                                    placeholder="https://zoom.us/j/..." 
                                    className="w-full p-2 rounded-lg border border-slate-200 text-sm" 
                                    required 
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                            >
                                <Save className="w-4 h-4" /> Save Session
                            </button>
                        </form>
                    </div>

                    {/* RIGHT PANEL: SCHEDULE LIST */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">
                            Structured Schedule for <span className="text-green-600 font-semibold">{selectedSprint?.course_code}</span>
                        </h2>
                        
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-10 text-slate-400">Loading schedule...</div>
                            ) : schedule.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-100 rounded-xl">
                                    No live classes scheduled for this cohort yet.
                                </div>
                            ) : (
                                schedule.map((cls) => (
                                    <div 
                                        key={cls.id} 
                                        onClick={() => {
                                            if (editingId !== cls.id) {
                                                setEditingId(cls.id);
                                                setEditLink(cls.recording_link || '');
                                            }
                                        }}
                                        className={`bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md transition-all flex items-start gap-4 cursor-pointer ${editingId === cls.id ? 'ring-2 ring-green-500' : ''}`}
                                    >
                                        <div className="w-14 h-14 bg-purple-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                                             <span className="text-purple-600 font-bold text-xs uppercase">{String(cls.week || '').substring(0,2)}</span>
                                             <span className="text-purple-800 font-black text-lg">{String(cls.week || '').split(' ')[1] || '0'}</span>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-slate-900">{cls.topic}</h3>
                                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">{cls.course_code}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> 
                                                    {new Date(cls.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {cls.time} ({cls.duration} min)
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                                                {editingId === cls.id ? (
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <input 
                                                          type="text" 
                                                          value={editLink} 
                                                          onChange={(e) => setEditLink(e.target.value)}
                                                          placeholder="Paste recording link..."
                                                          className="flex-1 p-1.5 text-xs border border-green-200 rounded focus:outline-none focus:border-green-500"
                                                          autoFocus
                                                        />
                                                        <button onClick={() => handleUpdateRecording(cls.id)} className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                                                            <Check className="w-3 h-3" />
                                                        </button>
                                                        <button onClick={() => setEditingId(null)} className="p-1 bg-slate-100 text-slate-500 rounded hover:bg-slate-200">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-xs">
                                                        {cls.recording_link ? (
                                                            <a 
                                                              href={cls.recording_link} 
                                                              target="_blank" 
                                                              rel="noreferrer"
                                                              className="px-2 py-1 rounded bg-green-50 text-green-600 hover:bg-green-100 hover:underline flex items-center gap-1"
                                                              onClick={(e) => e.stopPropagation()} 
                                                            >
                                                                <Video className="w-3 h-3" /> Recording Available
                                                            </a>
                                                        ) : (
                                                            <span className="px-2 py-1 rounded bg-slate-50 text-slate-400">
                                                                No Recording
                                                            </span>
                                                        )}
                                                        <span className="text-slate-400 text-[10px]">(Click row to add recording)</span>
                                                    </div>
                                                )}
                                                
                                                <div className="flex items-center gap-2 ml-auto">
                                                     <a 
                                                          href={cls.meeting_link} 
                                                          target="_blank" 
                                                          rel="noreferrer" 
                                                          className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded hover:bg-green-100 transition-colors"
                                                      >
                                                          Join Link
                                                      </a>
                                                      <button 
                                                          onClick={(e) => { e.stopPropagation(); handleDelete(cls.id); }}
                                                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                          title="Delete Class"
                                                      >
                                                          <Trash2 className="w-4 h-4" />
                                                      </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </motion.section>
    );
}

export default TutorLiveClasses;