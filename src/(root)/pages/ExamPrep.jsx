import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  BookOpen, FileUp, Send, CheckCircle2, Upload, ClipboardList,
  Search, ChevronDown, ChevronUp, FileText, Check, AlertCircle, RefreshCw,
  HelpCircle, Eye, EyeOff
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { apiClient } from '../../utils/api'

function ExamPrep() {
  const role = useSelector((state) => state.user.role);
  const user_id = localStorage.getItem('user_id') || '';
  const managedCourseCodes = useSelector((state) => state.user.managedCourseCodes) || [];

  // Tutor upload state
  const [courseCode, setCourseCode] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [parsedCount, setParsedCount] = useState(0);

  // Question Pool states
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questionsError, setQuestionsError] = useState('');
  
  // Search and Filter states
  const [questionSearch, setQuestionSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterType, setFilterType] = useState('All');

  // Expanded question card states
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const fetchQuestions = async () => {
    if (!managedCourseCodes || managedCourseCodes.length === 0) return;
    setLoadingQuestions(true);
    setQuestionsError('');
    try {
      const courseQuery = managedCourseCodes.join(',');
      const response = await apiClient(`/exam-questions?course_code=${encodeURIComponent(courseQuery)}`);
      const data = await response.json();
      if (response.ok) {
        setQuestions(data.questions || []);
      } else {
        setQuestionsError(data.detail || 'Failed to load exam questions.');
      }
    } catch (err) {
      setQuestionsError('Error loading exam questions from server.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (role === 'tutor' || role === 'admin') {
      fetchQuestions();
    }
  }, [role, managedCourseCodes]);

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
      if (subject) formData.append('subject', subject);
      if (topic) formData.append('topic', topic);
      if (difficulty) formData.append('difficulty', difficulty);

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
        setSubject('');
        setTopic('');
        setDifficulty('');
        // Refresh question list after upload
        fetchQuestions();
      } else {
        setMessage(data.detail || 'Failed to parse questions.');
      }
    } catch (err) {
      setMessage('Error uploading material.');
    } finally {
      setUploading(false);
    }
  };

  // Filter questions based on tutor course list and other criteria
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(questionSearch.toLowerCase()) || 
                          (q.topic && q.topic.toLowerCase().includes(questionSearch.toLowerCase())) ||
                          (q.subject && q.subject.toLowerCase().includes(questionSearch.toLowerCase()));
    const matchesCourse = filterCourse === 'All' || q.course_code === filterCourse;
    const matchesDifficulty = filterDifficulty === 'All' || q.difficulty?.toLowerCase() === filterDifficulty.toLowerCase();
    const matchesType = filterType === 'All' || q.type === filterType;
    return matchesSearch && matchesCourse && matchesDifficulty && matchesType;
  });

  const toggleExpandQuestion = (id) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  return (
    <section className="max-w-6xl mx-auto p-4 md:p-8 space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Exam Preparation</h1>
          <p className='font-Inter text-slate-500 mt-1'>Upload and review exam questions powered by AI insights</p>
        </div>

        {/* ─── Tutor / Admin Dashboard Views ─── */}
        {(role === 'tutor' || role === 'admin') && (
          <div className="space-y-10">
            
            {/* 1. Upload Exam Questions Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center">
                <Upload className="w-5 h-5 mr-3 text-blue-600" />
                Upload Exam Questions
              </h2>
              <p className="text-sm text-slate-500 mb-6">Upload a PDF or paste question text. Configure optional indexing filters to categorize the questions.</p>

              {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center shadow-sm text-sm font-semibold border ${
                  parsedCount > 0 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  <CheckCircle2 className="w-5 h-5 mr-3 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Course Code *</label>
                    <select
                      value={courseCode}
                      onChange={e => setCourseCode(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white font-semibold text-slate-700 text-sm"
                    >
                      <option value="">Select course code...</option>
                      {managedCourseCodes?.map(courseCode => (
                        <option key={courseCode} value={courseCode}>{courseCode}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject (Optional)</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="e.g. Mathematics"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-700 text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Topic (Optional)</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={e => setTopic(e.target.value)}
                      placeholder="e.g. Algebra"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-700 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Difficulty (Optional)</label>
                    <select
                      value={difficulty}
                      onChange={e => setDifficulty(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white text-slate-700 text-sm font-semibold"
                    >
                      <option value="">Any Difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Paste Exam Questions (Optional)</label>
                  <textarea
                    value={questionText}
                    onChange={e => setQuestionText(e.target.value)}
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-slate-700 text-sm"
                    placeholder="Paste exam questions here... (fill-in-the-gap, objective, etc.)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Or Upload Exam PDF</label>
                  <input
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                    accept=".pdf,.doc,.docx"
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
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

            {/* 2. Active Exam Question Pool Viewer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center">
                    <ClipboardList className="w-5 h-5 mr-3 text-emerald-600" />
                    Active Exam Question Pool
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Viewing uploaded questions for courses you teach</p>
                </div>
                <button
                  onClick={fetchQuestions}
                  className="self-start sm:self-center flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingQuestions ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {/* Filters Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                {/* Search text */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={questionSearch}
                    onChange={e => setQuestionSearch(e.target.value)}
                    placeholder="Search questions..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold outline-none bg-white focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-700"
                  />
                </div>

                {/* Course code Filter */}
                <div>
                  <select
                    value={filterCourse}
                    onChange={e => setFilterCourse(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white outline-none text-slate-700 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="All">All Courses</option>
                    {managedCourseCodes.map(code => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <select
                    value={filterDifficulty}
                    onChange={e => setFilterDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white outline-none text-slate-700 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="All">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white outline-none text-slate-700 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="All">All Types</option>
                    <option value="objective">Objective</option>
                    <option value="fill_in_gap">Fill-in-gap</option>
                    <option value="essay_theory">Essay/Theory</option>
                    <option value="comprehension">Comprehension</option>
                    <option value="speaking_listening">Speaking/Listening</option>
                  </select>
                </div>
              </div>

              {/* Listing Content */}
              {loadingQuestions ? (
                <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-2">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-sm font-bold">Loading question pool...</p>
                </div>
              ) : questionsError ? (
                <div className="p-8 text-center bg-red-50 border border-red-100 text-red-650 rounded-2xl flex flex-col items-center gap-3">
                  <AlertCircle className="w-8 h-8" />
                  <p className="text-sm font-bold">{questionsError}</p>
                  <button
                    onClick={fetchQuestions}
                    className="px-4 py-2 text-xs font-bold bg-white border border-red-200 rounded-xl hover:bg-red-50 text-red-700"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredQuestions.length === 0 ? (
                <div className="p-12 text-center text-slate-400 bg-slate-50/20 border border-dashed border-slate-200 rounded-2xl">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm font-bold">No exam questions found matching the criteria.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-400 mb-2">Showing {filteredQuestions.length} questions</div>
                  
                  {filteredQuestions.map((q, idx) => {
                    const isExpanded = expandedQuestionId === q._id;
                    const diffColors = q.difficulty?.toLowerCase() === 'easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                       q.difficulty?.toLowerCase() === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                       q.difficulty?.toLowerCase() === 'hard' ? 'bg-red-50 text-red-700 border-red-100' :
                                       'bg-slate-50 text-slate-500 border-slate-150';
                                       
                    return (
                      <div 
                        key={q._id || idx}
                        className="bg-white rounded-2xl border border-slate-150 hover:border-slate-300 transition-colors shadow-sm overflow-hidden"
                      >
                        {/* Summary Header block */}
                        <div 
                          onClick={() => toggleExpandQuestion(q._id)}
                          className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                        >
                          <div className="space-y-2 min-w-0 flex-1">
                            {/* Badges line */}
                            <div className="flex flex-wrap gap-1.5 items-center">
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold rounded">
                                {q.course_code}
                              </span>
                              {q.subject && (
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-650 text-[10px] font-semibold rounded">
                                  {q.subject}
                                </span>
                              )}
                              {q.topic && (
                                <span className="px-2 py-0.5 bg-indigo-55/60 text-indigo-850 text-[10px] font-semibold rounded">
                                  {q.topic}
                                </span>
                              )}
                              <span className="px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-200 text-[10px] font-bold rounded capitalize">
                                {q.type?.replace('_', ' ')}
                              </span>
                            </div>
                            
                            {/* Question text snippet */}
                            <p className="text-sm font-bold text-slate-800 leading-relaxed truncate-2-lines">
                              {q.question}
                            </p>
                          </div>
                          
                          {/* Toggle expand chevron icon */}
                          <div className="p-1 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-slate-100 shrink-0">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>

                        {/* Expanded detail block */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-slate-150 bg-slate-50/40"
                            >
                              <div className="p-5 space-y-4 text-sm">
                                
                                {/* Instruction / Reading Passage context */}
                                {q.instruction && (
                                  <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200 text-slate-600 leading-relaxed text-xs">
                                    <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-1.5">Instruction / Context Passage</p>
                                    {q.instruction}
                                  </div>
                                )}

                                {/* Full Question */}
                                <div>
                                  <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider block mb-1">Full Question</span>
                                  <p className="font-bold text-slate-900 text-sm leading-relaxed">{q.question}</p>
                                </div>

                                {/* Options (only if objective) */}
                                {q.type === 'objective' && q.options && q.options.length > 0 && (
                                  <div>
                                    <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider block mb-2">Options</span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {q.options.map((opt, i) => {
                                        const isCorrect = opt === q.answer;
                                        return (
                                          <div 
                                            key={i} 
                                            className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                                              isCorrect 
                                                ? 'bg-green-50 border-green-200 text-green-800' 
                                                : 'bg-white border-slate-200 text-slate-600'
                                            }`}
                                          >
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                                              isCorrect ? 'bg-green-600 border-green-700 text-white' : 'border-slate-350 bg-slate-50'
                                            }`}>
                                              {isCorrect ? <Check className="w-2.5 h-2.5" /> : <span className="text-[9px] font-black text-slate-400">{String.fromCharCode(65 + i)}</span>}
                                            </div>
                                            <span>{opt}</span>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Correct Answer (for fill_in_gap, essay, etc.) */}
                                {q.type !== 'objective' && (
                                  <div className="p-3 bg-green-50/50 border border-green-100 rounded-xl">
                                    <span className="font-bold text-green-700 uppercase text-[9px] tracking-wider block mb-1">Correct Answer / Guideline</span>
                                    <p className="font-bold text-green-850 text-xs leading-relaxed">{q.answer}</p>
                                  </div>
                                )}

                                {/* Explanation */}
                                {q.explanation && (
                                  <div>
                                    <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider block mb-1">Grading Explanation</span>
                                    <p className="text-slate-600 leading-relaxed text-xs">{q.explanation}</p>
                                  </div>
                                )}

                                {/* Bottom Metadata details */}
                                <div className="pt-3 border-t border-slate-150 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                  {q.academic_level && <span>Academic Level: {q.academic_level}</span>}
                                  {q.learning_objective && <span>Objective: {q.learning_objective}</span>}
                                  {q.source_file_url && (
                                    <a 
                                      href={q.source_file_url} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-blue-600 hover:underline"
                                    >
                                      Source File Link
                                    </a>
                                  )}
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>

          </div>
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
                         <p className='text-slate-500 text-sm'>10 random questions </p>
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
                         <p className='text-slate-500 text-sm'>50 random questions • 1 hour time limit • Simulate real exams</p>
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

export default ExamPrep;