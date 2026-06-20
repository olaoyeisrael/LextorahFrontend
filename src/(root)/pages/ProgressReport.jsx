import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Loader, Calendar, AlertCircle } from 'lucide-react';
import { apiClient } from '../../utils/api';
import { COURSE_CODES } from '../../utils/courseData';

export default function ProgressReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [dbCourseCodes, setDbCourseCodes] = useState([]);

  // Fetch dynamic course codes from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient('/api/courses');
        if (res.ok) {
          const data = await res.json();
          setDbCourseCodes(data);
        }
      } catch (err) {
        console.error("Failed to fetch database courses", err);
      }
    };
    fetchCourses();
  }, []);

  const activeCodes = dbCourseCodes.length > 0 ? dbCourseCodes : COURSE_CODES;

  
  // Default range: First day of current month to today
  const today = new Date().toISOString().split('T')[0];
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
  
  const [form, setForm] = useState({
    fromDate: firstDayOfMonth,
    toDate: today,
    classCode: 'All Classes'
  });

  // Fetch reports on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await apiClient('/api/reports');
        if (res.ok) {
          const data = await res.json();
          setReports(data);
        } else {
          setError('Failed to fetch recent reports.');
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Could not establish connection to reports server.');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!form.fromDate || !form.toDate) {
      setError('Please select both From and To dates.');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      const res = await apiClient('/api/reports/generate', {
        method: 'POST',
        body: JSON.stringify({
          from_date: form.fromDate,
          to_date: form.toDate,
          class_code: form.classCode
        })
      });

      if (res.ok) {
        const newReport = await res.json();
        // Add new report at the top of the list
        setReports((prev) => [newReport, ...prev]);
      } else {
        const errData = await res.json();
        setError(errData.detail || 'Failed to generate progress report.');
      }
    } catch (err) {
      console.error('Error generating report:', err);
      setError('An error occurred during report generation.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async (reportId, reportTitle) => {
    try {
      const response = await apiClient(`/api/reports/download/${reportId}`);
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${reportTitle.replace(/\s+/g, '_').toLowerCase()}_${reportId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        alert("Failed to download PDF report.");
      }
    } catch (err) {
      console.error("Download error", err);
      alert("An error occurred while downloading the PDF.");
    }
  };

  // Sort course codes alphabetically
  const sortedClasses = React.useMemo(() => {
    return [...activeCodes].sort();
  }, [activeCodes]);

  // Map category code to background styles
  const getCategoryTag = (type) => {
    switch (type) {
      case 'Risk':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      case 'Activity':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'Materials':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'Performance':
      default:
        return 'bg-blue-50 text-blue-600 border border-blue-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-Inter">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Progress Reports</h1>
        <p className="text-slate-500 text-sm mt-1">Generate and download academy reports.</p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center space-x-3 text-rose-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Generate New Report Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-800 mb-6">Generate New Report</h2>
        
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* From Date */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> From Date
            </label>
            <input 
              type="date"
              name="fromDate"
              value={form.fromDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium transition-all"
            />
          </div>

          {/* To Date */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> To Date
            </label>
            <input 
              type="date"
              name="toDate"
              value={form.toDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium transition-all"
            />
          </div>

          {/* Class Code */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Class
            </label>
            <select
              name="classCode"
              value={form.classCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium bg-white transition-all"
            >
              <option value="All Classes">All Classes</option>
              {sortedClasses.map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={generating}
            className="w-full bg-[#1D4ED8] hover:bg-[#1e40af] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-2 hover:shadow-lg disabled:bg-blue-400 disabled:shadow-none"
          >
            {generating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Generate Report</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Recent Reports List Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-bold text-slate-800 px-1">Recent Reports</h2>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center space-y-3">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-slate-400 text-sm">Loading recent reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-200" />
              <p className="font-semibold text-slate-700 mb-1">No Reports Generated Yet</p>
              <p className="text-sm">Select dates and click Generate Report above to create your first report.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {/* Rounded Blue Box with File Icon */}
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                        {report.title}
                      </h3>
                      <div className="flex items-center flex-wrap gap-2 mt-1">
                        <span className="text-xs text-slate-400 font-medium">
                          {report.from_date} to {report.to_date}
                        </span>
                        <span className="text-[10px] font-bold text-slate-300">•</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${getCategoryTag(report.type)}`}>
                          {report.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button 
                    onClick={() => handleDownload(report.id, report.title)}
                    className="self-start sm:self-auto flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-bold transition-all px-4 py-2 hover:bg-blue-50/50 rounded-xl"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
