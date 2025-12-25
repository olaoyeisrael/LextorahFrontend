import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageSquare, Calendar, ChevronRight, RefreshCw, Trash2, CheckCircle, Award, Video, Clock } from 'lucide-react';
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
      console.log("History Data:", data);
      setHistory(data.History || []);
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_id) fetchHistory();
  }, [user_id]);

  const formatDate = (dateString) => {
      if(!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
  };

  const getIcon = (type) => {
      switch(type) {
          case 'course_completion': return <Award className="w-6 h-6 text-yellow-500" />;
          case 'topic_completion': return <CheckCircle className="w-6 h-6 text-green-500" />;
          case 'live_class': return <Video className="w-6 h-6 text-red-500" />;
          default: return <MessageSquare className="w-6 h-6 text-slate-400" />;
      }
  };

  const getTitle = (item) => {
      switch(item.type) {
          case 'course_completion': return `Course Completed: ${item.course} ${item.level}`;
          case 'topic_completion': return `Topic Completed: ${item.topic}`;
          case 'live_class': return `Live Class Attended: ${item.topic}`;
          default: return 'Activity';
      }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 mb-2">Activities & History</h1>
           <p className="text-slate-500">Track your learning milestones and attended classes.</p>
        </div>
        <div className="flex gap-2">
            <button onClick={fetchHistory} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" title="Refresh">
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
             <div className="text-center py-20 text-slate-400">Loading history...</div>
        ) : history.length === 0 ? (
             <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                 <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                 <p className="text-slate-500 font-medium">No activity recorded yet.</p>
                 <p className="text-sm text-slate-400">Complete topics or attend live classes to see them here.</p>
             </div>
        ) : (
             <AnimatePresence>
             {history.map((item, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
               >
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                     item.type === 'course_completion' ? 'bg-yellow-50' : 
                     item.type === 'live_class' ? 'bg-red-50' : 'bg-green-50'
                 }`}>
                     {getIcon(item.type)}
                 </div>
                 
                 <div className="flex-1">
                     <h3 className="font-bold text-slate-900 text-lg">{getTitle(item)}</h3>
                     <div className="flex items-center gap-2 text-sm text-slate-500">
                         <Calendar className="w-3 h-3" />
                         {formatDate(item.date)}
                         {item.course && <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded textxs font-bold uppercase">{item.course} {item.level}</span>}
                     </div>
                 </div>

                 {item.type === 'topic_completion' && (
                     <div className="text-right hidden sm:block">
                         <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Completed</span>
                     </div>
                 )}
               </motion.div>
             ))}
             </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default History;
