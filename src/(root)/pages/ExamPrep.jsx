import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, FileUp, Send, CheckCircle2, Upload, ClipboardList } from 'lucide-react'
import { useSelector } from 'react-redux'
import { apiClient } from '../../utils/api'

function ExamPrep() {
  const role = useSelector((state) => state.user.role);
  const user_id = localStorage.getItem('user_id') || '';
  const managedCourseCodes = useSelector((state) => state.user.managedCourseCodes);

  // Tutor upload state
  const [courseCode, setCourseCode] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [parsedCount, setParsedCount] = useState(0);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');
    setParsedCount(0);
    try {
      const formData = new FormData();
      formData.append('course_code', courseCode);
      formData.append('tutor_id', user_id);
      if (questionText) formData.append('question_text', questionText);
      if (file) formData.append('file', file);

      const response = await apiClient('/exam-questions/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Successfully parsed ${data.count} questions!`);
        setParsedCount(data.count);
        setQuestionText('');
        setFile(null);
      } else {
        setMessage(data.detail || 'Failed to parse questions.');
      }
    } catch (err) {
      setMessage('Error uploading material.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto p-6 md:p-12">
        <h1 className="text-4xl font-extrabold text-slate-800">Exam Preparation</h1>
        <p className='font-Inter text-[#65758B] mb-8'>Get ready for your exams with AI-powered insights</p>

        {/* ─── Tutor Upload Section ─── */}
        {(role === 'tutor' || role === 'admin') && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-700 mb-2 flex items-center">
              <Upload className="w-6 h-6 mr-3 text-blue-600" />
              Upload Exam Questions
            </h2>
            <p className="text-sm text-slate-500 mb-6">Upload a PDF or paste question text. AI will automatically parse and structure the questions into the question pool.</p>

            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center shadow-sm ${parsedCount > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                <CheckCircle2 className="w-5 h-5 mr-3" />
                <span className="font-semibold">{message}</span>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Course Code</label>
                <select
                  value={courseCode}
                  onChange={e => setCourseCode(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                >
                  <option value="">Select course code...</option>
                  {managedCourseCodes?.map(courseCode => (
                    <option key={courseCode} value={courseCode}>{courseCode}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Paste Exam Questions (Optional)</label>
                <textarea
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Paste exam questions here... (fill-in-the-gap, objective, etc.)"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Or Upload Exam PDF</label>
                <input
                  type="file"
                  onChange={e => setFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                />
              </div>
              <button
                disabled={uploading || (!questionText && !file)}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-200 flex items-center justify-center min-w-[220px]"
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    AI is parsing...
                  </span>
                ) : (
                  <>Upload & Parse <Send className="w-4 h-4 ml-2" /></>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* ─── Student Exam Mode Cards ─── */}
        {role !== 'tutor' && role !== 'admin' && (
        <div className='grid md:grid-cols-2 gap-6'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
                <div className="flex flex-col items-center justify-center mb-6">
                     <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                        <BookOpen className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="text-center">
                         <h2 className="text-xl font-extrabold text-slate-900 mb-2">Practice Questions</h2>
                         <p className='text-slate-500 text-sm'>10 random questions • No time limit • Drill core concepts</p>
                    </div>
                </div>
                <Link to="/practice-questions" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center transition-colors shadow-lg shadow-blue-200">
                    Start Practice
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
                <div className="flex flex-col items-center justify-center mb-6">
                     <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-4">
                        <ClipboardList className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div className="text-center">
                         <h2 className="text-xl font-extrabold text-slate-900 mb-2">Timed Mock Exams</h2>
                         <p className='text-slate-500 text-sm'>15 random questions • 30 min countdown • Simulate real exams</p>
                    </div>
                </div>
                <Link to="/mock-exams" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center transition-colors shadow-lg shadow-emerald-200">
                    Start Mock Exam
                </Link>
            </motion.div>
        </div>
        )}
    </section>
  )
}

export default ExamPrep