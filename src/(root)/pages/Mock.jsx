import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiClient } from '../../utils/api';
import QuestionPlayer from '../../components/QuestionPlayer';
import { BookOpen, Loader } from 'lucide-react';

function Mock() {
  const user_id = localStorage.getItem('user_id') || '';
  const managedCourseCodes = useSelector((state) => state.user.managedCourseCodes);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCourse, setSelectedCourse] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // We don't auto-fetch anymore. We wait for user to select a course.

  const handleStart = async () => {
    if (!selectedCourse) {
      setError('Please select a course first.');
      return;
    }
    setHasStarted(true);
    setLoading(true);
    setError('');
    try {
      const response = await apiClient(`/exam-questions/mock?course_code=${encodeURIComponent(selectedCourse)}`);
      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setError('No mock exam questions available for this course yet.');
      }
    } catch (err) {
      setError('Failed to load questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async ({ answers, timeTaken }) => {
    const response = await apiClient('/exam-results', {
      method: 'POST',
      body: JSON.stringify({
        student_id: user_id,
        course_code: selectedCourse,
        mode: 'mock',
        answers: answers
      })
    });
    const data = await response.json();
    return data;
  };

  if (!hasStarted) {
    return (
      <div className="max-w-xl mx-auto py-20 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
          <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Timed Mock Exam</h2>
          <p className="text-slate-500 mb-6">Select a course to start your 30-minute test.</p>
          
          <select 
            value={selectedCourse}
            onChange={(e) => { setSelectedCourse(e.target.value); setError(''); }}
            className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-slate-50"
          >
            <option value="">-- Choose Course --</option>
            {managedCourseCodes?.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button 
            onClick={handleStart}
            disabled={!selectedCourse}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
          >
            Start Timed Exam
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-lg font-semibold text-slate-500">{error}</p>
        <button onClick={() => { setHasStarted(false); setError(''); }} className="mt-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12">
      <QuestionPlayer
        questions={questions}
        timed={true}
        timeLimit={60}
        title={`Timed Mock Exam — ${selectedCourse}`}
        onComplete={handleComplete}
      />
    </div>
  );
}

export default Mock;