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

  useEffect(() => {
    fetchQuestions();
  }, [managedCourseCodes]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const codes = managedCourseCodes?.join(',') || '';
      if (!codes) {
        setError('No course codes found. Please ensure you are enrolled in a course.');
        setLoading(false);
        return;
      }
      const response = await apiClient(`/exam-questions/mock?course_code=${encodeURIComponent(codes)}`);
      const data = await response.json();
      if (data.questions) {
        setQuestions(data.questions);
      }
      if (data.questions?.length === 0) {
        setError('No mock exam questions available yet.');
      }
    } catch (err) {
      setError('Failed to load questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async ({ answers, timeTaken }) => {
    const codes = managedCourseCodes?.join(',') || '';
    const response = await apiClient('/exam-results', {
      method: 'POST',
      body: JSON.stringify({
        student_id: user_id,
        course_code: codes,
        mode: 'mock',
        answers: answers
      })
    });
    const data = await response.json();
    return data;
  };

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
        <button onClick={fetchQuestions} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12">
      <QuestionPlayer
        questions={questions}
        timed={true}
        timeLimit={1800}
        title="Timed Mock Exam"
        onComplete={handleComplete}
      />
    </div>
  );
}

export default Mock;