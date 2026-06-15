import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, BookOpen, Globe, Layers, Clock, Users, FileText, CloudUpload, X, CheckCircle2, ChevronRight } from 'lucide-react';

const CATEGORIES = ['French', 'Spanish', 'German', 'Yoruba', 'Igbo', 'Hausa', 'English'];


function AddCourse() {
  const [form, setForm] = useState({
    title: '',
    code: '',
    category: '',
    level: '',
    duration: '',
    maxCapacity: '',
    description: '',
  });

 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };





 


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.code || !form.category || !form.level) {
      setError('Please fill in all required fields (Course Title, Code, Category, and Level).');
      return;
    }

    setLoading(true);
    setError('');

    // Mock API call delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setForm({
      title: '',
      code: '',
      category: '',
      level: '',
      duration: '',
      maxCapacity: '',
      description: '',
    });
    setCoverImage(null);
    setCoverPreview(null);
    setSuccess(false);
  };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
          <PlusCircle className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Add New Course</h1>
          <p className="text-slate-500 text-sm">Create and register a new curriculum course on Lextorah</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form-container"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12"
          >
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              

              {/* Core Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-slate-400" /> Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="Title of the course"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-slate-400" /> Course Code *
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    required
                    placeholder="e.g. SPA/A1/WD/155"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
          

              {/* Form Buttons */}
              <div className="flex gap-4 pt-4 border-t border-slate-100 justify-end">

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center min-w-[160px] disabled:bg-blue-400"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    'Create Course'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center"
          >
            <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 inline-block mb-6 shadow-inner">
              <CheckCircle2 className="w-16 h-16" />
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Course Created Successfully!</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              The new course <strong>{form.title}</strong> ({form.code}) has been registered and is ready for curriculum setup.
            </p>

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 text-left max-w-xl mx-auto mb-8 space-y-3">
              <div className="grid grid-cols-2 text-sm gap-2">
                <span className="text-slate-400 font-semibold">Course Code:</span>
                <span className="text-slate-700 font-bold">{form.code}</span>
                
                <span className="text-slate-400 font-semibold">Category/Language:</span>
                <span className="text-slate-700 font-bold">{form.category}</span>
                
                <span className="text-slate-400 font-semibold">Course Level:</span>
                <span className="text-slate-700 font-bold">{form.level}</span>

                {form.duration && (
                  <>
                    <span className="text-slate-400 font-semibold">Duration:</span>
                    <span className="text-slate-700 font-bold">{form.duration} Weeks</span>
                  </>
                )}

                {form.maxCapacity && (
                  <>
                    <span className="text-slate-400 font-semibold">Max Student Capacity:</span>
                    <span className="text-slate-700 font-bold">{form.maxCapacity} Students</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={resetForm}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 inline-flex items-center"
            >
              Create Another Course <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddCourse;
