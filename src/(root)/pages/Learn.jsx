import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle, Loader, LoaderCircleIcon, BookOpen, ChevronRight, Award } from 'lucide-react';


const Learn = () => {
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
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
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [progress, setProgress] = useState(0); // Progress percentage
    const isAutoMode = false; // Placeholder for now

    const location = useLocation();

    const navigate = useNavigate()
    
    const [learningContext, setLearningContext] = useState(null); // { filename, topic, course, level, topic_index }
    const { token } = useSelector((state) => state.user);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const initLearning = async () => {
            if (!token) {
                 navigate('/login'); 
                 return;
            }

            try {
                // 1. Fetch Structure
                // We initially try without params to get "enrolled" context.
                // If "All" access, we might need a level from localStorage or location.
                let level = localStorage.getItem('last_level');
                console.log("level:", level);
                let url = `${import.meta.env.VITE_BACKEND_URL}/course_structure`;
                console.log("url:", url);
              

                const res = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'GET'
                });
                
                if (!res.ok) {
                    throw new Error("Failed to fetch structure");
                }

                const data = await res.json();
         
                console.log("data:", data);
                
                const structure = data.structure || [] // Modified backend returns {structure: []}
                setTopics(structure)
                console.log("structure:", structure);

                // Use the user's current_topic_index to find the topic
                const userData = data.user_data || {}; // Assuming user_data is part of the response
                const currentIdx = userData.current_topic_index || 0;
                
                // Check if course is completed
                if (structure.length > 0 && currentIdx >= structure.length) {
                    setCourseFinished(true); // Need to define this state
                    setLoading(false);
                    return;
                }

                const currentTopicObj = structure.find(t => t.index === currentIdx) || structure[0]
                
                let resolvedTopic = null;
                if (currentTopicObj) {
                    resolvedTopic = currentTopicObj.topic;
                    setCurrentTopic(resolvedTopic)
                    setCurrentTopicIndex(currentTopicObj.index)
                }

                if (!resolvedTopic) {
                     alert("No active topic found for your course level.");
                     return;
                }

                // 3. Set Context
                setLearningContext({
                    topic: resolvedTopic, 
                    course: userData.enrolled_course,
                    level: userData.enrolled_level,
                    topic_index: currentTopicIndex
                });
                
                // Persist level for reload (Optional, but keeping for consistency)
                if (userData.enrolled_level) localStorage.setItem('last_level', userData.enrolled_level);



            } catch (err) {
                console.error("Init Error", err);
                // navigate('/courses');
            }
        };

        initLearning();
    }, [token, location.state, navigate, currentTopic]); // Added currentTopic to dependencies






  useEffect(() => {
    if (!currentTopic) return; // Wait for currentTopic to be set

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const WS_URL = BASE_URL.replace('http', 'ws');
    const ws = new WebSocket(`${WS_URL}/ws/teach/${user_id}`);
    wsRef.current = ws;

    ws.onopen = () => {
      // Send initialization message with TOPIC instead of filename
      
      // Find the full topic object to get cloud_url/filename
      const topicObj = topics.find(t => t.topic === currentTopic);
      let filenameParam = null;
      if (topicObj && topicObj.cloud_url) {
          // Extract filename from Cloudinary URL
          const parts = topicObj.cloud_url.split('/');
          filenameParam = parts[parts.length - 1]; // Get the last part
          console.log("Using Cloudinary Filename:", filenameParam);
      } else if (topicObj && topicObj.file) {
          filenameParam = topicObj.file;
      }

      ws.send(JSON.stringify({
          token: token,
          topic: currentTopic, // Send topic name
          filename: filenameParam, // Send extracted filename
          start_section: 1, // Or user's current section
          auto: isAutoMode
      }));

    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.type === 'quiz') {
            const q = typeof parsed.quiz === 'string' ? JSON.parse(parsed.quiz) : parsed.quiz;
            setQuizData(q);
            setLoading(false);
            setData(null); 
        } else if (parsed.type === 'syllabus') {
            setSections(parsed.sections);
        } else if (parsed.type === 'info') {
             console.log("Info:", parsed.message);
             setLoading(true);
             setLoadingMessage(parsed.message); // Update UI with backend message
        } else if (parsed.type === 'explanation') {

             setData(parsed.explanation);
             setActiveSection(parsed.section_index);
             setLoading(false);
             // Accumulate full content for transcript
             if (parsed.explanation) {
                 fullContentRef.current += `\n\n## Section ${parsed.section_index}\n\n` + parsed.explanation;
             }
        } else {
             // Fallback/Legacy
             if(parsed.explanation) {
                 setData(parsed.explanation);
                 setLoading(false);
                  if (parsed.explanation) {
                     fullContentRef.current += "\n\n" + parsed.explanation;
                 }
             }
        }
      } catch {
         // handle error gracefully
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      setLoading(false); 
    };

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      wsRef.current = null;
    };
  }, [currentTopic, token, user_id, isAutoMode, topics]); // Depend on currentTopic, token, user_id, isAutoMode, topics


  const sendCmd = (cmd, payload = {}) => {
    setLoading(true);
    setData(null);
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not open');
      return;
    }
    ws.send(JSON.stringify({ cmd, ...payload }));
  };

  const handleNext = () => {
    // Logic to move to next section or finish
    if (activeSection < sections.length) {
        // Optimistic update or just wait for backend? 
        // Backend handles "next" command best for linear flow
        setLoading(true);
        setLoadingMessage("Generating explanation...");
        sendCmd('next');
    } else {
        // Prepare for quiz
        setLoading(true);
        setLoadingMessage("Generating quiz...");
        sendCmd('next'); // trigger completion/quiz
        // removed setLoading(false) to keep it spinning
    }

  };

  const handleClose = () => {
    sendCmd('close');
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
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
      if (selectedAnswer[0] === currentQuestion.answer) {
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
                  await fetch(`${import.meta.env.VITE_BACKEND_URL}/complete_topic`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}` 
                      },
                      body: JSON.stringify({
                          course: learningContext.course,
                          level: learningContext.level,
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
      setLoading(true);
      sendCmd('goto', { section: section.index });
  };


  return (
    <main className='w-full min-h-screen bg-green-50 flex flex-col font-Mada'>
      {/* Top Header */}
      <div className='bg-white border-b border-green-100 shadow-sm sticky top-0 z-10'>
          <div className='max-w-6xl mx-auto px-4 py-4 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600'>
                      <BookOpen size={20} />
                  </div>
                  <div>
                      <h1 className='text-xl font-bold text-slate-800 line-clamp-1 break-all'>{learningContext?.topic || "Loading..."}</h1>
                      <p className='text-sm text-slate-500'>Learning Module</p>
                  </div>

              </div>
              <button onClick={handleClose} className='p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors'>
                  <X size={24}/>
              </button>
          </div>

          {/* New "Box of Available Options" / Top Navigation */}
          {!quizData && sections.length > 0 && (
              <div className='max-w-6xl mx-auto px-4 pb-0 overflow-x-auto no-scrollbar'>
                  <div className='flex space-x-4 py-4'>
                      {sections.map((section, idx) => (
                          <button
                              key={section.index}
                              onClick={() => handleSectionClick(section)}
                              className={`
                                  flex-shrink-0 px-6 py-3 rounded-xl border-2 font-medium transition-all duration-200
                                  flex flex-col items-start gap-1 min-w-[200px] text-left
                                  ${activeSection === section.index 
                                      ? 'bg-green-600 border-green-600 text-white shadow-lg scale-105' 
                                      : 'bg-white border-green-100 text-slate-600 hover:border-green-300 hover:bg-green-50'}
                              `}
                          >
                              <span className={`text-xs uppercase tracking-wider ${activeSection === section.index ? 'text-green-200' : 'text-slate-400'}`}>Page {section.index}</span>
                              {/* <span className='truncate w-full'>{section.title}</span> */}
                          </button>
                      ))}
                  </div>
              </div>
          )}
      </div>

      {courseFinished ? (
          <div className='flex-1 max-w-4xl w-full mx-auto p-6 md:p-8 flex items-center justify-center'>
              <div className='bg-white p-12 rounded-2xl shadow-xl border border-green-100 text-center'>
                  <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600'>
                      <Award size={48} />
                  </div>
                  <h2 className='text-3xl font-bold text-green-800 mb-4'>Course Completed! 🎉</h2>
                  <p className='text-slate-600 text-lg mb-8'>
                      Congratulations! You have successfully completed all modules in this course.
                  </p>
                  <div className='flex gap-4 justify-center'>
                      <button 
                          onClick={() => navigate('/dashboard')}
                          className='bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl'
                      >
                          Return to Dashboard
                      </button>
                      <button 
                          onClick={() => navigate('/courses')}
                          className='bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl'
                      >
                          View Transcript
                      </button>
                  </div>
              </div>
          </div>
      ) : (
      <div className='flex-1 max-w-4xl w-full mx-auto p-6 md:p-8'>
      {
        quizData ? (
             <div className='w-full'>
                 {!showResults ? (
                     <div className='bg-white p-8 rounded-2xl shadow-xl border border-green-100'>
                           <div className='mb-6 flex items-center justify-between'>
                             <h2 className='text-2xl font-bold text-green-800 mb-6'>Quiz Time!</h2>
                             <h1 className='mb-6 text-red-500 text-center'>Do not refresh this page</h1>
                         </div>
                         <div className='mb-4 text-slate-500'>Question {currentQuestionIndex + 1} of {quizData.length}</div>
                         
                         <h3 className='text-xl font-medium text-slate-800 mb-6'>
                             {quizData[currentQuestionIndex].question}
                         </h3>

                         <div className='space-y-3'>
                             {quizData[currentQuestionIndex].options?.map((option, idx) => (
                                 <div 
                                    key={idx}
                                    onClick={() => handleAnswerSelect(option)}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                        selectedAnswer === option 
                                        ? 'bg-green-50 border-green-500 text-green-900 shadow-md' 
                                        : 'bg-white border-slate-100 hover:border-green-200 hover:bg-slate-50'
                                    }`}
                                 >
                                     {option}
                                 </div>
                             ))}
                         </div>

                         <div className='mt-8 flex justify-end'>
                             <button 
                                onClick={handleNextQuestion}
                                disabled={!selectedAnswer}
                                className='bg-green-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50 hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl active:scale-95'
                             >
                                 {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
                             </button>
                         </div>
                     </div>
                 ) : (
                     <div className='bg-white p-12 rounded-2xl shadow-xl border border-green-100 text-center'>
                         <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600'>
                            <LoaderCircleIcon size={40} />
                         </div>
                         <h2 className='text-3xl font-bold text-green-800 mb-4'>Quiz Completed!</h2>
                         <div className='text-6xl font-bold text-green-600 mb-6'>
                             {Math.round((score / quizData.length) * 100)}%
                         </div>
                         <p className='text-slate-600 text-lg mb-8'>
                             You answered <span className='font-bold text-slate-900'>{score}</span> out of {quizData.length} questions correctly.
                         </p>
                         <button 
                            onClick={handleClose}
                            className='bg-slate-900 text-white px-10 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl'
                         >
                             Back to Dashboard
                         </button>
                     </div>
                 )}
             </div>
        ) :

        loading ? (
        <div className='flex flex-col items-center justify-center h-64 gap-4'>
          <LoaderCircleIcon className='w-10 h-10 text-green-600 animate-spin'/>
          <p className='text-green-800 font-medium'>{loadingMessage}</p>
        </div>

        ) : ( 
        <div className='w-full space-y-6'>
            
           

            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className='bg-white p-8 md:p-12 rounded-2xl border border-green-100 shadow-sm'
                >
                    <div className="prose prose-lg prose-green max-w-none text-slate-700">
                        <ReactMarkdown>{String(data)}</ReactMarkdown>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className='flex items-center justify-between pt-4'>
              <button 
                className='flex items-center gap-2 text-green-700 hover:text-green-800 px-6 py-3 rounded-xl hover:bg-green-50 transition-colors font-medium' 
                onClick={()=>navigate('/ask')}
              >
                <MessageCircle size={20}/>
                <span>Ask AI Tutor</span>
              </button>

              <button 
                className='flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200 hover:-translate-y-0.5' 
                onClick={handleNext}
              >
                <span>Continue</span>
                <ChevronRight size={18} />
              </button>
            </div>

             <div className='bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors group'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-blue-900'>Media Repository</h3>
                        <p className='text-blue-700 text-sm'>View video & audio materials for this lesson</p>
                    </div>
                </div>
                <div className='text-blue-400 group-hover:translate-x-1 transition-transform'>
                    <ChevronRight size={24} />
                </div>
            </div>
        </div>
        )
      }
      </div>
      )}
    </main>
  );
}

export default Learn