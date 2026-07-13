import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageSquare, Calendar, ChevronRight, RefreshCw, Download, CheckCircle, Award, Video, Clock, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../../utils/api';
import { useHistoryQuery, useTranscriptsQuery } from '../../utils/queries';

const History = () => {
  const { user_id } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('activities'); // 'activities' or 'transcripts'

  const { data: history = [], isLoading: historyLoading, refetch: refetchHistory } = useHistoryQuery(user_id);
  const { data: transcripts = [], isLoading: transcriptsLoading, refetch: refetchTranscripts } = useTranscriptsQuery();
  
  const loading = historyLoading || transcriptsLoading;

  const fetchHistoryAndTranscripts = () => {
    refetchHistory();
    refetchTranscripts();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
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
    switch (type) {
      case 'course_completion': return <Award className="w-6 h-6 text-yellow-500" />;
      case 'topic_completion': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'live_class': return <Video className="w-6 h-6 text-red-500" />;
      default: return <MessageSquare className="w-6 h-6 text-slate-400" />;
    }
  };

  const getTitle = (item) => {
    switch (item.type) {
      case 'course_completion': return `Course Completed: ${item.course_code || `${item.course} ${item.level}`}`;
      case 'topic_completion': return `Topic Completed: ${Array.isArray(item.topic) ? item.topic.join(', ') : item.topic}`;
      case 'live_class': return `Live Class Attended: ${Array.isArray(item.topic) ? item.topic.join(', ') : item.topic}`;
      default: return 'Activity';
    }
  };

  const handleDownloadTranscript = async (id, filename) => {
    try {
      const res = await apiClient(`/download_transcript/${id}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'transcript.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Unable to download transcript at this time.");
      }
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const getTopicString = (t) => Array.isArray(t) ? t.join(', ') : t || "Lesson Topic";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-Mada">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Activities & History</h1>
          <p className="text-slate-500">Track your learning milestones and saved study transcripts.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button 
            onClick={fetchHistoryAndTranscripts} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600" 
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tabs Layout Switcher */}
      <div className="flex border-b border-slate-200 mb-6 gap-6">
        <button
          onClick={() => setActiveTab('activities')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'activities' 
              ? 'border-green-600 text-green-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Activities Log
        </button>
        <button
          onClick={() => setActiveTab('transcripts')}
          className={`pb-3 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'transcripts' 
              ? 'border-green-600 text-green-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Saved Transcripts & Notes
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : activeTab === 'activities' ? (
          history.length === 0 ? (
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
                  className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    item.type === 'course_completion' ? 'bg-yellow-50' :
                    item.type === 'live_class' ? 'bg-red-50' : 'bg-green-50'
                  }`}>
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-base md:text-lg truncate">{getTitle(item)}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1 flex-wrap">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(item.date)}</span>
                      {(item.course_code || item.course) && (
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0">
                          {item.course_code || item.course}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.type === 'topic_completion' && (
                    <div className="text-right hidden sm:block shrink-0">
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">Completed</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )
        ) : (
          /* Transcripts Tab View */
          transcripts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No transcripts available.</p>
              <p className="text-sm text-slate-400">Transcripts will appear here after you finish your interactive lesson sessions.</p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transcripts.map((t, idx) => (
                  <motion.div
                    key={t.id || idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="mb-4">
                      <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-800 text-lg mb-1 leading-snug line-clamp-2">
                        {getTopicString(t.topic)}
                      </h3>
                      <p className="text-xs text-slate-400">{formatDate(t.date)}</p>
                    </div>

                    <button
                      onClick={() => handleDownloadTranscript(t.id, `${getTopicString(t.topic)}.pdf`)}
                      className="w-full py-2.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download PDF Transcript
                    </button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )
        )}
      </div>
    </div>
  );
};

export default History;
