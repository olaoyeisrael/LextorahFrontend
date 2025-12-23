import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageSquare, Calendar, ChevronRight, RefreshCw, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const History = () => {
  const { user_id, token } = useSelector((state) => state.user);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/history/${user_id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setHistory(data.History || []);
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = async () => {
     if(!confirm("Are you sure you want to clear your chat history?")) return;
     try {
         await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat_history`, {
             method: 'DELETE',
             headers: { 'Authorization': `Bearer ${token}` }
         });
         setHistory([]);
     } catch (err) {
         console.error("Failed to clear history", err);
     }
  };

  useEffect(() => {
    if (user_id) fetchHistory();
  }, [user_id]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 mb-2">My Learning History</h1>
           <p className="text-slate-500">Review your past conversations and questions.</p>
        </div>
        <div className="flex gap-2">
            <button onClick={fetchHistory} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Refresh">
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            {history.length > 0 && (
                <button onClick={clearHistory} className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500" title="Clear History">
                    <Trash2 className="w-5 h-5" />
                </button>
            )}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
             <div className="text-center py-20 text-slate-400">Loading history...</div>
        ) : history.length === 0 ? (
             <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                 <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                 <p className="text-slate-500 font-medium">No history found yet.</p>
                 <p className="text-sm text-slate-400">Start learning to see your progress here!</p>
             </div>
        ) : (
             <AnimatePresence>
             {history.map((chat, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
               >
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-green-600 text-xs">YOU</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-slate-900 mb-4">{chat.user || chat.question}</p>
                        
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative">
                            <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-50 border-t border-l border-slate-100 transform rotate-45"></div>
                             <div className="flex gap-3">
                                 <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-white text-[10px] font-bold">AI</span>
                                 </div>
                                 <p className="text-slate-600 text-sm leading-relaxed">{chat.ai || chat.answer}</p>
                             </div>
                        </div>
                    </div>
                 </div>
               </motion.div>
             ))}
             </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default History;
