import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiClient } from '../../utils/api';
import { FileUp, Send, User, CheckCircle2, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSE_CODES } from '../../utils/courseData';

function Assignment() {
  const role = useSelector((state) => state.user.role);
  const user_id = localStorage.getItem('user_id') || 'student_123';
  const managedCourseCodes = useSelector((state) => state.user.managedCourseCodes);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Tutor Creating Assignment Form State
  const [topic, setTopic] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [file, setFile] = useState(null);
  const [deadline, setDeadline] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Accordion State
  const [expandedAssignment, setExpandedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState({}); // mapped by assignment_id

  // Student Answering State
  const [answerText, setAnswerText] = useState('');
  const [answerFile, setAnswerFile] = useState(null);
  const [answeringFor, setAnsweringFor] = useState(null); // ID of assignment being answered

  // Grading State
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [gradeScore, setGradeScore] = useState('');
  const [gradeMaxPoints, setGradeMaxPoints] = useState('');
  const [gradeFeedback, setGradeFeedback] = useState('');
  const [gradingSubmitting, setGradingSubmitting] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, [role, managedCourseCodes]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      let url = '/assignments';
      const params = new URLSearchParams();
      
      if (role === 'student' && managedCourseCodes && managedCourseCodes.length > 0) {
         params.append('course_code', managedCourseCodes.join(','));
      } else if (role === 'tutor') {
         params.append('tutor_id', user_id);
      }
      
      const queryString = params.toString();
      if (queryString) {
          url += `?${queryString}`;
      }
      const response = await apiClient(url);
      const data = await response.json();
      if (data.assignments) {
        setAssignments(data.assignments);
        console.log("Fetched assignments:", data.assignments);
      }
    } catch (error) {
      console.error("Error fetching assignments", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissions = async (assignmentId) => {
    if (submissions[assignmentId]) return; // already loaded
    try {
      const response = await apiClient(`/assignments/${assignmentId}/submissions`);
      const data = await response.json();
      if (data.submissions) {
        setSubmissions(prev => ({...prev, [assignmentId]: data.submissions}));
      }
    } catch (error) {
      console.error("Failed to load submissions", error);
    }
  };

  const handleTutorSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    
    if (!questionText.trim() && !file) {
      setMessage('You must provide either a question description or attach a document.');
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('topic', topic);
      formData.append('course_code', courseCode);
      formData.append('question_text', questionText);
      formData.append('tutor_id', user_id);
      if (deadline) {
        formData.append('deadline', deadline);
      }
      if (file) {
        formData.append('file', file);
      }
      
      const response = await apiClient('/assignments', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Assignment created successfully!');
        setTopic(''); setCourseCode(''); setQuestionText(''); setFile(null); setDeadline('');
        fetchAssignments();
      } else {
        setMessage(data.detail || 'Failed to create assignment.');
      }
    } catch (error) {
      setMessage('Error creating assignment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStudentSubmit = async (assignmentId, e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    
    if (!answerText.trim() && !answerFile) {
        setMessage('You must provide either a written answer or an attached document.');
        setSubmitting(false);
        return;
    }

    try {
      const formData = new FormData();
      formData.append('student_id', user_id);
      formData.append('student_name', `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown Student');
      formData.append('answer_text', answerText);
      if (answerFile) {
        formData.append('file', answerFile);
      }
      
      const response = await apiClient(`/assignments/${assignmentId}/submit`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        setMessage('Answer submitted successfully!');
        setAnswerText(''); setAnswerFile(null); setAnsweringFor(null);
      } else {
        const data = await response.json();
        setMessage(data.detail || 'Failed to submit answer.');
      }
    } catch (error) {
      setMessage('Error submitting answer.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGradeSubmit = async (submissionId, assignmentId, e) => {
    e.preventDefault();
    setGradingSubmitting(true);
    try {
      const response = await apiClient(`/api/submissions/${submissionId}/grade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          score: parseFloat(gradeScore),
          max_points: parseFloat(gradeMaxPoints),
          feedback: gradeFeedback,
          status: 'graded'
        })
      });
      
      if (response.ok) {
        setEditingSubmission(null);
        setGradeScore('');
        setGradeFeedback('');
        
        // Fetch fresh submissions
        const res = await apiClient(`/assignments/${assignmentId}/submissions`);
        const data = await res.json();
        if (data.submissions) {
          setSubmissions(prev => ({...prev, [assignmentId]: data.submissions}));
        }
        setMessage('Submission graded successfully!');
      } else {
        const data = await response.json();
        alert(data.detail || 'Failed to submit grade.');
      }
    } catch (error) {
      console.error('Failed to submit grade', error);
      alert('Error connecting to the server.');
    } finally {
      setGradingSubmitting(false);
    }
  };

  const toggleAccordion = (assignmentId) => {
    if (expandedAssignment === assignmentId) {
      setExpandedAssignment(null);
    } else {
      setExpandedAssignment(assignmentId);
      loadSubmissions(assignmentId); // Load submissions for both tutors, admins, and students
      if (role !== 'tutor' && role !== 'admin') {
         setAnsweringFor(assignmentId);
         setMessage(''); // clear message on new open
      }
    }
  };

  return (
    <div className='p-6 md:p-12 max-w-7xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-slate-800 mb-8'>Assignments</h1>
        
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200 flex items-center shadow-sm">
            <CheckCircle2 className="w-5 h-5 mr-3" />
            <span className="font-semibold">{message}</span>
          </div>
        )}

        {(role === 'tutor' || role === 'admin') && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-slate-100"
          >
            <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
              <FileUp className="w-6 h-6 mr-3 text-blue-600" />
              Create New Assignment
            </h2>
            <form onSubmit={handleTutorSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Topic</label>
                  <input type="text" value={topic} onChange={e => setTopic(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="e.g. Introduction to French" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Course Code</label>
                  <select value={courseCode} onChange={e => setCourseCode(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="">Select Course Code</option>
                    {role === 'admin' 
                      ? COURSE_CODES.map(code => <option key={code} value={code}>{code}</option>)
                      : (managedCourseCodes || []).map(code => <option key={code} value={code}>{code}</option>)
                    }
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Submission Deadline (Optional)</label>
                  <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Question Description (Optional)</label>
                <textarea value={questionText} onChange={e => setQuestionText(e.target.value)} rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Type the assignment questions or instructions here..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Attach Document (Optional)</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all" />
              </div>
              <button disabled={submitting} type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-200 flex items-center justify-center min-w-[200px]">
                {submitting ? 'Creating...' : <>Upload Assignment <Send className="w-4 h-4 ml-2" /></>}
              </button>
            </form>
          </motion.div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-700 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-emerald-600" />
              {role === 'tutor' || role === 'admin' ? 'Recent Assignments' : 'Your Assignments'}
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
               <div className="p-12 text-center text-slate-400 font-medium">Loading assignments...</div>
            ) : assignments.length === 0 ? (
               <div className="p-12 text-center text-slate-400 font-medium">No assignments found.</div>
            ) : (
               assignments.map((assignment) => (
                 <div key={assignment._id} className="p-6 md:p-8 hover:bg-slate-50 transition-colors">
                    <div 
                      className="flex justify-between items-center cursor-pointer group"
                      onClick={() => toggleAccordion(assignment._id)}
                    >
                       <div>
                         <div className="flex items-center space-x-3 mb-2">
                           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">{assignment.course_code}</span>
                           <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{assignment.topic}</h3>
                         </div>
                         {assignment.deadline && (
                           <p className="text-xs font-semibold text-rose-500 mb-2">Deadline: {new Date(assignment.deadline).toLocaleString()}</p>
                         )}
                         <p className="text-slate-500 text-sm line-clamp-2 max-w-3xl">{assignment.question_text}</p>
                       </div>
                       <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                         {expandedAssignment === assignment._id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6"/>}
                       </div>
                    </div>

                    <AnimatePresence>
                      {expandedAssignment === assignment._id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-6"
                        >
                           <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                              <h4 className="font-bold text-slate-700 mb-3">Full Instructions:</h4>
                              <p className="text-slate-600 whitespace-pre-wrap mb-4">{assignment.question_text}</p>
                              {assignment.file_url && (
                                <a href={assignment.file_url} target="_blank" rel="noreferrer"
                                   className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-100 px-4 py-2 rounded-lg transition-colors">
                                  <FileText className="w-4 h-4 mr-2" /> View Attached Document
                                </a>
                              )}
                           </div>

                           {(role === 'tutor' || role === 'admin') ? (
                             <div className="mt-8">
                                <h4 className="font-bold text-slate-700 mb-4 border-b pb-2">Student Submissions</h4>
                                {!submissions[assignment._id] ? (
                                  <p className="text-slate-400 text-sm">Loading submissions...</p>
                                ) : submissions[assignment._id].length === 0 ? (
                                  <p className="text-slate-400 text-sm">No submissions yet.</p>
                                ) : (
                                  <div className="space-y-4">
                                    {submissions[assignment._id].map(sub => (
                                      <div key={sub._id} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start w-full">
                                         <div className="flex-1 w-full">
                                            <div className="flex items-center space-x-2 mb-2 text-sm text-slate-500 font-medium">
                                              <User className="w-4 h-4" />
                                              <span>Student: {sub.student_name || sub.student_id}</span>
                                            </div>
                                            <p className="text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm mb-3">{sub.answer_text}</p>
                                            
                                            {/* Graded Details */}
                                            {sub.score !== undefined ? (
                                              <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-xs">
                                                <div className="flex justify-between items-center mb-1 font-bold text-green-800">
                                                  <span>GRADED</span>
                                                  <span className="text-sm">{sub.score} / {sub.max_points || 100}</span>
                                                </div>
                                                {sub.feedback && <p className="text-slate-600 mt-1 italic">Feedback: "{sub.feedback}"</p>}
                                                {sub.graded_at && <p className="text-[10px] text-slate-400 mt-1">Graded on: {new Date(sub.graded_at).toLocaleString()}</p>}
                                                <button 
                                                  onClick={() => { setEditingSubmission(sub._id); setGradeScore(sub.score); setGradeMaxPoints(sub.max_points || 100); setGradeFeedback(sub.feedback || ''); }}
                                                  className="text-blue-600 hover:text-blue-800 font-bold mt-2 text-[10px] hover:underline"
                                                >
                                                  Update Grade
                                                </button>
                                              </div>
                                            ) : (
                                              editingSubmission !== sub._id && (
                                                <button 
                                                  onClick={() => { setEditingSubmission(sub._id); setGradeScore(''); setGradeMaxPoints(assignment.max_points || 100); setGradeFeedback(''); }}
                                                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-lg border border-blue-200 transition-colors"
                                                >
                                                  Grade Submission
                                                </button>
                                              )
                                            )}

                                            {/* Inline Grading Form */}
                                            {editingSubmission === sub._id && (
                                              <motion.form 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                onSubmit={(e) => handleGradeSubmit(sub._id, assignment._id, e)}
                                                className="mt-3 p-4 border border-blue-200 rounded-xl bg-blue-50/20 space-y-3"
                                              >
                                                <h5 className="text-xs font-bold text-blue-800 uppercase tracking-wider">Grade Assignment Submission</h5>
                                                <div className="flex gap-4">
                                                   <div>
                                                     <label className="block text-[10px] font-semibold text-slate-500 mb-1">Score</label>
                                                     <input 
                                                       type="number" 
                                                       step="any"
                                                       min="0"
                                                       required
                                                       value={gradeScore}
                                                       onChange={e => setGradeScore(e.target.value)}
                                                       className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white w-24"
                                                     />
                                                   </div>
                                                   <div>
                                                     <label className="block text-[10px] font-semibold text-slate-500 mb-1">Maximum Mark</label>
                                                     <input 
                                                       type="number" 
                                                       step="any"
                                                       min="0.1"
                                                       required
                                                       value={gradeMaxPoints}
                                                       onChange={e => setGradeMaxPoints(e.target.value)}
                                                       className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white w-24"
                                                     />
                                                   </div>
                                                 </div>
                                                <div>
                                                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Feedback</label>
                                                  <textarea 
                                                    rows="2"
                                                    value={gradeFeedback}
                                                    onChange={e => setGradeFeedback(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 outline-none bg-white resize-none"
                                                    placeholder="Provide feedback..."
                                                  />
                                                </div>
                                                <div className="flex gap-2 justify-end">
                                                  <button 
                                                    type="button"
                                                    onClick={() => { setEditingSubmission(null); setGradeScore(''); setGradeMaxPoints(''); setGradeFeedback(''); }}
                                                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors"
                                                  >
                                                    Cancel
                                                  </button>
                                                  <button 
                                                    type="submit"
                                                    disabled={gradingSubmitting}
                                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                                                  >
                                                    {gradingSubmitting ? 'Saving...' : 'Submit Grade'}
                                                  </button>
                                                </div>
                                              </motion.form>
                                            )}
                                         </div>
                                         {sub.file_url && (
                                            <a href={sub.file_url} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg transition-colors border border-emerald-100">
                                              <FileText className="w-4 h-4 mr-2" /> Attached Answer
                                            </a>
                                         )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                             </div>
                           ) : (
                              <div className="mt-8">
                               {(() => {
                                 const mySub = submissions[assignment._id]?.find(sub => sub.student_id === user_id);
                                 if (mySub) {
                                   const isGraded = mySub.score !== undefined;
                                   return (
                                     <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                                       <h4 className="font-bold text-slate-700 mb-4 border-b pb-2 flex justify-between items-center">
                                         <span>Your Submission</span>
                                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                           isGraded ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                         }`}>
                                           {isGraded ? 'Graded' : 'Pending Review'}
                                         </span>
                                       </h4>
                                       
                                       {isGraded && (
                                         <div className="mb-5 p-4 bg-green-50 rounded-xl border border-green-200">
                                           <div className="flex justify-between items-center mb-2">
                                             <span className="text-sm font-bold text-green-800">Score Awarded:</span>
                                             <span className="text-xl font-extrabold text-slate-800">{mySub.score} / {mySub.max_points || 100}</span>
                                           </div>
                                           {mySub.feedback && (
                                             <div className="mt-2 text-sm text-slate-700">
                                               <span className="font-bold text-slate-600">Tutor Feedback:</span>
                                               <p className="mt-1 italic text-slate-600">"{mySub.feedback}"</p>
                                             </div>
                                           )}
                                         </div>
                                       )}
                                       
                                       <div className="space-y-3 text-sm">
                                         <div>
                                           <span className="font-semibold text-slate-500">Your Answer:</span>
                                           <p className="mt-1 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-wrap">{mySub.answer_text || "No written answer provided."}</p>
                                         </div>
                                         {mySub.file_url && (
                                           <div className="pt-2">
                                             <a href={mySub.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg transition-colors border border-emerald-100">
                                               <FileText className="w-4 h-4 mr-2" /> View Attached Answer Document
                                             </a>
                                           </div>
                                         )}
                                         <p className="text-[11px] text-slate-400">Submitted on: {new Date(mySub.submitted_at).toLocaleString()}</p>
                                       </div>
                                     </div>
                                   );
                                 }

                                 // Fallback to submission form
                                 return (
                                   <>
                                     <h4 className="font-bold text-slate-700 mb-4 border-b pb-2">Submit Your Answer</h4>
                                     {assignment.deadline && new Date() > new Date(assignment.deadline) ? (
                                        <p className="text-rose-500 font-bold p-4 bg-rose-50 rounded-xl border border-rose-100">
                                          The deadline for this assignment has passed. Submissions are closed.
                                        </p>
                                     ) : (
                                     <form onSubmit={(e) => handleStudentSubmit(assignment._id, e)} className="space-y-5">
                                        <div>
                                          <textarea value={answeringFor === assignment._id ? answerText : ''} onChange={e => { setAnswerText(e.target.value); setAnsweringFor(assignment._id); }} rows="4"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200  focus:ring-emerald-500 outline-none transition-all resize-none shadow-sm"
                                            placeholder="Write your answer here... (Optional if attaching a file)" />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-semibold text-slate-600 mb-2">Attach File (Optional)</label>
                                          <input type="file" onChange={e => setAnswerFile(e.target.files[0])} accept=".pdf,.doc,.docx"
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-all cursor-pointer" />
                                        </div>
                                        <button disabled={submitting} type="submit"
                                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-200 flex items-center">
                                          {submitting ? 'Submitting...' : <>Submit Answer <Send className="w-4 h-4 ml-2" /></>}
                                        </button>
                                     </form>
                                     )}
                                   </>
                                 );
                               })()}
                              </div>
                           )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               ))
            )}
          </div>
        </div>
    </div>
  );
}

export default Assignment;