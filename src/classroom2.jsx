import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiClient } from './utils/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Classroom = ({ userId: propUserId, topic: propTopic }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  
  const [resolvedTopic, setResolvedTopic] = useState((propTopic !== "null" && propTopic) || (searchParams.get('topic') !== "null" && searchParams.get('topic')) || "");
  const [resolvedUserId, setResolvedUserId] = useState((propUserId !== "null" && propUserId) || (searchParams.get('userId') !== "null" && searchParams.get('userId')) || localStorage.getItem('user_id') || "");
  const [loadingTopic, setLoadingTopic] = useState(!resolvedTopic);

  const [explanation, setExplanation] = useState("");
  const [isTeaching, setIsTeaching] = useState(false);
  const [mode, setMode] = useState("LEARNING"); // LEARNING or QUIZ
  const [quizData, setQuizData] = useState(null);
  const [currentSection, setCurrentSection] = useState(1);
  const scrollRef = useRef(null);

  // Auto-fetch topic if not provided
  useEffect(() => {
    const initLearning = async () => {
        if (resolvedTopic) return;
        if (!token) {
            navigate('/login'); 
            return;
        }

        try {
            const res = await apiClient('/course_structure');
            const data = await res.json();
            const structure = data.structure || [];
            const userData = data.user_data || {};
            const currentIdx = userData.current_topic_index || 0;
            
            const currentTopicObj = structure.find(t => t.index === currentIdx) || structure[0];
            
            if (currentTopicObj) {
                setResolvedTopic(currentTopicObj.topic);
            } else {
                console.error("No active topic found for your course level.");
            }
        } catch (err) {
            console.error("Init Error", err);
        } finally {
            setLoadingTopic(false);
        }
    };

    initLearning();
  }, [token, resolvedTopic, navigate]);

  // Auto-scroll explanation box as text streams in
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [explanation]);

  const fetchNextSection = () => {
    setExplanation(""); 
    setIsTeaching(true);

    // Using EventSource for Server-Sent Events (SSE)
    const url = `http://localhost:8000/classroom/next/${resolvedUserId}?topic=${encodeURIComponent(resolvedTopic)}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      // 1. Check if the lesson is over and a quiz is being sent
      if (event.data.includes('"type": "quiz"')) {
        const parsed = JSON.parse(event.data);
        setQuizData(parsed.data);
        setMode("QUIZ");
        eventSource.close();
        setIsTeaching(false);
      } 
      // 2. Check if the stream for the current chunk is done
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
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Sidebar - Progress Tracking */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <Link to="/dashboard" className="text-blue-400 hover:text-blue-300 transition-colors">← Back to Dashboard</Link>
        <h2 className="text-xl font-bold text-blue-400 mb-8">Lextorah Classroom</h2>
        <div className="space-y-4">
          <div className="p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
            <p className="text-xs uppercase text-blue-300 font-semibold">Current Topic</p>
            <p className="text-sm font-medium">{loadingTopic ? "Loading..." : resolvedTopic}</p>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg">
            <p className="text-xs uppercase text-slate-400 font-semibold">Section</p>
            <p className="text-lg font-bold">{currentSection}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-8 overflow-hidden">
        {mode === "LEARNING" ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Virtual Tutor</h1>
              <button 
                onClick={fetchNextSection}
                disabled={isTeaching || loadingTopic || !resolvedTopic}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  isTeaching || loadingTopic || !resolvedTopic
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                }`}
              >
                {isTeaching ? "Agent is explaining..." : "Next Section"}
              </button>
            </div>

            {/* Explanation Stream Box */}
            <div 
              ref={scrollRef}
              className="flex-grow bg-slate-900/50 border border-slate-800 rounded-2xl p-8 overflow-y-auto leading-relaxed text-lg"
            >
              {explanation ? (
                <div className="prose prose-invert max-w-none">
                  {explanation.split('\n').map((line, i) => (
                    <p key={i} className="mb-4">{line}</p>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  Click "Next Section" to begin your lesson.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Component Interface */
          <div className="flex flex-col h-full max-w-3xl mx-auto w-full animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold mb-2 text-green-400">Lesson Assessment</h1>
            <p className="text-slate-400 mb-8">Great job! Let's test what you've learned from this lesson.</p>
            
            <div className="space-y-6 flex-grow overflow-y-auto">
              {quizData && quizData.map((q, idx) => (
                <div key={idx} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <p className="text-lg font-medium mb-4">{idx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {q.options.map((opt, i) => (
                      <button 
                        key={i}
                        className="text-left p-3 rounded-lg border border-slate-700 hover:bg-slate-800 hover:border-blue-500 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 bg-green-600 p-4 rounded-xl font-bold hover:bg-green-500 transition">
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classroom;