import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Plus, Trash2, ArrowLeft, BookOpen, Layers, User, CheckCircle2, ChevronRight } from 'lucide-react';
import { apiClient } from '../../utils/api';

const CreateSprint = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingTutors, setLoadingTutors] = useState(true);
    
    const [form, setForm] = useState({
        course_code: '',
        name: '',
        start_date: '',
        end_date: '',
        duration_weeks: '',
        tutor_id: '',
        schedules: [
            { day_of_week: 'Monday', start_time: '09:00', end_time: '11:00', mode: 'Online' }
        ]
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch course list
                const courseRes = await apiClient('/api/courses');
                if (courseRes.ok) {
                    const data = await courseRes.json();
                    setCourses(data || []);
                }
            } catch (err) {
                console.error("Failed to load courses list", err);
            } finally {
                setLoadingCourses(false);
            }

            try {
                // Fetch tutors
                const tutorsRes = await apiClient('/api/admin/users?role=tutor');
                if (tutorsRes.ok) {
                    const data = await tutorsRes.json();
                    setTutors(data || []);
                }
            } catch (err) {
                console.error("Failed to load tutors list", err);
            } finally {
                setLoadingTutors(false);
            }
        };

        loadInitialData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Schedule managers
    const handleScheduleChange = (index, field, value) => {
        const updatedSchedules = [...form.schedules];
        updatedSchedules[index][field] = value;
        setForm(prev => ({ ...prev, schedules: updatedSchedules }));
    };

    const addScheduleRow = () => {
        setForm(prev => ({
            ...prev,
            schedules: [
                ...prev.schedules,
                { day_of_week: 'Monday', start_time: '09:00', end_time: '11:00', mode: 'Online' }
            ]
        }));
    };

    const removeScheduleRow = (index) => {
        if (form.schedules.length === 1) return; // Keep at least one schedule
        const updatedSchedules = form.schedules.filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, schedules: updatedSchedules }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!form.course_code || !form.name || !form.start_date || !form.end_date || !form.duration_weeks || !form.tutor_id) {
            setError('Please fill in all core sprint information.');
            return;
        }

        setLoading(true);

        try {
            // Format times as HH:MM:SS for backend
            const formattedSchedules = form.schedules.map(sch => ({
                day_of_week: sch.day_of_week,
                start_time: sch.start_time.length === 5 ? `${sch.start_time}:00` : sch.start_time,
                end_time: sch.end_time.length === 5 ? `${sch.end_time}:00` : sch.end_time,
                mode: sch.mode
            }));

            const payload = {
                course_code: form.course_code,
                name: form.name,
                start_date: form.start_date,
                end_date: form.end_date,
                duration_weeks: parseInt(form.duration_weeks) || 0,
                tutor_id: form.tutor_id,
                schedules: formattedSchedules
            };

            const res = await apiClient('/api/sprints', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const errData = await res.json();
                setError(errData.detail || "Failed to create sprint cohort.");
            }
        } catch (err) {
            console.error("Sprint creation request failed", err);
            setError("Connection to the server failed.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({
            course_code: '',
            name: '',
            start_date: '',
            end_date: '',
            duration_weeks: '',
            tutor_id: '',
            schedules: [
                { day_of_week: 'Monday', start_time: '09:00', end_time: '11:00', mode: 'Online' }
            ]
        });
        setSuccess(false);
    };

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="p-6 md:p-12 max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-3 mb-6">
                <Link to="/admin/courses" className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Managed Courses
                </Link>
            </div>

            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                    <Layers className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">Start Active Sprint</h1>
                    <p className="text-slate-500 text-sm">Configure schedules, dates, and assign a tutor to launch a learning cohort.</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!success ? (
                    <motion.div
                        key="sprint-form"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10"
                    >
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm font-semibold">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Sprint Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <Layers className="w-4 h-4 mr-2 text-slate-400" /> Sprint Cohort Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. German A2 Standard (July Cohort)"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 text-sm"
                                    />
                                </div>

                                {/* Select Course Template */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <BookOpen className="w-4 h-4 mr-2 text-slate-400" /> Course Template *
                                    </label>
                                    <select
                                        name="course_code"
                                        value={form.course_code}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 text-sm"
                                    >
                                        <option value="">-- Select Course --</option>
                                        {loadingCourses ? (
                                            <option disabled>Loading courses...</option>
                                        ) : (
                                            courses.map(code => (
                                                <option key={code} value={code}>{code}</option>
                                            ))
                                        )}
                                    </select>
                                </div>

                                {/* Assign Tutor */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <User className="w-4 h-4 mr-2 text-slate-400" /> Assign Tutor *
                                    </label>
                                    <select
                                        name="tutor_id"
                                        value={form.tutor_id}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 text-sm"
                                    >
                                        <option value="">-- Choose Tutor --</option>
                                        {loadingTutors ? (
                                            <option disabled>Loading tutors...</option>
                                        ) : (
                                            tutors.map(tutor => (
                                                <option key={tutor.id} value={tutor.id}>
                                                    {tutor.first_name} {tutor.last_name} ({tutor.email})
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>

                                {/* Start Date */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-slate-400" /> Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={form.start_date}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 text-sm"
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-slate-400" /> End Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={form.end_date}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 text-sm"
                                    />
                                </div>

                                {/* Duration Weeks */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <Clock className="w-4 h-4 mr-2 text-slate-400" /> Duration (Weeks) *
                                    </label>
                                    <input
                                        type="number"
                                        name="duration_weeks"
                                        value={form.duration_weeks}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        placeholder="e.g. 8"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-700 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Weekly Schedules Section */}
                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Weekly Class Timetable</h3>
                                        <p className="text-xs text-slate-500">Define the weekly repeating class day(s) and times for the sprint.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addScheduleRow}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors border border-indigo-100 cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Class
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {form.schedules.map((schedule, index) => (
                                        <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 items-end">
                                            {/* Select Day */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Weekday</label>
                                                <select
                                                    value={schedule.day_of_week}
                                                    onChange={(e) => handleScheduleChange(index, 'day_of_week', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm outline-none"
                                                >
                                                    {weekdays.map(d => (
                                                        <option key={d} value={d}>{d}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Start Time */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">Start Time</label>
                                                <input
                                                    type="time"
                                                    value={schedule.start_time}
                                                    onChange={(e) => handleScheduleChange(index, 'start_time', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm outline-none"
                                                />
                                            </div>

                                            {/* End Time */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1.5">End Time</label>
                                                <input
                                                    type="time"
                                                    value={schedule.end_time}
                                                    onChange={(e) => handleScheduleChange(index, 'end_time', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm outline-none"
                                                />
                                            </div>

                                            {/* Remove row */}
                                            <div className="flex justify-between items-center sm:justify-end gap-3 h-full pb-1">
                                                <div className="text-slate-400 text-xs italic sm:hidden">Remove scheduled class</div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeScheduleRow(index)}
                                                    disabled={form.schedules.length === 1}
                                                    className="p-2 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex gap-4 pt-6 border-t border-slate-100 justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center min-w-[160px] disabled:bg-indigo-400 cursor-pointer"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'Launch Cohort'
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center"
                    >
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full inline-block mb-6 shadow-inner">
                            <CheckCircle2 className="w-16 h-16" />
                        </div>
                        
                        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Sprint Cohort Created!</h2>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            The new cohort <strong>{form.name}</strong> has been successfully launched for course code <strong>{form.course_code}</strong>.
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={resetForm}
                                className="px-6 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Start Another Cohort
                            </button>
                            <button
                                onClick={() => navigate('/admin/courses')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center gap-1"
                            >
                                Go to Managed Courses <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CreateSprint;
