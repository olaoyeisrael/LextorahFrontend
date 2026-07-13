import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../utils/api'
import { Loader2, ChevronDown, ChevronUp, X, CheckCircle2, XCircle, Calendar, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function Results() {
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedResult, setSelectedResult] = useState(null);

    const { data: results = [], isLoading, error } = useQuery({
        queryKey: ['myResults'],
        queryFn: async () => {
            const res = await apiClient('/my_results');
            if (res.ok) {
                const data = await res.json();
                return data.results || [];
            }
            return [];
        }
    });

    const getBadgeStyling = (type) => {
        switch(type) {
            case 'mock': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'practice': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'lesson_quiz': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'sprint_test': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const formatType = (type) => {
        if (!type) return "Assessment";
        return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    const hasMore = results.length > visibleCount;

    return (
        <div className='mt-6 mb-10 font-Mada'>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[#0F172A] font-JakartaSemiBold text-xl mb-6">Past Assessment Results</p>
                
                {isLoading ? (
                    <div className="flex items-center justify-center py-8 text-slate-400">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading results...
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">Failed to load results.</div>
                ) : results.length > 0 ? (
                    <div className="space-y-3">
                        {results.slice(0, visibleCount).map((result, index) => (
                            <div 
                                key={index} 
                                onClick={() => setSelectedResult(result)}
                                className="flex justify-between items-center p-4 border border-slate-150 rounded-xl bg-slate-50 hover:bg-white hover:border-green-300 hover:shadow-md transition-all cursor-pointer group animate-in fade-in duration-200"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <p className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                                            {result.topic}
                                        </p>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${getBadgeStyling(result.type)}`}>
                                            {formatType(result.type)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 flex-wrap">
                                        <span>Course: <span className="text-slate-700 font-bold">{result.course_code || result.course_title}</span></span>
                                        <span>•</span>
                                        <span>{new Date(result.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xl font-black text-slate-900 leading-none mb-1">
                                        {result.score} <span className="text-sm text-slate-400 font-bold">/ {result.total}</span>
                                    </div>
                                    <div className={`text-xs font-bold ${((result.score / result.total) >= 0.7) ? 'text-green-600' : 'text-red-500'}`}>
                                        {result.total > 0 ? Math.round((result.score / result.total) * 100) : 0}%
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Pagination Buttons */}
                        {results.length > 6 && (
                            <div className="pt-4 flex justify-center gap-4 border-t border-slate-100 mt-4">
                                {hasMore && (
                                    <button 
                                        onClick={() => setVisibleCount(prev => prev + 6)}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm font-bold text-green-700 hover:bg-green-100 transition-colors"
                                    >
                                        View More <ChevronDown className="w-4 h-4" />
                                    </button>
                                )}
                                {visibleCount > 6 && (
                                    <button 
                                        onClick={() => setVisibleCount(6)}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                    >
                                        Show Less <ChevronUp className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                        <p className="text-slate-500 font-medium">No past assessments found.</p>
                        <p className="text-slate-400 text-sm mt-1">Take a test or practice exam to see your scores here.</p>
                    </div>
                )}
            </div>

            {/* Assessment Review Modal */}
            <AnimatePresence>
                {selectedResult && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.95 }}
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 bg-[#F8FAFC] flex justify-between items-start gap-4">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                                        <h3 className="text-xl font-bold text-slate-900 truncate">
                                            {selectedResult.topic}
                                        </h3>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${getBadgeStyling(selectedResult.type)}`}>
                                            {formatType(selectedResult.type)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold flex-wrap">
                                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {selectedResult.course_code || selectedResult.course_title}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(selectedResult.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedResult(null)}
                                    className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-colors shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Score Stats Banner */}
                            <div className="px-6 py-4 bg-green-50 border-b border-green-100 flex items-center justify-between shrink-0">
                                <div className="text-sm font-bold text-green-800">Reviewing Score:</div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-slate-900">{selectedResult.score}</span>
                                    <span className="text-slate-400 font-bold"> / {selectedResult.total}</span>
                                    <span className="ml-2 font-bold text-sm bg-white text-green-700 border border-green-200 px-2 py-0.5 rounded-md">
                                        {selectedResult.total > 0 ? Math.round((selectedResult.score / selectedResult.total) * 100) : 0}%
                                    </span>
                                </div>
                            </div>

                            {/* Questions Detail Box */}
                            <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-[#FAFBFD]">
                                {selectedResult.details && selectedResult.details.length > 0 ? (
                                    selectedResult.details.map((item, index) => (
                                        <div key={index} className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm">
                                            <div className="flex gap-3 mb-3 items-start">
                                                <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                                                    {index + 1}
                                                </span>
                                                <h4 className="font-bold text-slate-800 text-base mt-0.5 leading-snug">
                                                    {item.question}
                                                </h4>
                                            </div>

                                            <div className="space-y-2 pl-9">
                                                {/* Student Answer */}
                                                <div className={`p-3 rounded-xl border text-sm flex justify-between items-center ${
                                                    item.is_correct 
                                                        ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800' 
                                                        : 'bg-red-50/50 border-red-100 text-red-800'
                                                }`}>
                                                    <div>
                                                        <span className="font-semibold block text-[10px] uppercase tracking-wider opacity-60">Your Answer</span>
                                                        <span className="font-bold">{item.user_answer || "No response"}</span>
                                                    </div>
                                                    {item.is_correct ? (
                                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                                    ) : (
                                                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                                                    )}
                                                </div>

                                                {/* Correct Answer (if student was incorrect) */}
                                                {!item.is_correct && (
                                                    <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-sm">
                                                        <span className="font-semibold block text-[10px] uppercase tracking-wider opacity-60">Correct Answer</span>
                                                        <span className="font-bold">{item.correct_answer}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
                                        No question-by-question breakdown details available for this result.
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Results