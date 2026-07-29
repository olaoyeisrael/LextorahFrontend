import React, { useState, useEffect } from 'react';
import { FileText, Clock, MessageSquare, RefreshCw, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { apiClient } from '../../utils/api';

const getIcon = (type) => {
  switch (type) {
    case 'assignment':
      return <FileText className="w-5 h-5" />;
    case 'feedback':
      return <MessageSquare className="w-5 h-5" />;
    case 'deadline':
      return <Clock className="w-5 h-5" />;
    default:
      return <RefreshCw className="w-5 h-5" />;
  }
};

const getIconColor = (type) => {
  switch (type) {
    case 'assignment':
      return 'bg-blue-50 text-blue-600';
    case 'feedback':
      return 'bg-teal-50 text-teal-600';
    case 'deadline':
      return 'bg-amber-50 text-amber-600';
    default:
      return 'bg-sky-50 text-sky-600';
  }
};

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const response = await apiClient('/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const res = await apiClient('/api/notifications/read', { method: 'POST' });
      if (res.ok) {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        setUnreadCount(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Notifications</h1>
          <p className="text-slate-500 font-medium mt-1">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notifications.` 
              : "You have no unread notifications."
            }
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm self-start md:self-center"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-500" />
            Mark all as read
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(idx => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl" />
              <div className="flex-1 space-y-2 mt-1">
                <div className="h-4 bg-slate-100 rounded w-1/3" />
                <div className="h-3 bg-slate-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl shadow-sm">
          <RefreshCw className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-spin-slow" />
          <h3 className="text-lg font-bold text-slate-700">All caught up!</h3>
          <p className="text-slate-400 text-sm mt-1">No new notifications available right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {notifications.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white rounded-2xl border transition-all p-6 flex gap-4 ${
                  n.read ? 'border-slate-100 shadow-sm opacity-80' : 'border-emerald-100 shadow-md shadow-emerald-50/50'
                }`}
              >
                
                {/* Left Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${getIconColor(n.type)}`}>
                  {getIcon(n.type)}
                </div>

                {/* Content body */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-slate-800 text-lg leading-tight">{n.title}</h2>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" title="Unread" />
                    )}
                  </div>
                  
                  <p className="text-slate-500 text-sm font-medium mt-1 leading-relaxed">{n.description}</p>
                  
                  {/* Action footer */}
                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <Link
                      to={n.action_url || '/'}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
                    >
                      {n.action_text || 'View'}
                    </Link>
                    
                    {n.sender_tag && (
                      <span className="bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wide">
                        {n.sender_tag}
                      </span>
                    )}

                    <span className="text-xs text-slate-400 font-medium ml-auto">
                      {n.timestamp}
                    </span>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}

export default Notification;