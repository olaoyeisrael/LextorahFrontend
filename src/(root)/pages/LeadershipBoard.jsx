// import React, { useState } from 'react';
// import { 
//   Users, Activity, Clock, ShieldAlert, Award, 
//   TrendingUp, Download, Search, AlertTriangle, 
//   CheckCircle, HelpCircle, FileText, ChevronRight,
//   TrendingDown, Sparkles
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// // Mock Data representing the school state
// const MOCK_STATS = {
//   totalStudents: 1240,
//   activeUsers: 890,
//   learningHours: 5420,
//   aiSessions: 18450,
//   engagementScore: 88, // %
//   improvementScore: 12.4, // % increase
//   studentsNeedingSupport: 42,
//   aiInsights: [
//     "Grade 10 Grammar Mastery has increased by 14% since Ms. Lexi's revision prompts were enabled.",
//     "Student engagement peaks between 4:00 PM and 7:00 PM daily. Consider setting tasks during this window.",
//     "42 students in German A1 are falling below the recommended 2-hour per week active learning threshold."
//   ]
// };

// const MOCK_CLASSES = [
//   { className: 'Grade 9 - German A1', teacher: 'Mrs. Taylor', students: 30, avgEngagement: 85, progress: 68 },
//   { className: 'Grade 10 - German A2', teacher: 'Mrs. Taylor', students: 28, avgEngagement: 92, progress: 74 },
//   { className: 'Grade 11 - French B1', teacher: 'Mr. Pierre', students: 25, avgEngagement: 78, progress: 61 },
//   { className: 'Grade 12 - Spanish A1', teacher: 'Ms. Maria', students: 22, avgEngagement: 89, progress: 80 },
//   { className: 'Grade 10 - Spanish A2', teacher: 'Ms. Maria', students: 24, avgEngagement: 64, progress: 52 },
// ];

// const MOCK_RISK_STUDENTS = [
//   { name: 'John Doe', class: 'Grade 10 - Spanish A2', score: 45, status: 'Intervention Required', lastActive: '5 days ago' },
//   { name: 'Emma Wilson', class: 'Grade 11 - French B1', score: 58, status: 'Needs Attention', lastActive: '3 days ago' },
//   { name: 'David Smith', class: 'Grade 10 - Spanish A2', score: 48, status: 'Intervention Required', lastActive: '4 days ago' },
//   { name: 'Sophia Brown', class: 'Grade 9 - German A1', score: 62, status: 'Needs Attention', lastActive: '2 days ago' },
//   { name: 'Oliver Miller', class: 'Grade 12 - Spanish A1', score: 94, status: 'On Track', lastActive: '2 hours ago' },
//   { name: 'Isabella Davis', class: 'Grade 10 - German A2', score: 88, status: 'On Track', lastActive: '1 day ago' },
// ];

// const MOCK_SKILL_GROWTH = [
//   { skill: 'Vocabulary', score: 84 },
//   { skill: 'Grammar', score: 72 },
//   { skill: 'Writing', score: 68 },
//   { skill: 'Speaking', score: 75 },
//   { skill: 'Listening', score: 81 },
// ];

// const MOCK_DAILY_ENGAGEMENT = [
//   { day: 'Mon', sessions: 2100 },
//   { day: 'Tue', sessions: 2450 },
//   { day: 'Wed', sessions: 2700 },
//   { day: 'Thu', sessions: 2300 },
//   { day: 'Fri', sessions: 1900 },
//   { day: 'Sat', sessions: 1200 },
//   { day: 'Sun', sessions: 1400 },
// ];

// function LeadershipBoard() {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [classFilter, setClassFilter] = useState('');
  
//   // Exporter handlers
//   const handleExportCSV = (reportType) => {
//     let csvContent = "data:text/csv;charset=utf-8,";
    
//     if (reportType === 'school') {
//       csvContent += "Metric,Value\r\n";
//       csvContent += `Total Students Enrolled,${MOCK_STATS.totalStudents}\r\n`;
//       csvContent += `Active Users,${MOCK_STATS.activeUsers}\r\n`;
//       csvContent += `Learning Hours,${MOCK_STATS.learningHours}\r\n`;
//       csvContent += `AI Sessions,${MOCK_STATS.aiSessions}\r\n`;
//       csvContent += `Engagement Score,${MOCK_STATS.engagementScore}%\r\n`;
//       csvContent += `Improvement Score,+${MOCK_STATS.improvementScore}%\r\n`;
//     } else if (reportType === 'classes') {
//       csvContent += "Class Name,Teacher,Students,Avg Engagement (%),Progress (%)\r\n";
//       MOCK_CLASSES.forEach(c => {
//         csvContent += `"${c.className}","${c.teacher}",${c.students},${c.avgEngagement},${c.progress}\r\n`;
//       });
//     } else {
//       csvContent += "Student Name,Class,Score (%),Status,Last Active\r\n";
//       MOCK_RISK_STUDENTS.forEach(s => {
//         csvContent += `"${s.name}","${s.class}",${s.score},"${s.status}","${s.lastActive}"\r\n`;
//       });
//     }

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `lextorah_${reportType}_report.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleExportPDF = () => {
//     // Elegant system print dialog layout
//     window.print();
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-8 px-4 font-sans print:p-0">
      
//       {/* Title Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 print:hidden">
//         <div>
//           <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
//             School Leadership Board
//           </h1>
//           <p className="text-slate-500 font-medium">Real-time educational analytics & school-wide performance reporting.</p>
//         </div>
//         <button
//           onClick={handleExportPDF}
//           className="flex items-center gap-2 bg-[#061B4A] hover:bg-[#0c2e74] text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md text-sm shrink-0"
//         >
//           <Download className="w-4 h-4" />
//           Export Dashboard PDF
//         </button>
//       </div>

//       {/* Tabs navigation */}
//       <div className="flex gap-2 border-b border-slate-200 pb-px overflow-x-auto mb-8 print:hidden scrollbar-none">
//         {[
//           { id: 'overview', label: 'Executive Overview' },
//           { id: 'engagement', label: 'Student Engagement' },
//           { id: 'progress', label: 'Learning Progress' },
//           { id: 'classes', label: 'Class & Teacher' },
//           { id: 'risk', label: 'Student Risk Alert' },
//           { id: 'exports', label: 'Reports & Exports' }
//         ].map(tab => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`whitespace-nowrap pb-3.5 px-4 font-bold text-sm transition-all border-b-2 outline-none ${
//               activeTab === tab.id 
//                 ? 'border-[#061B4A] text-[#061B4A]' 
//                 : 'border-transparent text-slate-400 hover:text-slate-600'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Overview Tab Content */}
//       {activeTab === 'overview' && (
//         <div className="space-y-8 animate-fadeIn">
//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
//             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
//               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
//                 <Users className="w-6 h-6" />
//               </div>
//               <div>
//                 <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Total Enrolled</span>
//                 <span className="text-2xl font-extrabold text-slate-800">{MOCK_STATS.totalStudents}</span>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
//               <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
//                 <Activity className="w-6 h-6 animate-pulse" />
//               </div>
//               <div>
//                 <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Active Users</span>
//                 <span className="text-2xl font-extrabold text-slate-800">{MOCK_STATS.activeUsers}</span>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
//               <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
//                 <Clock className="w-6 h-6" />
//               </div>
//               <div>
//                 <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Learning Hours</span>
//                 <span className="text-2xl font-extrabold text-slate-800">{MOCK_STATS.learningHours} hrs</span>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
//               <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0">
//                 <ShieldAlert className="w-6 h-6" />
//               </div>
//               <div>
//                 <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Risk Level</span>
//                 <span className="text-2xl font-extrabold text-slate-800">{MOCK_STATS.studentsNeedingSupport} Need Intervention</span>
//               </div>
//             </div>

//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* AI Insights Panel */}
//             <div className="bg-gradient-to-br from-[#061B4A] to-[#122b68] text-white p-8 rounded-3xl shadow-xl lg:col-span-2 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
//                   <h2 className="text-xl font-bold">AI Leadership Insights from Ms. Lexi</h2>
//                 </div>
//                 <div className="space-y-4 my-6">
//                   {MOCK_STATS.aiInsights.map((insight, idx) => (
//                     <div key={idx} className="flex gap-3 items-start bg-white/10 p-4 rounded-xl border border-white/5">
//                       <ChevronRight className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
//                       <p className="text-sm font-medium text-white/90">{insight}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="text-xs text-white/50 border-t border-white/10 pt-4 mt-2">
//                 Insights generated automatically using student activity telemetry.
//               </div>
//             </div>

//             {/* Engagement Doughnut representation */}
//             <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
//               <h2 className="text-lg font-bold text-slate-800">Engagement Metrics</h2>
              
//               <div className="relative w-40 h-40 mx-auto my-6 flex items-center justify-center">
//                 <svg className="w-full h-full transform -rotate-90">
//                   <circle cx="80" cy="80" r="70" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
//                   <circle cx="80" cy="80" r="70" stroke="#061B4A" strokeWidth="12" fill="transparent" 
//                     strokeDasharray={440} strokeDashoffset={440 - (440 * MOCK_STATS.engagementScore) / 100}
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div className="absolute text-center">
//                   <span className="text-3xl font-black text-slate-800">{MOCK_STATS.engagementScore}%</span>
//                   <span className="text-xs text-slate-400 font-bold block uppercase mt-0.5">Score</span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
//                 <div className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-emerald-600" />
//                   <span className="text-sm font-bold text-slate-700">Improvement Trend</span>
//                 </div>
//                 <span className="text-sm font-extrabold text-emerald-600">+{MOCK_STATS.improvementScore}%</span>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}

//       {/* Engagement Analytics Tab */}
//       {activeTab === 'engagement' && (
//         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fadeIn">
//           <h2 className="text-xl font-bold text-slate-800 mb-6">Activity Trends (Daily AI Sessions)</h2>
          
//           {/* Custom SVG Line / Bar Chart */}
//           <div className="w-full h-64 flex items-end justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
//             {MOCK_DAILY_ENGAGEMENT.map((data, idx) => {
//               const maxVal = 3000;
//               const heightPct = (data.sessions / maxVal) * 100;
//               return (
//                 <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
//                   <span className="text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white px-2 py-0.5 rounded shadow">
//                     {data.sessions}
//                   </span>
//                   <div 
//                     style={{ height: `${heightPct}%` }}
//                     className="w-full bg-[#061B4A]/10 group-hover:bg-[#061B4A] rounded-t-lg transition-all duration-300 cursor-pointer"
//                   />
//                   <span className="text-xs font-bold text-slate-400 mt-1">{data.day}</span>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//             <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//               <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Peak Usage Period</span>
//               <span className="text-lg font-bold text-slate-800 block mt-1">4:00 PM - 7:00 PM</span>
//             </div>
//             <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//               <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Avg Session Duration</span>
//               <span className="text-lg font-bold text-slate-800 block mt-1">18.5 Minutes</span>
//             </div>
//             <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
//               <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Weekly Activity</span>
//               <span className="text-lg font-bold text-slate-800 block mt-1">84% Engagement Ratio</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Learning Progress Tab */}
//       {activeTab === 'progress' && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          
//           {/* Skill development panel */}
//           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
//             <h2 className="text-xl font-bold text-slate-800 mb-6">Skill Growth tracking</h2>
//             <div className="space-y-5">
//               {MOCK_SKILL_GROWTH.map((skill, idx) => (
//                 <div key={idx} className="space-y-2">
//                   <div className="flex justify-between items-center text-sm font-bold">
//                     <span className="text-slate-700">{skill.skill}</span>
//                     <span className="text-slate-500">{skill.score}% Proficiency</span>
//                   </div>
//                   <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
//                     <div 
//                       style={{ width: `${skill.score}%` }} 
//                       className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Topic Mastery list */}
//           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
//             <h2 className="text-lg font-bold text-slate-800 mb-6">Topic Mastery</h2>
//             <div className="space-y-4">
//               {[
//                 { name: 'Vocabulary drills', level: 88, status: 'Mastered' },
//                 { name: 'German Conjugation', level: 64, status: 'Needs practice' },
//                 { name: 'Speaking workouts', level: 75, status: 'Proficient' },
//                 { name: 'Listening transcripts', level: 82, status: 'Proficient' }
//               ].map((topic, idx) => (
//                 <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
//                   <div>
//                     <h4 className="text-sm font-bold text-slate-700">{topic.name}</h4>
//                     <span className="text-xs font-semibold text-slate-400">{topic.status}</span>
//                   </div>
//                   <span className="text-sm font-extrabold text-[#061B4A]">{topic.level}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       )}

//       {/* Class & Teacher Tab */}
//       {activeTab === 'classes' && (
//         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-fadeIn">
//           <h2 className="text-xl font-bold text-slate-800 mb-6">Class Comparisons</h2>
          
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
//                   <th className="py-4 px-4">Class</th>
//                   <th className="py-4 px-4">Teacher</th>
//                   <th className="py-4 px-4">Students</th>
//                   <th className="py-4 px-4">Avg Engagement</th>
//                   <th className="py-4 px-4">Course Progress</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-700">
//                 {MOCK_CLASSES.map((c, idx) => (
//                   <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
//                     <td className="py-4 px-4 font-bold">{c.className}</td>
//                     <td className="py-4 px-4 text-slate-500">{c.teacher}</td>
//                     <td className="py-4 px-4 font-bold">{c.students}</td>
//                     <td className="py-4 px-4">
//                       <div className="flex items-center gap-2">
//                         <span className="font-extrabold text-[#061B4A]">{c.avgEngagement}%</span>
//                         <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
//                           <div style={{ width: `${c.avgEngagement}%` }} className="bg-emerald-500 h-full rounded-full" />
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-4">
//                       <span className="font-extrabold">{c.progress}%</span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Risk Dashboard Tab */}
//       {activeTab === 'risk' && (
//         <div className="space-y-6 animate-fadeIn">
//           <div className="flex items-center justify-between gap-4 flex-wrap">
//             <div className="flex gap-2 max-w-sm flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 items-center">
//               <Search className="w-4 h-4 text-slate-400" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 placeholder="Search students..."
//                 className="bg-transparent border-none outline-none text-sm font-medium placeholder:text-slate-400 w-full"
//               />
//             </div>
            
//             <select
//               value={classFilter}
//               onChange={e => setClassFilter(e.target.value)}
//               className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 outline-none"
//             >
//               <option value="">All Classes</option>
//               <option value="Spanish">Spanish</option>
//               <option value="German">German</option>
//               <option value="French">French</option>
//             </select>
//           </div>

//           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
//                     <th className="py-4 px-4">Student</th>
//                     <th className="py-4 px-4">Class</th>
//                     <th className="py-4 px-4">Progress Score</th>
//                     <th className="py-4 px-4">Risk Tier</th>
//                     <th className="py-4 px-4">Last Activity</th>
//                     <th className="py-4 px-4 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-700">
//                   {MOCK_RISK_STUDENTS
//                     .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
//                     .filter(s => !classFilter || s.class.includes(classFilter))
//                     .map((student, idx) => (
//                       <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
//                         <td className="py-4 px-4 font-bold">{student.name}</td>
//                         <td className="py-4 px-4 text-slate-500">{student.class}</td>
//                         <td className="py-4 px-4 font-bold">{student.score}%</td>
//                         <td className="py-4 px-4">
//                           <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                             student.status === 'Intervention Required' 
//                               ? 'bg-red-50 text-red-600 border border-red-100'
//                               : student.status === 'Needs Attention'
//                               ? 'bg-amber-50 text-amber-600 border border-amber-100'
//                               : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
//                           }`}>
//                             {student.status}
//                           </span>
//                         </td>
//                         <td className="py-4 px-4 text-slate-400 text-xs">{student.lastActive}</td>
//                         <td className="py-4 px-4 text-right">
//                           <button
//                             onClick={() => alert(`Sent intervention reminder to ${student.name}`)}
//                             className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all"
//                           >
//                             Intervene
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Reports & Exports Tab */}
//       {activeTab === 'exports' && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
          
//           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-72">
//             <div>
//               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
//                 <FileText className="w-6 h-6" />
//               </div>
//               <h3 className="text-lg font-bold text-slate-800">School Performance Report</h3>
//               <p className="text-slate-500 text-xs mt-2 leading-relaxed">Download a comprehensive PDF containing total hours, sessions, user ratios, and executive alerts.</p>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => handleExportCSV('school')} className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all text-slate-700">
//                 CSV Format
//               </button>
//               <button onClick={handleExportPDF} className="flex-1 py-3 bg-[#061B4A] hover:bg-[#0c2e74] text-white font-bold rounded-xl text-xs transition-all">
//                 Print Report
//               </button>
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-72">
//             <div>
//               <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
//                 <FileText className="w-6 h-6" />
//               </div>
//               <h3 className="text-lg font-bold text-slate-800">Class Progress Report</h3>
//               <p className="text-slate-500 text-xs mt-2 leading-relaxed">Download curriculum progress scores, topic mastery distributions, and class teacher details.</p>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => handleExportCSV('classes')} className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all text-slate-700">
//                 CSV Format
//               </button>
//               <button onClick={handleExportPDF} className="flex-1 py-3 bg-[#061B4A] hover:bg-[#0c2e74] text-white font-bold rounded-xl text-xs transition-all">
//                 Print Report
//               </button>
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-72">
//             <div>
//               <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
//                 <FileText className="w-6 h-6" />
//               </div>
//               <h3 className="text-lg font-bold text-slate-800">Risk Assessment Report</h3>
//               <p className="text-slate-500 text-xs mt-2 leading-relaxed">Export a comprehensive log list of all disengaged or lagging students requiring teachers' focus.</p>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => handleExportCSV('risk')} className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 font-bold rounded-xl text-xs transition-all text-slate-700">
//                 CSV Format
//               </button>
//               <button onClick={handleExportPDF} className="flex-1 py-3 bg-[#061B4A] hover:bg-[#0c2e74] text-white font-bold rounded-xl text-xs transition-all">
//                 Print Report
//               </button>
//             </div>
//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// export default LeadershipBoard;
import React from 'react'

function LeadershipBoard() {
  return (
    <div>Work in progress</div>
  )
}

export default LeadershipBoard