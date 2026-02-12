import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Clock, Link, Save, Video, Edit2, Check, X, Trash2 } from 'lucide-react';
import { COURSE_GROUPS, getLevelsForCourse } from '../../utils/courseData';

import { apiClient } from '../../utils/api';

const LiveClasses = () => {
    const { token } = useSelector((state) => state.user);
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form State
    const [formData, setFormData] = useState({
        course: 'German',
        level: 'A1',
        week: 'Week 1',
        topic: '',
        date: '',
        time: '',
        duration: 60,
        meeting_link: ''
    });

    const [editingId, setEditingId] = useState(null);
    const [editLink, setEditLink] = useState('');

    const fetchClasses = async () => {
        try {
            const res = await apiClient(`/live_classes?course=${formData.course.toLowerCase()}&level=${formData.level.toLowerCase()}`);
            const data = await res.json();
            setSchedule(data.live_classes || []);
        } catch (err) {
            console.error("Failed to fetch classes", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [formData.course, formData.level]); // Refresh when filter changes

    const handleInputChange = (e) => {
        if (e.target.name === 'course') {
            const levels = getLevelsForCourse(e.target.value);
            setFormData({ ...formData, course: e.target.value, level: levels[0] || '' });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = {
                ...formData,
                course: formData.course.toLowerCase(),
                level: formData.level.toLowerCase()
            };

            const res = await apiClient('/live_class', {
                method: 'POST',
                body: JSON.stringify(submitData)
            });
            
            if (res.ok) {
                alert("Class scheduled successfully!");
                fetchClasses();
                // Reset some fields
                setFormData({ ...formData, topic: '', date: '', time: '', meeting_link: '' });
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
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleJoinClass = async (cls) => {
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
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-3 mb-8">
           <Video className="w-8 h-8 text-red-500" />
           <h1 className="text-3xl font-bold text-slate-900">Live Class Administration</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PANEL: SCHEDULE FORM */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-fit">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="text-xl">+</span> Schedule New Class
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Course</label>
                          <select name="course" value={formData.course} onChange={handleInputChange} className="w-full p-2 rounded-lg border border-slate-200 text-sm">
                              {COURSE_GROUPS.map((group, idx) => (
                                  <optgroup key={idx} label={group.groupName}>
                                      {group.courses.map(course => (
                                          <option key={course} value={course}>{course}</option>
                                      ))}
                                  </optgroup>
                              ))}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Level</label>
                          <select name="level" value={formData.level} onChange={handleInputChange} className="w-full p-2 rounded-lg border border-slate-200 text-sm">
                              {getLevelsForCourse(formData.course).map(level => (
                                  <option key={level} value={level}>{level}</option>
                              ))}
                          </select>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Week</label>
                          <select name="week" value={formData.week} onChange={handleInputChange} className="w-full p-2 rounded-lg border border-slate-200 text-sm">
                              <option>Week 1</option>
                              <option>Week 2</option>
                              <option>Week 3</option>
                              <option>Week 4</option>
                              <option>Week 6</option>
                              <option>Week 8</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Duration (Min)</label>
                          <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full p-2 rounded-lg border border-slate-200 text-sm" />
                      </div>
                  </div>

                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Topic</label>
                      <input type="text" name="topic" value={formData.topic} onChange={handleInputChange} placeholder="e.g. Introduction to Verbs" className="w-full p-2 rounded-lg border border-slate-200 text-sm" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                          <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-2 rounded-lg border border-slate-200 text-sm" required />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time</label>
                          <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full p-2 rounded-lg border border-slate-200 text-sm" required />
                      </div>
                  </div>

                  <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Meeting Link</label>
                      <input type="url" name="meeting_link" value={formData.meeting_link} onChange={handleInputChange} placeholder="https://zoom.us/..." className="w-full p-2 rounded-lg border border-slate-200 text-sm" required />
                  </div>

                  <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" /> Save Class
                  </button>
              </form>
          </div>

          {/* RIGHT PANEL: SCHEDULE LIST */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Structured Schedule</h2>
              
              <div className="space-y-4">
                  {loading ? (
                      <div className="text-center py-10 text-slate-400">Loading schedule...</div>
                  ) : schedule.length === 0 ? (
                      <div className="text-center py-10 text-slate-400 border border-dashed border-slate-100 rounded-xl">
                          No classes scheduled for {formData.course} {formData.level} yet.
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
                            className={`bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md transition-all flex items-start gap-4 cursor-pointer ${editingId === cls.id ? 'ring-2 ring-indigo-500' : ''}`}
                          >
                              <div className="w-14 h-14 bg-purple-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                                   <span className="text-purple-600 font-bold text-xs uppercase">{String(cls.week || '').substring(0,2)}</span>
                                   <span className="text-purple-800 font-black text-lg">{String(cls.week || '').split(' ')[1]}</span>
                              </div>
                              
                              <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-bold text-slate-900">{cls.topic}</h3>
                                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">{cls.course} {cls.level}</span>
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
                                              <span className="text-slate-400 text-[10px]">(Click row to edit)</span>
                                          </div>
                                      )}
                                      
                                      <div className='flex items-center gap-2 ml-auto'>
                                           <a 
                                                href={cls.meeting_link} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                onClick={() => handleJoinClass(cls)}
                                                className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded hover:bg-red-100 transition-colors"
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
    </div>
  );
};

export default LiveClasses;
