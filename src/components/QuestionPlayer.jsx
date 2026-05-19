import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Clock, Trophy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * QuestionPlayer — Shared component for Practice Questions and Mock Exams.
 *
 * Props:
 * - questions: array of { _id, type, question, options, answer, explanation }
 * - timed: boolean (enables countdown timer)
 * - timeLimit: seconds (e.g. 1800 for 30 min)
 * - onComplete(results): callback when finished — results = { answers: [...], timeTaken }
 * - title: string displayed at the top
 */
function QuestionPlayer({ questions = [], timed = false, timeLimit = 1800, onComplete, title = "Questions" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: studentAnswer }
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [finished, setFinished] = useState(false);
  const [grading, setGrading] = useState(false);
  const [results, setResults] = useState(null);

  // Timer logic
  useEffect(() => {
    if (!timed || finished) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timed, timeLeft, finished]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = useCallback(() => {
    if (grading || finished) return;
    setFinished(true);
    setGrading(true);

    // Build results array for the onComplete callback
    const answersArray = questions.map(q => ({
      question_id: q._id,
      question: q.question,
      correct_answer: q.answer,
      student_answer: answers[q._id] || "",
      type: q.type
    }));

    const timeTaken = timed ? timeLimit - timeLeft : null;

    if (onComplete) {
      onComplete({ answers: answersArray, timeTaken }).then((res) => {
        setResults(res);
        setGrading(false);
      }).catch(() => setGrading(false));
    } else {
      setGrading(false);
    }
  }, [questions, answers, timed, timeLeft, timeLimit, onComplete, grading, finished]);

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(timeLimit);
    setFinished(false);
    setResults(null);
    setGrading(false);
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Trophy className="w-16 h-16 mb-4 text-slate-300" />
        <p className="text-xl font-semibold">No questions available yet.</p>
      </div>
    );
  }

  // ─── Results Screen ───
  if (finished && results) {
    const { score, total, score_percent, details } = results;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className={`p-8 text-center ${score_percent >= 70 ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : score_percent >= 40 ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-red-500 to-rose-600'} text-white`}>
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">{title} Complete!</h2>
            <p className="text-6xl font-black mb-2">{score_percent}%</p>
            <p className="text-lg opacity-90">{score} out of {total} correct</p>
          </div>

          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-700 border-b pb-2">Question Breakdown</h3>
            {details && details.map((d, i) => (
              <div key={i} className={`p-4 rounded-xl border ${d.correct ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-3">
                  {d.correct ?
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" /> :
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                  }
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">{questions[i]?.question}</p>
                    <p className="text-xs text-slate-500 mt-1">Your answer: <span className="font-bold">{d.student_answer || "(blank)"}</span></p>
                    {!d.correct && <p className="text-xs text-emerald-700 mt-1">Correct: <span className="font-bold">{d.correct_answer}</span></p>}
                    {d.feedback && <p className="text-xs text-slate-600 mt-1 italic">{d.feedback}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t">
            <button onClick={handleReset} className="flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-200">
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── Grading Screen ───
  if (finished && grading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xl font-bold text-slate-700">AI is grading your answers...</p>
        <p className="text-sm text-slate-400 mt-2">This may take a moment.</p>
      </div>
    );
  }

  // ─── Question Screen ───
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header with timer and progress */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">{title}</h2>
        {timed && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg ${timeLeft <= 60 ? 'bg-red-100 text-red-700 animate-pulse' : timeLeft <= 300 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-bold text-slate-400">Question {currentIndex + 1} of {questions.length}</span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${currentQuestion?.type === 'fill_in_gap' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
              {currentQuestion?.type === 'fill_in_gap' ? 'Fill in the Gap' : 'Multiple Choice'}
            </span>
          </div>
          {currentQuestion?.instruction && (
            <div className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-100">
               <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed font-medium">{currentQuestion.instruction}</p>
            </div>
          )}

          <h3 className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">{currentQuestion?.question}</h3>

          {currentQuestion?.type === 'objective' && currentQuestion?.options?.length > 0 ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => {
                const isSelected = answers[currentQuestion._id] === option;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(currentQuestion._id, option)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${isSelected ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-md shadow-blue-100' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'}`}
                  >
                    <span className="font-bold mr-3 text-sm">{String.fromCharCode(65 + i)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              type="text"
              value={answers[currentQuestion?._id] || ''}
              onChange={(e) => handleAnswer(currentQuestion._id, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg font-medium"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>

        <span className="text-sm font-medium text-slate-400">{answeredCount} of {questions.length} answered</span>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answeredCount === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 disabled:opacity-50"
          >
            Submit <CheckCircle2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionPlayer;
