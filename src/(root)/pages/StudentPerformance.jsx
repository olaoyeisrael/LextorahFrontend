import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Search, FileText, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentPerformance = () => {
    const { token } = useSelector((state) => state.user);
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/student_performance`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setPerformanceData(data.performance || []);
                }
            } catch (err) {
                console.error("Failed to fetch performance data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Performance</h1>
            <p className="text-slate-600 mb-8">Overview of student assessments and progress.</p>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Course</th>
                                <th className="px-6 py-4">Level</th>
                                <th className="px-6 py-4">Topic</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="8" className="p-8 text-center">Loading data...</td></tr>
                            ) : performanceData.length === 0 ? (
                                <tr><td colSpan="8" className="p-8 text-center">No assessment records found.</td></tr>
                            ) : (
                                performanceData.map((item, idx) => (
                                    <motion.tr 
                                        key={item.id || idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900">{item.student_name || 'Unknown'}</td>
                                        <td className="px-6 py-4 capitalize">{item.course_title}</td>
                                        <td className="px-6 py-4 capitalize">{item.level || '-'}</td>
                                        <td className="px-6 py-4">{item.topic}</td>
                                        <td className="px-6 py-4 font-bold">
                                            {item.score} / {item.total}
                                        </td>
                                        <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                (item.score / item.total) >= 0.7 
                                                ? 'bg-green-100 text-green-700' 
                                                : (item.score / item.total) >= 0.5 
                                                ? 'bg-orange-100 text-orange-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                                {(item.score / item.total) >= 0.7 ? 'Pass' : 'Needs Work'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => setSelectedResult(item)}
                                                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {selectedResult && (console.log("Selected Result:", selectedResult),
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Assessment Details</h2>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                                            {selectedResult.course_title} • {selectedResult.level}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedResult(null)}
                                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                <div className="text-center py-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <span className="block text-sm text-slate-500 font-medium mb-1">Total Score</span>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-4xl font-black text-slate-900">{selectedResult.score}</span>
                                        <span className="text-xl text-slate-400 font-bold">/ {selectedResult.total}</span>
                                    </div>
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                                        (selectedResult.score / selectedResult.total) >= 0.7 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {((selectedResult.score / selectedResult.total) * 100).toFixed(0)}% • {(selectedResult.score / selectedResult.total) >= 0.7 ? 'Passed' : 'Failed'}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <span className="text-slate-500 font-medium">Student Name</span>
                                        <span className="font-bold text-slate-900">{selectedResult.student_name}</span>
                                    </div>
                                    <div className="flex justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <span className="text-slate-500 font-medium">Topic</span>
                                        <span className="font-bold text-slate-900 text-right">{selectedResult.topic}</span>
                                    </div>
                                    <div className="flex justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <span className="text-slate-500 font-medium">Date Taken</span>
                                        <span className="font-bold text-slate-900">{new Date(selectedResult.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>

                                {selectedResult.details && selectedResult.details.length > 0 ? (
                                    <div className="mt-6">
                                        <h3 className="font-bold text-slate-900 mb-3">Questions & Corrections</h3>
                                        <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
                                            {selectedResult.details.map((detail, idx) => (
                                                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                                                    {/* DEBUG: Show raw data to identify key names */}
                                                    {/* <pre className="text-xs text-slate-400 mb-2 overflow-x-auto">{JSON.stringify(detail, null, 2)}</pre> */}
                                                    
                                                    <p className="font-medium text-slate-800 mb-2">{idx + 1}. {detail.question}</p>
                                                    <div className="grid grid-cols-1 gap-1">
                                                        <div className={`p-2 rounded ${detail.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-700'}`}>
                                                            <span className="font-bold text-xs uppercase block text-opacity-70">Your Answer</span>
                                                            {detail.user_answer}
                                                        </div>
                                                        {!detail.is_correct && (
                                                            <div className="p-2 bg-slate-200 text-slate-700 rounded">
                                                                <span className="font-bold text-xs uppercase block text-opacity-70">Correct Answer</span>
                                                                {detail.correct_answer}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        <p className="text-slate-400 text-sm">No detailed content correction available for this legacy result.</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-6 border-t border-slate-100 bg-slate-50">
                                <button 
                                    onClick={() => setSelectedResult(null)}
                                    className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-all"
                                >
                                    Close Details
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentPerformance;
