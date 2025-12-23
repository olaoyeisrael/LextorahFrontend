import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FileText, Download, BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Course = () => {
    const { token } = useSelector((state) => state.user);
    const [progress, setProgress] = useState(null);
    const [transcripts, setTranscripts] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!token) return;
            try {
                // Fetch Progress
                // const progRes = await fetch('http://localhost:8000/progress', {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
                // if (progRes.ok) {
                //     const data = await progRes.json();
                //     setProgress(data);
                // }

                // Fetch Transcripts
                const transRes = await fetch(`http://localhost:8000/transcripts`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (transRes.ok) {
                    const data = await transRes.json();
                    console.log("Transcripts: ",data.transcripts);
                    setTranscripts(data.transcripts || []);
                }
                
                // Fetch Structure
                const structRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/course_structure`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (structRes.ok) {
                    const data = await structRes.json();
                    setTopics(data.structure || []);
                    console.log(data.structure);
                }

            } catch (err) {
                console.error("Error fetching course data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [token]);

    const handleDownload = async (id, filename) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/download_transcript/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        } catch (err) {
            console.error("Download failed", err);
        }
    };
    
    // Filter transcripts for selected topic
    // Matches if transcript topic contains the module topic string (simple match)
    const filteredTranscripts = selectedTopic 
        ? transcripts.filter(t => t.topic && t.topic.toLowerCase().includes(selectedTopic.topic.toLowerCase()))
        : [];
    console.log("Filtered Transcripts: ", filteredTranscripts);

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Loading course details...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">My Courses</h1>
                <p className="text-slate-600">Track your progress and review course materials.</p>
            </header>

            {/* Overall Progress */}
            {/* {progress && progress.course !== "None" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">{progress.course} Progress</h2>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                             <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${progress.progress}%` }}
                                 className="bg-green-500 h-2.5 rounded-full" 
                             />
                        </div>
                        <p className="text-sm text-slate-500 text-right">{progress.progress}% Complete</p>
                    </div>
                </div>
            )} */}

            {/* Modules Grid */}
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                Curriculum Modules
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {topics.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setSelectedTopic(item)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            selectedTopic?.topic === item.topic 
                            ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100' 
                            : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-md'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded-md">
                                {item.week || `Module ${idx + 1}`}
                            </span>
                            <div className="flex gap-2">
                                {item.is_completed && (
                                     <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs font-bold border border-green-200">Done</span>
                                )}
                                {item.has_material ? (
                                    <CheckCircle className={`w-4 h-4 ${item.is_completed ? 'text-green-500' : 'text-slate-400'}`} />
                                ) : (
                                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                                )}
                            </div>
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{item.topic}</h3>
                        <p className="text-sm text-slate-500">
                             Click to view progress & transcripts
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Topic Detail Modal/Section */}
            {selectedTopic && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 fixed inset-x-4 bottom-4 md:static md:mb-8 z-50 md:z-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                             <h2 className="text-xl font-bold text-slate-900">{selectedTopic.topic}</h2>
                             <p className="text-slate-500 text-sm">Transcripts & Resources</p>
                        </div>
                        <button onClick={() => setSelectedTopic(null)} className="md:hidden p-2 bg-slate-100 rounded-full">
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Transcripts
                        </h3>
                        {filteredTranscripts.length > 0 ? (
                            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl">
                                {filteredTranscripts.map((t, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50">
                                        <div>
                                            <p className="font-medium text-slate-900 text-sm">Lesson Transcript</p>
                                            <p className="text-xs text-slate-500">{new Date(t.date).toLocaleDateString()}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleDownload(t.id, `${t.topic}.pdf`)}
                                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                                        >
                                            <Download className="w-3 h-3" /> PDF
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-center bg-slate-50 rounded-xl text-slate-500 text-sm">
                                No transcripts found for this topic.
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

        </div>
    );
};

export default Course;