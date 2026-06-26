import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, BookOpen, UserCheck, GraduationCap, Calendar, Clock, ArrowLeft, AlertCircle, X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { apiClient } from '../../utils/api';

const ManagedCourses = () => {
    const [sprints, setSprints] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedSprintId, setExpandedSprintId] = useState(null);
    
    // Modal states
    const [assigningSprint, setAssigningSprint] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch sprints
            const sprintsRes = await apiClient('/api/sprints');
            let sprintData = [];
            if (sprintsRes.ok) {
                sprintData = await sprintsRes.ok ? await sprintsRes.json() : [];
            }

            // 2. Fetch all students for the dropdown
            const studentsRes = await apiClient('/api/admin/users?role=student');
            let studentData = [];
            if (studentsRes.ok) {
                studentData = await studentsRes.json();
            }

            // 3. Fetch tutors to display their names in the sprints list
            const tutorsRes = await apiClient('/api/admin/users?role=tutor');
            let tutorData = [];
            if (tutorsRes.ok) {
                tutorData = await tutorsRes.json();
            }

            setSprints(sprintData);
            setAllStudents(studentData);
            setTutors(tutorData);
        } catch (err) {
            console.error("Failed to load administration data", err);
            showToast("Failed to connect to the server.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAssignStudent = async () => {
        if (!selectedStudentId || !assigningSprint) return;
        setSubmitLoading(true);
        try {
            const res = await apiClient(`/api/sprints/${assigningSprint.sprint_id}/assign`, {
                method: 'POST',
                body: JSON.stringify({ student_id: selectedStudentId })
            });

            if (res.ok) {
                showToast("Student assigned successfully!", "success");
                setAssigningSprint(null);
                setSelectedStudentId('');
                setSearchQuery('');
                // Refresh data to reflect the changes
                fetchData();
            } else {
                const errData = await res.json();
                showToast(errData.detail || "Failed to assign student.", "error");
            }
        } catch (err) {
            console.error("Failed to execute student assignment", err);
            showToast("An error occurred during enrollment.", "error");
        } finally {
            setSubmitLoading(false);
        }
    };

    const getTutorName = (tutorId) => {
        const t = tutors.find(item => String(item.id) === String(tutorId));
        return t ? `${t.first_name} ${t.last_name}` : `Tutor #${tutorId}`;
    };

    // Filter students inside modal
    const filteredStudents = allStudents.filter(student => {
        const query = searchQuery.toLowerCase().trim();
        const fullName = `${student.first_name || ''} ${student.last_name || ''}`.toLowerCase();
        const email = (student.email || '').toLowerCase();
        return fullName.includes(query) || email.includes(query);
    });

    const totalStudentsEnrolled = sprints.reduce((acc, s) => acc + (s.students?.length || 0), 0);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Link to="/dashboard" className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-colors mb-2 w-fit">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                        <GraduationCap className="w-8 h-8 text-indigo-600" />
                        Managed Courses & Cohorts
                    </h1>
                    <p className="text-slate-500 text-sm">Manage class schedules, view tutor assignments, and enroll students in active sprints.</p>
                </div>
                
                <div className="flex gap-3">
                    <Link 
                        to="/add-course" 
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors border border-slate-200 text-sm"
                    >
                        Create Course Template
                    </Link>
                    <Link 
                        to="/admin/create-sprint" 
                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg transition-all text-sm"
                    >
                        <Plus className="w-4 h-4" /> Start Active Sprint
                    </Link>
                </div>
            </div>

            {/* Toast Alerts */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl border text-sm font-semibold flex items-center gap-2 ${
                            toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                        }`}
                    >
                        <AlertCircle className="w-4 h-4" />
                        <span>{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Active Sprints</p>
                        <p className="text-2xl font-black text-slate-800">{sprints.length}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Enrolled Students</p>
                        <p className="text-2xl font-black text-slate-800">{totalStudentsEnrolled}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Database Students</p>
                        <p className="text-2xl font-black text-slate-800">{allStudents.length}</p>
                    </div>
                </div>
            </div>

            {/* Sprints Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        Active Sprint Cohorts
                    </h2>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-slate-400 font-semibold">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mx-auto mb-3"></div>
                        Loading cohort data...
                    </div>
                ) : sprints.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 italic">
                        No active sprint cohorts found. Create a sprint to get started!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Sprint Info</th>
                                    <th className="px-6 py-4">Course Code</th>
                                    <th className="px-6 py-4">Tutor</th>
                                    <th className="px-6 py-4">Start/End Dates</th>
                                    <th className="px-6 py-4">Students Enrolled</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {sprints.map((sprint) => {
                                    const isExpanded = expandedSprintId === sprint.sprint_id;
                                    
                                    return (
                                        <React.Fragment key={sprint.sprint_id}>
                                            <tr className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800">{sprint.name}</div>
                                                    <div className="text-xs text-slate-400">ID: {sprint.sprint_id} • {sprint.duration_weeks} Weeks</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded border border-indigo-100 font-mono">
                                                        {sprint.course_code}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-slate-700">
                                                    {getTutorName(sprint.tutor_id)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col text-xs space-y-0.5">
                                                        <div className="flex items-center gap-1 text-slate-600">
                                                            <Calendar className="w-3 h-3 text-slate-400" />
                                                            <span>Start: {sprint.start_date ? new Date(sprint.start_date).toLocaleDateString() : 'N/A'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-slate-600">
                                                            <Calendar className="w-3 h-3 text-slate-400" />
                                                            <span>End: {sprint.end_date ? new Date(sprint.end_date).toLocaleDateString() : 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-800">
                                                    <button 
                                                        onClick={() => setExpandedSprintId(isExpanded ? null : sprint.sprint_id)}
                                                        className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer group"
                                                    >
                                                        <span>{sprint.students?.length || 0} Students</span>
                                                        {isExpanded ? (
                                                            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                                                        ) : (
                                                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={() => setAssigningSprint(sprint)}
                                                        className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition-colors"
                                                    >
                                                        <UserCheck className="w-3.5 h-3.5" /> Assign Student
                                                    </button>
                                                </td>
                                            </tr>

                                            {/* Expandable Students Sub-Table */}
                                            {isExpanded && (
                                                <tr>
                                                    <td colSpan="6" className="bg-slate-50/50 p-6">
                                                        <div className="border border-slate-200 rounded-xl bg-white p-4 max-w-3xl mx-auto shadow-inner">
                                                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Enrolled Student Cohort</div>
                                                            {(!sprint.students || sprint.students.length === 0) ? (
                                                                <p className="text-sm text-slate-500 italic py-2">No students currently enrolled in this cohort.</p>
                                                            ) : (
                                                                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                                                                    {sprint.students.map((std, idx) => (
                                                                        <div key={std.id || idx} className="py-2.5 flex items-center justify-between text-sm">
                                                                            <div>
                                                                                <span className="font-bold text-slate-800">{std.name}</span>
                                                                                <span className="text-xs text-slate-400 ml-2">({std.email})</span>
                                                                            </div>
                                                                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">ID: {std.id}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Assign Student Modal */}
            <AnimatePresence>
                {assigningSprint && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setAssigningSprint(null)}
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Assign Student</h2>
                                    <p className="text-xs text-slate-500 font-semibold">{assigningSprint.name} ({assigningSprint.course_code})</p>
                                </div>
                                <button 
                                    onClick={() => setAssigningSprint(null)}
                                    className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-4">
                                <div className="relative">
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search student by name or email..."
                                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-700"
                                    />
                                </div>

                                <div className="border border-slate-200 rounded-xl max-h-56 overflow-y-auto divide-y divide-slate-100">
                                    {filteredStudents.length === 0 ? (
                                        <p className="p-4 text-sm text-slate-400 italic text-center">No matching students found.</p>
                                    ) : (
                                        filteredStudents.map((student) => {
                                            const isSelected = selectedStudentId === student.id;
                                            return (
                                                <div 
                                                    key={student.id} 
                                                    onClick={() => setSelectedStudentId(student.id)}
                                                    className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                                                        isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                                                    }`}
                                                >
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-sm">{student.first_name} {student.last_name}</div>
                                                        <div className="text-xs text-slate-500">{student.email}</div>
                                                    </div>
                                                    {isSelected ? (
                                                        <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                                            <Check className="w-3.5 h-3.5" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-5 h-5 border border-slate-300 rounded-full" />
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-slate-100 flex gap-3 bg-slate-50">
                                <button 
                                    onClick={() => setAssigningSprint(null)}
                                    className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleAssignStudent}
                                    disabled={!selectedStudentId || submitLoading}
                                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5"
                                >
                                    {submitLoading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        "Confirm Assignment"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManagedCourses;
