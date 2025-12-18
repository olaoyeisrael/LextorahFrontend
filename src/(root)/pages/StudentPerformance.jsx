import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentPerformance = () => {
    const { token } = useSelector((state) => state.user);
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);

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
                                <th className="px-6 py-4">Topic</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="6" className="p-8 text-center">Loading data...</td></tr>
                            ) : performanceData.length === 0 ? (
                                <tr><td colSpan="6" className="p-8 text-center">No assessment records found.</td></tr>
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
                                        <td className="px-6 py-4">{item.course}</td>
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
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentPerformance;
