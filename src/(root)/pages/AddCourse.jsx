import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, BookOpen, Globe, Layers, Clock, Users, FileText, CheckCircle2, ChevronRight, Trash2, Loader2 } from 'lucide-react';
import { apiClient } from '../../utils/api';
import { useDetailedCoursesQuery, useDeleteCourseMutation } from '../../utils/queries';

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

  const { data: courses = [], isLoading: loadingCourses, refetch: refetchCourses } = useDetailedCoursesQuery();
  const deleteCourseMutation = useDeleteCourseMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.code || !form.category || !form.level) {
      setError('Please fill in all required fields (Course Title, Code, Category, and Level).');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await apiClient('/api/courses', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setSuccess(true);
        refetchCourses(); // Update list immediately
      } else {
        const errData = await res.json();
        setError(errData.detail || 'Failed to create course. Please try again.');
      }
    } catch (err) {
      console.error('Error creating course:', err);
      setError('Connection to course server failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = (code) => {
    if (window.confirm(`Are you sure you want to delete the course template '${code}'?`)) {
      deleteCourseMutation.mutate(code, {
        onSuccess: () => {
          refetchCourses();
        },
        onError: (err) => {
          alert(err.message || 'Failed to delete course template.');
        }
      });
    }
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
    setSuccess(false);
  };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto font-Mada">
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
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 mb-10"
          >
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Core Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Title */}
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>

                {/* Course Code */}
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-slate-400" /> Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    placeholder="Select Category"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>

                {/* Course Level */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-slate-400" /> Course Level *
                  </label>
                  <input
                    type="text"
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    required
                    placeholder="e.g. A1, Intermediate"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>

              {/* Optional Fields Accordion */}
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                  Optional Pacing details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" /> Duration (Weeks)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
                    />
                  </div>

                  {/* Max Capacity */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-slate-400" /> Max Student Capacity
                    </label>
                    <input
                      type="number"
                      name="maxCapacity"
                      value={form.maxCapacity}
                      onChange={handleChange}
                      placeholder="e.g. 50"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-slate-400" /> Course Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter brief description of course objectives..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700 resize-none"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Creating...' : 'Create Course Template'}
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
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center mb-10"
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

      {/* Course Templates List */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Registered Course Templates
        </h2>

        {loadingCourses ? (
          <div className="flex justify-center items-center py-12 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mr-2" /> Loading templates...
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 border-dashed text-slate-400">
            No course templates registered yet. Create one above to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-sm font-bold">
                  <th className="pb-4 pr-4">Course Code</th>
                  <th className="pb-4 px-4">Title</th>
                  <th className="pb-4 px-4">Category</th>
                  <th className="pb-4 px-4">Level</th>
                  <th className="pb-4 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                {courses.map((course) => (
                  <tr key={course.id || course.course_code} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 pr-4 font-bold text-slate-850 font-mono">{course.course_code}</td>
                    <td className="py-4 px-4 font-semibold">{course.title}</td>
                    <td className="py-4 px-4">{course.category}</td>
                    <td className="py-4 px-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold border border-slate-200">
                        {course.level}
                      </span>
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <button
                        onClick={() => handleDeleteCourse(course.course_code)}
                        className="p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-colors inline-flex items-center"
                        title="Delete Course Template"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCourse;