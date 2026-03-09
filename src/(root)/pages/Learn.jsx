import React, { useEffect, useState, useRef } from 'react'

import { apiClient } from '../../utils/api';


import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle, Loader, LoaderCircleIcon, BookOpen, ChevronRight, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const Learn = () => {
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [userAnswers, setUserAnswers] = useState({}); // Stores user answers
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("Loading your customized lesson..."); // New state
    const [data, setData] = useState(null);
    const user_id = localStorage.getItem('user_id');
    const wsRef = useRef(null);
    const fullContentRef = useRef(""); // Accumulate transcript content
    
    
    

    const [sections, setSections] = useState([]);
    const [activeSection, setActiveSection] = useState(1); // Use index as ID now
    const [courseFinished, setCourseFinished] = useState(false);

    
    // Missing States
    const location = useLocation();
    const navigate = useNavigate();
    const { token, enrolledCourse, enrolledLevel } = useSelector((state) => state.user);

    // Destructure course context from LearnSelection
    const { activeSprintId, courseName, courseCode, topicObj } = location.state || {};

    const [currentTopic, setCurrentTopic] = useState(topicObj ? topicObj.topic : null);
    const [currentTopicIndex, setCurrentTopicIndex] = useState(topicObj ? topicObj.session_number : 1);
    const [progress, setProgress] = useState(0); 
    const isAutoMode = false; 
    const [topicIsCompleted, setTopicIsCompleted] = useState(false);
    
    const [learningContext, setLearningContext] = useState({
        topic: Array.isArray(currentTopic) ? currentTopic.join(', ') : currentTopic,
        course: enrolledCourse || courseName || "Sprint Course",
        level: enrolledLevel || "A1",
        topic_index: currentTopicIndex
    });

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        // If accessed directly without selecting a course, redirect to Selection
        if (!activeSprintId || !topicObj) {
             navigate('/learn');
             return;
        }
    }, [token, navigate, activeSprintId, topicObj]);

  // Start Stream function (called initially and on 'Contine')
  const startStream = (targetSection = null, customLoadingMessage = "Lextorah AI is explaining...") => {
    if (!currentTopic || !user_id) return;
    
    setLoading(true);
    setData(""); // Clear current explanation
    setLoadingMessage(customLoadingMessage);
    
    // Close existing connection if any
    if (wsRef.current) {
        wsRef.current.close();
    }

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    let url = `${BASE_URL}/classroom/next/${user_id}?topic=${encodeURIComponent(currentTopic)}&sprint_id=${activeSprintId}`;
    if (targetSection !== null) {
        url += `&section=${targetSection}`;
    }
    const eventSource = new EventSource(url);
    wsRef.current = eventSource;
    
    let currentExplanation = "";

    eventSource.onmessage = (event) => {
        try {
            // Check if the stream for the current chunk is done
            if (event.data === "[DONE]") {
                eventSource.close();
                wsRef.current = null;
                setLoading(false);
                return;
            }

            const parsed = JSON.parse(event.data);
            
            if (parsed.type === 'quiz') {
                const q = typeof parsed.data === 'string' ? JSON.parse(parsed.data) : parsed.data;
                setQuizData(q);
                setLoading(false);
                setData(null); 
                eventSource.close();
                wsRef.current = null;
            } else if (parsed.type === 'syllabus') {
                setSections(parsed.sections);
            } else if (parsed.type === 'info') {
                setActiveSection(parsed.section_index);
                setLoading(false);
            } else if (parsed.type === 'explanation' && parsed.text) {
                 setData((prev) => prev ? prev + parsed.text : parsed.text);
                 currentExplanation += parsed.text;
                 setLoading(false);
                 // We don't append to fullContentRef on every chunk to avoid duplication.
                 // We'll append the full text once it's completely rendered or needed.
            }
            
        } catch (e) {
             // Fallback string append if it wasn't JSON
             setData((prev) => prev ? prev + event.data : event.data);
        }
    };

    eventSource.onerror = (err) => {
        console.error("SSE Connection failed:", err);
        eventSource.close();
        wsRef.current = null;
        setLoading(false);
    };
  };

  useEffect(() => {
    if (!currentTopic) return;
    
    // Do not auto-start if we just finished a topic or if we are in quiz mode
    if (!quizData && !courseFinished) {
         startStream(topicIsCompleted ? 1000 : null, topicIsCompleted ? "Generating quiz..." : "Agent is explaining...");
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [currentTopic, user_id]); // Auto-start the stream when topic resolves

  const handleNext = () => {
     // Check if we are at the very end of sections
     let msg = "Agent is explaining...";
     if (sections.length > 0 && activeSection >= sections.length) {
         msg = "Generating quiz...";
     }
     startStream(null, msg);
  };

  const handleClose = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    navigate('/dashboard');
  };

  const handleAnswerSelect = (option) => {
      setSelectedAnswer(option);
  };

  const handleNextQuestion = async () => {
      const currentQuestion = quizData[currentQuestionIndex];
      const isCorrect = selectedAnswer[0] === currentQuestion.answer;
      
      const newAnswers = { ...userAnswers, [currentQuestionIndex]: selectedAnswer };
      setUserAnswers(newAnswers);

      if (isCorrect) {
          setScore(score + 1);
      }

      if (currentQuestionIndex < quizData.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
      } else {
          setShowResults(true);
          // Mark Completion
          if (learningContext) {
            console.log("Full Content:", fullContentRef.current);
              try {
                  // Save Quiz Result
                  const finalScore = score + (isCorrect ? 1 : 0);

                  await apiClient('/submit_quiz_result', {
                      method: 'POST',

                      body: JSON.stringify({
                          course_title: learningContext.course,
                          level: learningContext.level,
                          topic: learningContext.topic,
                          score: finalScore,
                          total: quizData.length,
                          details: Object.entries(newAnswers).map(([idx, ans]) => ({
                              question: quizData[idx].question,
                              answer: ans,
                              correct: quizData[idx].answer,
                              correct_option: quizData[idx].options.find(o => o.startsWith(quizData[idx].answer))
                          })) 
                      })
                  });

                  // Complete Topic

                  await apiClient('/complete_topic', {
                      method: 'POST',

                      body: JSON.stringify({
                          course: learningContext.course,
                          level: learningContext.level,
                          course_code: courseCode,
                          topic: learningContext.topic,
                          material_content: fullContentRef.current || "No content generated.",
                      })
                  });
              } catch (e) {
                  console.error("Completion error", e);
              }
          }

      }
  };


  const handleSectionClick = (section) => {
      if (activeSection !== section.index) {
          setActiveSection(section.index);
          startStream(section.index);
      }
  };


  return (
    <main className='w-full h-screen bg-slate-50 flex flex-col font-Mada overflow-hidden'>
      
      {/* Top Navigation Header */}
      <div className='h-20 border-b border-slate-200 bg-white px-6 md:px-8 flex items-center justify-between z-10 shrink-0 shadow-sm'>
          <div className='flex items-center gap-4'>
              <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0'>
                  <BookOpen size={24} />
              </div>
              <div>
                  <h1 className='text-xl md:text-2xl font-bold text-slate-800 tracking-tight'>
                      {currentTopic ? (Array.isArray(currentTopic) ? currentTopic.join(', ') : currentTopic) : "Interactive Lesson"}
                  </h1>
                  {courseCode && (
                      <span className='inline-block mt-0.5 px-2.5 py-0.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200 uppercase tracking-wider'>
                          {courseCode}
                      </span>
                  )}
              </div>
          </div>
          
          <button 
              onClick={handleClose} 
              className='p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition-all font-bold group flex items-center gap-2'
          >
              <span className="hidden sm:inline">Exit Lesson</span>
              <X size={20} className="group-hover:rotate-90 transition-transform"/>
          </button>
      </div>

      <div className='flex-1 flex flex-col min-h-0 bg-slate-50 relative'>
          <div className='flex-1 flex flex-col h-full overflow-hidden p-4 md:p-8'>
               <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col min-h-0">
              {courseFinished ? (
                  <div className='bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 text-center m-auto'>
                      <div className='w-24 h-24 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600 border border-green-100'>
                          <Award size={48} />
                      </div>
                      <h2 className='text-3xl font-bold text-slate-900 mb-4'>Lesson Completed! 🎉</h2>
                      <p className='text-slate-600 text-lg mb-8 max-w-md mx-auto'>
                          Congratulations! You have successfully completed all modules for this topic. Let's keep learning!
                      </p>
                      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                          <button 
                              onClick={() => navigate('/dashboard')}
                              className='bg-white text-slate-700 border-2 border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all'
                          >
                              Return to Dashboard
                          </button>
                      </div>
                  </div>
              ) : quizData ? (
                  <div className='w-full h-full overflow-y-auto custom-scrollbar pr-2 pb-4'>
                      {!showResults ? (
                          <div className='bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200'>
                                <div className='mb-8 flex items-center justify-between border-b border-slate-100 pb-4'>
                                  <h2 className='text-2xl font-bold text-slate-900'>Quiz Time!</h2>
                                  <span className='bg-amber-50 text-amber-600 text-xs font-bold px-3 py-1 rounded-full border border-amber-200'>Do not refresh</span>
                              </div>
                              <div className='mb-4 text-green-600 font-bold text-sm tracking-wide uppercase'>Question {currentQuestionIndex + 1} of {quizData.length}</div>
                              
                              <h3 className='text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-snug'>
                                  {quizData[currentQuestionIndex].question}
                              </h3>

                              <div className='space-y-3'>
                                  {quizData[currentQuestionIndex].options?.map((option, idx) => (
                                      <div 
                                         key={idx}
                                         onClick={() => handleAnswerSelect(option)}
                                         className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                             selectedAnswer === option 
                                             ? 'bg-green-50 border-green-500 text-green-900 shadow-md transform scale-[1.01]' 
                                             : 'bg-white border-slate-200 hover:border-green-300 hover:bg-slate-50'
                                         }`}
                                      >
                                          {option}
                                      </div>
                                  ))}
                              </div>

                              <div className='mt-10 flex justify-end pt-6 border-t border-slate-100'>
                                  <button 
                                     onClick={handleNextQuestion}
                                     disabled={!selectedAnswer}
                                     className='bg-green-600 text-white px-10 py-3.5 rounded-xl font-bold disabled:opacity-50 hover:bg-green-700 transition-all shadow-lg shadow-green-200 disabled:shadow-none'
                                  >
                                      {currentQuestionIndex === quizData.length - 1 ? 'Submit Answers' : 'Next Question'}
                                  </button>
                              </div>
                          </div>
                      ) : (
                          <div className='bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 text-center'>
                              <div className='w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600 border border-green-100'>
                                 <LoaderCircleIcon size={40} />
                              </div>
                              <h2 className='text-3xl font-bold text-slate-900 mb-2'>Quiz Completed!</h2>
                              
                              <div className='my-8 p-8 bg-slate-50 rounded-3xl border border-slate-200 w-full max-w-sm mx-auto'>
                                  <div className='text-6xl font-black text-green-600 mb-2 tracking-tight'>
                                      {Math.round((score / quizData.length) * 100)}%
                                  </div>
                                  <p className='text-slate-600 font-medium'>
                                      You scored <span className='text-slate-900 font-bold'>{score}</span> out of {quizData.length}
                                  </p>
                              </div>

                              <div className='flex flex-col gap-6 text-left w-full max-w-2xl mx-auto'>
                                  <div className="bg-white p-6 rounded-2xl border border-slate-200 max-h-[50vh] overflow-y-auto custom-scrollbar shadow-inner">
                                      <h3 className="font-bold text-slate-800 mb-6 sticky top-0 bg-white pb-4 border-b border-slate-100 uppercase tracking-widest text-xs">Review Details</h3>
                                      {quizData.map((q, idx) => {
                                          const userAnswer = userAnswers[idx];
                                          const isCorrect = userAnswer && userAnswer[0] === q.answer;
                                          
                                          return (
                                              <div key={idx} className="mb-8 border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                                                  <p className="font-semibold text-slate-900 mb-4 text-lg"><span className="text-slate-400 mr-2">{idx + 1}.</span> {q.question}</p>
                                                  
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                                                       <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                                           <span className="block text-xs font-bold tracking-wider opacity-70 mb-2">YOUR ANSWER</span>
                                                           {userAnswer || "No Answer"}
                                                       </div>
                                                       <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 text-slate-700">
                                                           <span className="block text-xs font-bold tracking-wider opacity-70 mb-2">CORRECT ANSWER</span>
                                                           {q.options.find(o => o.startsWith(q.answer)) || q.answer}
                                                       </div>
                                                  </div>

                                                  {q.explanation && (
                                                      <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl text-sm text-sky-900">
                                                          <span className="font-bold mr-2 text-sky-700">💡 Explanation:</span>
                                                          {q.explanation}
                                                      </div>
                                                  )}
                                              </div>
                                          );
                                      })}
                                  </div>
                                  
                                  <button 
                                     onClick={handleClose}
                                     className='bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl mt-2 mx-auto w-full max-w-xs'
                                  >
                                      Finish Lesson
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>
              ) : loading ? (
                  <div className='flex flex-col items-center justify-center h-full gap-5'>
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                          <LoaderCircleIcon className='w-8 h-8 text-green-600 animate-spin'/>
                      </div>
                      <p className='text-slate-500 font-medium animate-pulse'>{loadingMessage}</p>
                  </div>
              ) : ( 
                  <div className='flex-grow flex flex-col min-h-0 py-4'>
                      {!currentTopic ? (
                          <div className="h-full flex flex-col items-center justify-center text-slate-400">
                              <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6 border border-slate-200">
                                  <BookOpen className="w-8 h-8 text-slate-300" />
                              </div>
                              <h3 className="text-xl font-bold text-slate-700 mb-2">Select a Topic</h3>
                              <p className="text-center max-w-sm">Choose a lesson from the left sidebar to begin your class.</p>
                          </div>
                      ) : (
                          <>
                              <div className="absolute top-4 right-4 z-20">
                                  <button 
                                    onClick={handleNext}
                                    className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white shadow-md`}
                                  >
                                    Continue Explanation <ChevronRight className="w-4 h-4" />
                                  </button>
                              </div>

                              <AnimatePresence mode='wait'>
                                  <motion.div
                                      key={activeSection}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -10 }}
                                      transition={{ duration: 0.3 }}
                                      className='bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm flex-1 min-h-0 overflow-y-auto custom-scrollbar custom-markdown'
                                  >
                                      <div className="prose prose-lg prose-slate max-w-none text-slate-700 prose-headings:text-slate-900 marker:text-green-500 prose-a:text-green-600">
                                          {data ? <ReactMarkdown>{String(data).replace(/\n/g, '  \n')}</ReactMarkdown> : <div className="text-slate-400 italic">No content rendered yet. Click continue to resume the lesson stream.</div>}
                                      </div>
                                  </motion.div>
                              </AnimatePresence>
                          </>
                      )}
                  </div>
              )}
              </div>
          </div>
      </div>
    </main>
  );
}

export default Learn