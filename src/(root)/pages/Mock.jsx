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
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
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
      let queryUrl = `/exam-questions/mock?course_code=${encodeURIComponent(selectedCourse)}`;
      if (subject) queryUrl += `&subject=${encodeURIComponent(subject)}`;
      if (topic) queryUrl += `&topic=${encodeURIComponent(topic)}`;
      if (difficulty) queryUrl += `&difficulty=${encodeURIComponent(difficulty)}`;

      const response = await apiClient(queryUrl);
      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setError('No mock exam questions available matching these filters.');
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
    console.log('Exam result saved:', data);
    return data;
    
  };

  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Timed Mock Exam</h2>
            <p className="text-slate-500">Configure your filters and start your timed assessment (1 minute per question).</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Course *</label>
              <select 
                value={selectedCourse}
                onChange={(e) => { setSelectedCourse(e.target.value); setError(''); }}
                className="w-full p-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium text-slate-700"
              >
                <option value="">-- Choose Course --</option>
                {managedCourseCodes?.map(code => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subject (Optional)</label>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Mathematics"
                  className="w-full p-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium text-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Topic (Optional)</label>
                <input 
                  type="text" 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Algebra"
                  className="w-full p-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Difficulty (Optional)</label>
              <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium text-slate-700"
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

          </div>

          {error && <p className="text-red-500 text-sm mb-4 font-semibold text-center">{error}</p>}
          
          <button 
            onClick={handleStart}
            disabled={!selectedCourse}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-blue-100"
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
        timeLimit={questions.length * 60}
        title={`Timed Mock Exam — ${selectedCourse}`}
        onComplete={handleComplete}
      />
    </div>
  );
}

export default Mock;