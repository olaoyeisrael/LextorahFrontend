import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiClient } from './utils/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Lock, BookOpen, ChevronLeft, Bot, Sparkles, MoveRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Classroom = ({ userId: propUserId, topic: propTopic }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, studentSprints } = useSelector((state) => state.user);
  
  const activeSprintId = studentSprints && studentSprints.length > 0 ? studentSprints[0].id : null;

  // Retrieve Sprint Curriculum dynamically via Tanstack
  const { data: topics = [], isLoading: loadingTopics } = useQuery({
      queryKey: ['classroomTopics', activeSprintId],
      queryFn: async () => {
          if (!activeSprintId) return [];
          const response = await apiClient(`/curriculum/sprint/${activeSprintId}`);
          if (response.ok) {
              const data = await response.json();
              return data.curriculum || [];
          }
          return [];
      },
      enabled: !!activeSprintId,
  });

  const [resolvedTopic, setResolvedTopic] = useState((propTopic !== "null" && propTopic) || (searchParams.get('topic') !== "null" && searchParams.get('topic')) || "");
  const [resolvedUserId, setResolvedUserId] = useState((propUserId !== "null" && propUserId) || (searchParams.get('userId') !== "null" && searchParams.get('userId')) || localStorage.getItem('user_id') || "");

  const [explanation, setExplanation] = useState("");
  const [isTeaching, setIsTeaching] = useState(false);
  const [mode, setMode] = useState("LEARNING"); // LEARNING or QUIZ
  const [quizData, setQuizData] = useState(null);
  const [currentSection, setCurrentSection] = useState(1);
  const scrollRef = useRef(null);

  const today = new Date();

  // Auto-select first available topic if none selected
  useEffect(() => {
    if (!resolvedTopic && topics.length > 0) {
        // Find the first topic that is unlocked
        const availableTopicObj = topics.find(t => {
            let sessionDateTime = new Date(t.session_date);
            if (t.start_time) {
                sessionDateTime = new Date(`${t.session_date}T${t.start_time}`);
            }
            return today >= sessionDateTime;
        });

        // If no topics are unlocked yet, fallback to the very first future one
        const fallbackObj = availableTopicObj || topics[0];
        const topicStr = Array.isArray(fallbackObj.topic) ? fallbackObj.topic.join(', ') : fallbackObj.topic;
        setResolvedTopic(topicStr);
    }
  }, [topics, resolvedTopic]);

  // Auto-scroll explanation box as text streams in
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [explanation]);

  const fetchNextSection = () => {
    setExplanation(""); 
    setIsTeaching(true);

    // Using EventSource for Server-Sent Events (SSE) with LangGraph Backend
    const url = `http://localhost:8000/classroom/next/${resolvedUserId}?topic=${encodeURIComponent(resolvedTopic)}&sprint_id=${activeSprintId}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      if (event.data.includes('"type": "quiz"')) {
        const parsed = JSON.parse(event.data);
        setQuizData(parsed.data);
        setMode("QUIZ");
        eventSource.close();
        setIsTeaching(false);
      } 
      else if (event.data === "[DONE]") {
        eventSource.close();
        setIsTeaching(false);
        setCurrentSection(prev => prev + 1);
      } 
      else {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.text) {
             setExplanation((prev) => prev + parsed.text);
          }
        } catch (e) {
          // Fallback if backend still sends plain text temporarily
          setExplanation((prev) => prev + event.data);
        }
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE Connection failed:", err);
      eventSource.close();
      setIsTeaching(false);
    };
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar - Topic Selection & Progress Tracking */}
      <div className="w-80 bg-white border-r border-slate-200 p-6 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <Link to="/dashboard" className="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2 mb-8 font-medium text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 text-white">
                <Bot className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">Virtual Tutor</h2>
                <p className="text-xs text-slate-500 font-medium">AI-Powered Learning</p>
            </div>
        </div>

        <div className="mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Sprint Modules</h3>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {loadingTopics ? (
                <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mb-2 text-indigo-500" />
                    <span className="text-sm">Loading curriculum...</span>
                </div>
            ) : topics.length > 0 ? (
                topics.map((t, idx) => {
                    // Lock logic: Unlocked if current date/time is strictly >= session date/time
                    // We combine session_date (YYYY-MM-DD) and start_time (HH:MM) to verify.
                    let sessionDateTime = new Date(t.session_date);
                    if (t.start_time) {
                        sessionDateTime = new Date(`${t.session_date}T${t.start_time}`);
                    }
                    
                    const topicStr = Array.isArray(t.topic) ? t.topic.join(', ') : t.topic;
                    const isLocked = today < sessionDateTime;
                    const isActive = resolvedTopic === topicStr;

                    return (
                        <button
                            key={idx}
                            disabled={isLocked}
                            onClick={() => {
                                setResolvedTopic(topicStr);
                                setExplanation("");
                                setMode("LEARNING");
                                setCurrentSection(1);
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all border ${
                                isActive 
                                ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-500' 
                                : isLocked
                                    ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed'
                                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm cursor-pointer'
                            }`}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                    isActive ? 'bg-indigo-600 text-white' : isLocked ? 'bg-slate-200 text-slate-400' : 'bg-indigo-100 text-indigo-600'
                                }`}>
                                    {isLocked ? <Lock className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                                </div>
                                <div className="truncate">
                                    <p className={`text-sm font-bold truncate ${isActive ? 'text-indigo-900' : isLocked ? 'text-slate-500' : 'text-slate-700'}`}>
                                        {topicStr || "Untitled Session"}
                                    </p>
                                    <p className="text-xs text-slate-400">Week {t.week}</p>
                                </div>
                            </div>
                            {isActive && <div className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                        </button>
                    )
                })
            ) : (
                <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-sm">
                    No modules assigned.
                </div>
            )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/50">
        
        {/* Top bar */}
        <div className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex justify-between items-center z-10 sticky top-0">
             <div>
                 <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                     {mode === "LEARNING" ? "Live Explanations" : "Assessment"}
                 </span>
             </div>
             
             {mode === "LEARNING" && (
                <button 
                  onClick={fetchNextSection}
                  disabled={isTeaching || loadingTopics || !resolvedTopic}
                  className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    isTeaching || loadingTopics || !resolvedTopic
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
                  }`}
                >
                  {isTeaching ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Agent thinking...</>
                  ) : explanation.length > 0 ? (
                      <>Continue Explaining <MoveRight className="w-4 h-4" /></>
                  ) : (
                      <><Sparkles className="w-4 h-4" /> Start Lesson</>
                  )}
                </button>
             )}
        </div>

        {mode === "LEARNING" ? (
          <div className="flex flex-col h-full overflow-hidden p-8">
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">
                        {resolvedTopic || "Select a module to begin"}
                    </h1>
                    <p className="text-slate-500 mt-2">Section {currentSection}</p>
                </div>

                {/* Explanation Stream Box */}
                <div 
                  ref={scrollRef}
                  className="flex-grow bg-white border border-slate-200 shadow-sm rounded-3xl p-8 overflow-y-auto leading-relaxed text-lg relative"
                >
                  {explanation ? (
                    <div className="prose prose-slate max-w-none prose-p:mb-6 prose-headings:text-slate-900 prose-strong:text-indigo-900 marker:text-indigo-500">
                      {explanation.split('\n').map((line, i) => (
                        <p key={i} className={`${line.startsWith('-') ? 'ml-4' : ''}`}>{line}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border border-indigo-100">
                          <BookOpen className="w-8 h-8 text-indigo-300" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-700 mb-2">Ready to learn?</h3>
                      <p className="text-center max-w-sm">Click the <strong>Start Lesson</strong> button in the top right to let the AI tutor begin explaining the material.</p>
                    </div>
                  )}
                </div>
            </div>
          </div>
        ) : (
          /* Quiz Component Interface */
          <div className="flex flex-col h-full max-w-3xl mx-auto w-full animate-in fade-in duration-500 p-8">
            
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-3 text-slate-900">Lesson Assessment</h1>
                <p className="text-slate-500 text-lg">Great job! Let's test what you've learned from the tutor.</p>
            </div>
            
            <div className="space-y-6 flex-grow overflow-y-auto custom-scrollbar pr-4">
              {quizData && quizData.map((q, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-lg font-bold text-slate-900 mb-6 flex gap-3">
                      <span className="text-indigo-400">{idx + 1}.</span> {q.question}
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {q.options.map((opt, i) => (
                      <button 
                        key={i}
                        className="text-left p-4 rounded-xl border-2 border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 hover:text-indigo-900 font-medium transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6">
                <button className="w-full bg-indigo-600 py-4 rounded-2xl font-bold text-white text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                Submit Quiz
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classroom;