import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../utils/api'
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react'

function Results() {
    const [visibleCount, setVisibleCount] = useState(6);

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
        <div className='mt-6 mb-10'>
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
                            <div key={index} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl bg-slate-50 hover:bg-white transition-colors shadow-sm cursor-default group">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{result.topic}</p>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getBadgeStyling(result.type)}`}>
                                            {formatType(result.type)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                        <span>Course: <span className="text-slate-700">{result.course_code || result.course_title}</span></span>
                                        <span>•</span>
                                        <span>{new Date(result.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-black text-slate-900">
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
                            <div className="pt-4 flex justify-center gap-4 border-t border-slate-50 mt-4">
                                {hasMore && (
                                    <button 
                                        onClick={() => setVisibleCount(prev => prev + 6)}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
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
        </div>
    )
}

export default Results