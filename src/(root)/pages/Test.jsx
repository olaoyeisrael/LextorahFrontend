import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, XCircle, Timer, Award, MoveRight, Loader2, Lock } from 'lucide-react';


import { apiClient } from '../../utils/api';


const Test = () => {
  const [step, setStep] = useState('setup'); // setup, taking, result
  const enrolledCourse = localStorage.getItem('enrolledCourse')
  const enrolledLevel = localStorage.getItem('enrolledLevel')
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [topics, setTopics] = useState([]);
  const [testMaterial, setTestMaterial] = useState(null);


  useEffect(() => {

    const token = localStorage.getItem('token');
    const getCourses = async () => {
      try {

        const res = await apiClient('/course_structure');

        const data = await res.json();
        console.log(data.structure);
        setTopics(data.structure);
      } catch (error) {
          console.error("Failed to fetch topics:", error);
      } finally {
          setLoading(false);
      }
    }
    getCourses();
    
}, []);


  const startTest = async () => {
    // if (!config.topic) {
    //     setError('Please enter a topic to start.');
    //     return;
    // }
    // Topic is optional now, defaulting to General Course if empty
 

    setLoading(true);




    setError('');
    console.log("testMaterial: ",testMaterial)
    try {

      const response = await apiClient('/quiz', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testMaterial),
      });


      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();

      
      if (data.Quiz && Array.isArray(data.Quiz) && data.Quiz.length > 0) {
          setQuestions(data.Quiz);
          setStep('taking');
      } else {
          // Fallback if structure is different or empty
          console.error("Invalid quiz data:", data);
          setError('Failed to generate valid questions. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('result');
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      if (userAnswer) {
          // Robust check: Compare first letter (e.g., "A" from "A. Answer")
          // This handles cases where answer is just "A" or "A. Answer Text"
          const userCode = userAnswer.charAt(0).toUpperCase();
          const correctCode = q.answer.charAt(0).toUpperCase();
          
          if (userCode === correctCode) {
              score++;
          }
      }
    });
    return score;
  };

  // Handle Test Completion
  useEffect(() => {
      if (step === 'result' && questions.length > 0) {
          const score = calculateScore();
          const percentage = (score / questions.length) * 100;
          const token = localStorage.getItem('token');

          // 1. Submit Quiz Result (Always)
          if (testMaterial?.topic) {
            const details = questions.map((q, idx) => {
                const userAnswer = answers[idx] || "No Answer";
                const userCode = userAnswer.charAt(0).toUpperCase();
                const correctCode = q.answer.charAt(0).toUpperCase();
                const isCorrect = userAnswer !== "No Answer" && userCode === correctCode;
                
                const fullCorrectAnswer = q.options?.find(o => o.startsWith(q.answer)) || q.answer;

                return {
                    question: q.question,
                    user_answer: userAnswer,
                    correct_answer: fullCorrectAnswer,
                    is_correct: isCorrect
                };
            });


            apiClient('/submit_quiz_result', {
                method: 'POST',

                body: JSON.stringify({
                    topic: testMaterial.topic,
                    course_title: (enrolledCourse || "General").toLowerCase(),
                    level: (enrolledLevel || "A1").toLowerCase(),
                    score: score,
                    total: questions.length,
                    details: details
                })
            }).then(res => res.json())
              .then(data => console.log("Quiz result saved:", data))
              .catch(err => console.error("Failed to save quiz result:", err));
          }
          
          // 2. Mark Topic Complete (If Passed) - REMOVED per requirements.
          // Topics are only completed via the Learn module.
          if (percentage >= 50) {
             console.log("Passing Score!");
          }
      }
  }, [step]);

  const restart = () => {
    setStep('setup');
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers({});
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[500px]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Take a Test</h1>
        <p className="text-slate-500">Challenge yourself and test your knowledge.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 md:p-10 relative overflow-hidden">
        {/* Background blobs for aesthetic */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-0 pointer-events-none" />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {step === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-lg mx-auto"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Test Course</label>
                   
                   {loading ? (
                       <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                           <Loader2 className="w-8 h-8 animate-spin mb-2 text-green-600" />
                           <p>Loading test...</p>
                       </div>
                   ) : topics.length > 0 ? (
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {topics.map((t, idx) => {
                              const isLocked = !t.is_completed;
                              return (
                               <div 
                                key={idx} 
                                onClick={() => {
                                    if(!isLocked) {
                                      setTestMaterial({
                                          material: t.cloud_url,
                                          topic: t.topic,
                                          week: t.week
                                      });
                                    } else {
                                      alert("Please complete the lesson for this topic first.");
                                    }
                                }}
                                className={`p-4 border rounded-xl flex items-center justify-between transition-all ${
                                     isLocked 
                                     ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-70' 
                                     : 'cursor-pointer hover:bg-green-50 hover:border-green-300 bg-white border-slate-200'
                                 } ${testMaterial?.material === t.cloud_url ? 'bg-green-50 border-green-500 ring-2 ring-green-200' : ''}`}
                               >
                                   <div className="flex items-center gap-3">
                                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                            isLocked ? 'bg-slate-200 text-slate-500' : 'bg-green-100 text-green-700'
                                        }`}>
                                           {isLocked ? <Lock className="w-4 h-4" /> : idx + 1}
                                       </div>
                                       <div>
                                           <h3 className={`font-bold ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>{t.topic}</h3>
                                           <p className="text-xs text-slate-500">{t.week || `Module ${idx+1}`}</p>
                                       </div>
                                   </div>
                                   {testMaterial?.material === t.cloud_url && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                               </div>
                           )})}
                       </div>
                   ) : (
                       <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                           You are not enrolled in any course.
                       </div>
                   )}
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Topic (Optional)</label>
                  <input
                    type="text"
                    value={config.topic}
                    onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                    placeholder="e.g., Verbs, Greetings (Leave empty for general)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                  />
                  <p className="text-xs text-slate-400 mt-1">Focus on a specific area or leave blank for a general test.</p>
                </div> */}


                {error && (
                    <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                <button
                  onClick={startTest}
                  disabled={loading}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Start Test <MoveRight className="w-5 h-5" /></>}
                </button>
              </motion.div>
            )}

            {step === 'taking' && (
              <motion.div
                key="taking"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm font-medium text-slate-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold">
                    <h1>Do not refresh the page.</h1>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
                    {questions[currentQuestion].question}
                  </h2>
                </div>

                <div className="space-y-3 mb-8">
                  {questions[currentQuestion].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between group ${
                        answers[currentQuestion] === opt
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : 'border-slate-100 bg-white hover:border-green-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="font-medium">{opt}</span>
                      {answers[currentQuestion] === opt && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={nextQuestion}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
                <p className="text-slate-500 mb-8">Here is how you performed</p>

                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-10">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Score</span>
                        <span className="text-3xl font-bold text-slate-900">{calculateScore()}/{questions.length}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider">Accuracy</span>
                        <span className="text-3xl font-bold text-slate-900">{Math.round((calculateScore() / questions.length) * 100)}%</span>
                    </div>
                </div>

                {/* Review Section */}
                <div className="text-left max-w-2xl mx-auto mb-10">
                  <h3 className="font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">Review Your Answers</h3>
                  <div className="space-y-8">
                    {questions.map((q, idx) => {
                       // Re-use logic for consistency
                       const userAnswer = answers[idx] || "No Answer";
                       // Logic from calculateScore
                       const userCode = userAnswer.charAt(0).toUpperCase();
                       const correctCode = q.answer.charAt(0).toUpperCase();
                       const isCorrect = userAnswer !== "No Answer" && userCode === correctCode;

                       return (
                          <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                              <p className="font-medium text-slate-900 mb-4"><span className="text-slate-400 mr-2">{idx + 1}.</span> {q.question}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                                   <div className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                       <span className="block text-xs font-bold opacity-70 mb-1">YOUR ANSWER</span>
                                       {userAnswer || "No Answer"}
                                   </div>
                                   <div className="p-3 rounded-lg border bg-white border-slate-200 text-slate-700">
                                       <span className="block text-xs font-bold opacity-70 mb-1">CORRECT ANSWER</span>
                                       {/* Try to find full option text if possible, else just answer code */}
                                       {q.options?.find(o => o.startsWith(q.answer)) || q.answer}
                                   </div>
                              </div>

                              {q.explanation && (
                                  <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-sm text-yellow-900 flex gap-3">
                                      <span className="text-xl">💡</span>
                                      <div>
                                        <span className="font-bold block mb-1">Explanation</span>
                                        {q.explanation}
                                      </div>
                                  </div>
                              )}
                          </div>
                       )
                    })}
                  </div>
                </div>

                <button
                  onClick={restart}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all"
                >
                  Take Another Test
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Test;
