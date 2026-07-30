import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, Award, TrendingUp, BarChart3, Search, 
  ChevronDown, Bell, Settings, ArrowUp, ArrowDown, 
  Sparkles, Filter, Check, Crown, Trophy, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Complete Mock Data representing the students
const ALL_STUDENTS = [
  {
    rank: 1,
    name: "Fatima Abdullahi",
    class: "SS 3A",
    avatar: "FA",
    subjects: ["Mathematics", "French"],
    avgScore: 94.2,
    atRisk: false,
    attendance: 98,
    trend: "up",
    badge: "Top Performer"
  },
  {
    rank: 2,
    name: "Ibrahim Musa",
    class: "SS 3B",
    avatar: "IM",
    subjects: ["Mathematics", "Further Mathematics"],
    avgScore: 91.8,
    atRisk: false,
    attendance: 95,
    trend: "up",
    badge: "Consistent Learner"
  },
  {
    rank: 3,
    name: "Ngozi Nwosu",
    class: "SS 2A",
    avatar: "NN",
    subjects: ["Biology", "Chemistry"],
    avgScore: 89.5,
    atRisk: false,
    attendance: 92,
    trend: "up",
    badge: "Science Champion"
  },
  {
    rank: 4,
    name: "Adebayo Johnson",
    class: "SS 3A",
    avatar: "AJ",
    subjects: ["Economics", "Government", "English"],
    avgScore: 87.3,
    atRisk: false,
    attendance: 90,
    trend: "up",
    badge: "Most Improved"
  },
  {
    rank: 5,
    name: "Chidinma Eze",
    class: "JSS 2A",
    avatar: "CE",
    subjects: ["Mathematics", "English", "Basic Science"],
    avgScore: 76.5,
    atRisk: true,
    attendance: 55,
    trend: "down",
    badge: null
  },
  {
    rank: 6,
    name: "Emeka Okafor",
    class: "JSS 3B",
    avatar: "EO",
    subjects: ["Mathematics", "English", "Social Studies"],
    avgScore: 68.2,
    atRisk: true,
    attendance: 48,
    trend: "down",
    badge: null
  },
  {
    rank: 7,
    name: "Amina Bello",
    class: "SS 1A",
    avatar: "AB",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    avgScore: 85.7,
    atRisk: false,
    attendance: 93,
    trend: "up",
    badge: "Rising Star"
  },
  {
    rank: 8,
    name: "Olumide Adeyemi",
    class: "SS 2B",
    avatar: "OA",
    subjects: ["Literature", "English", "History"],
    avgScore: 82.4,
    atRisk: false,
    attendance: 88,
    trend: "dash",
    badge: "Creative Writer"
  },
  {
    rank: 9,
    name: "Zainab Yusuf",
    class: "JSS 3A",
    avatar: "ZY",
    subjects: ["Mathematics", "English", "Agricultural Science"],
    avgScore: 79.8,
    atRisk: false,
    attendance: 91,
    trend: "dash",
    badge: "Consistent Performer"
  },
  {
    rank: 10,
    name: "Tunde Bakare",
    class: "SS 1B",
    avatar: "TB",
    subjects: ["Economics", "Commerce", "Mathematics"],
    avgScore: 81.1,
    atRisk: false,
    attendance: 89,
    trend: "up",
    badge: "Business Mind"
  }
];

const CLASSES = ["All Classes", "SS 3A", "SS 3B", "SS 2A", "SS 2B", "SS 1A", "SS 1B", "JSS 3A", "JSS 3B", "JSS 2A"];
const SUBJECTS = [
  "All Subjects", "Mathematics", "French", "Biology", "Chemistry", 
  "Economics", "Government", "English", "Basic Science", 
  "Social Studies", "Physics", "Literature", "History", 
  "Agricultural Science", "Commerce", "Further Mathematics"
];
const TERMS = ["All Terms", "1st Term", "2nd Term", "3rd Term"];

function LeadershipBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTerm, setSelectedTerm] = useState("All Terms");
  
  // Custom dropdown open states
  const [classOpen, setClassOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);

  // Tooltip states for SVG charts
  const [barTooltip, setBarTooltip] = useState(null);
  const [trendTooltip, setTrendTooltip] = useState(null);
  const [classBarTooltip, setClassBarTooltip] = useState(null);

  // Refs for closing dropdowns when clicking outside
  const classRef = useRef(null);
  const subjectRef = useRef(null);
  const termRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (classRef.current && !classRef.current.contains(event.target)) setClassOpen(false);
      if (subjectRef.current && !subjectRef.current.contains(event.target)) setSubjectOpen(false);
      if (termRef.current && !termRef.current.contains(event.target)) setTermOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter students based on state
  const filteredStudents = ALL_STUDENTS.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Class filter (e.g. "SS 3" filters both SS 3A and SS 3B, or specific match)
    let matchesClass = true;
    if (selectedClass !== "All Classes") {
      matchesClass = student.class === selectedClass || student.class.startsWith(selectedClass);
    }

    // Subject filter
    const matchesSubject = selectedSubject === "All Subjects" || student.subjects.includes(selectedSubject);

    return matchesSearch && matchesClass && matchesSubject;
  });

  // Sort filtered students by average score descending
  const sortedStudents = [...filteredStudents].sort((a, b) => b.avgScore - a.avgScore);

  // Partition into Top 3 and Rest
  const topThree = sortedStudents.slice(0, 3);
  const remainingTable = sortedStudents.slice(3);

  // Stats computation based on filtered data
  const totalStudentsFiltered = filteredStudents.length;
  const topPerformerFiltered = sortedStudents[0]?.name || "N/A";
  const classAvgFiltered = filteredStudents.length 
    ? (filteredStudents.reduce((sum, s) => sum + s.avgScore, 0) / filteredStudents.length).toFixed(1) + "%"
    : "N/A";
  
  const mostImprovedStudent = filteredStudents.find(s => s.badge === "Most Improved")?.name || "Adebayo Johnson";

  // Helper function to build custom SVG paths for rounded top rectangles
  const getRoundedTopPath = (x, y, width, height, radius) => {
    const r = Math.min(radius, height, width / 2);
    return `
      M ${x} ${y + height}
      L ${x} ${y + r}
      Q ${x} ${y} ${x + r} ${y}
      L ${x + width - r} ${y}
      Q ${x + width} ${y} ${x + width} ${y + r}
      L ${x + width} ${y + height}
      Z
    `;
  };

  return (
    <div className="font-sans text-slate-800 space-y-6">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
            School Leaderboard Dashboard
            <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-400" />
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium">
            Student performance rankings and achievements across the academy
          </p>
        </div>
        
        {/* Mock Header Controls (Bell, Cog, Profile) to match design */}

      </div>

      {/* 2. Key Metrics Grid (Stats Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Students Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Total Students</span>
            <span className="text-2xl font-extrabold text-slate-900">
              {totalStudentsFiltered.toLocaleString()}
            </span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Top Performer Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1 max-w-[70%]">
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Top Performer</span>
            <span className="text-base md:text-lg font-extrabold text-slate-900 truncate block">
              {topPerformerFiltered}
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shrink-0">
            <Crown className="w-6 h-6 fill-amber-400" />
          </div>
        </div>

        {/* Class Average Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Class Average</span>
            <span className="text-2xl font-extrabold text-slate-900">
              {classAvgFiltered}
            </span>
          </div>
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        {/* Most Improved Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1 max-w-[70%]">
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Most Improved</span>
            <span className="text-base md:text-lg font-extrabold text-slate-900 truncate block">
              {mostImprovedStudent}
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 3. Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students by name..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Custom Dropdowns Filter Group */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Class Filter */}
          <div className="relative" ref={classRef}>
            <button
              onClick={() => setClassOpen(!classOpen)}
              className={`flex items-center justify-between gap-2 px-4 py-2.5 bg-white border ${classOpen ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'} rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all`}
            >
              <span>{selectedClass}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${classOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {classOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 5 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-1 w-48 bg-white border border-slate-150 rounded-xl shadow-lg z-50 overflow-hidden"
                >
                  <div className="max-h-60 overflow-y-auto py-1.5 scrollbar-thin">
                    {CLASSES.map((cls) => (
                      <button
                        key={cls}
                        onClick={() => {
                          setSelectedClass(cls);
                          setClassOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 text-left transition-colors"
                      >
                        <span>{cls}</span>
                        {selectedClass === cls && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subject Filter */}
          <div className="relative" ref={subjectRef}>
            <button
              onClick={() => setSubjectOpen(!subjectOpen)}
              className={`flex items-center justify-between gap-2 px-4 py-2.5 bg-white border ${subjectOpen ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'} rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all`}
            >
              <span>{selectedSubject}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${subjectOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {subjectOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 5 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-1 w-56 bg-white border border-slate-150 rounded-xl shadow-lg z-50 overflow-hidden"
                >
                  <div className="max-h-60 overflow-y-auto py-1.5 scrollbar-thin">
                    {SUBJECTS.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSelectedSubject(sub);
                          setSubjectOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 text-left transition-colors"
                      >
                        <span>{sub}</span>
                        {selectedSubject === sub && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Term Filter */}
          <div className="relative" ref={termRef}>
            <button
              onClick={() => setTermOpen(!termOpen)}
              className={`flex items-center justify-between gap-2 px-4 py-2.5 bg-white border ${termOpen ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'} rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all`}
            >
              <span>{selectedTerm}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${termOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {termOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 5 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-1 w-44 bg-white border border-slate-150 rounded-xl shadow-lg z-50 overflow-hidden"
                >
                  <div className="py-1.5">
                    {TERMS.map((trm) => (
                      <button
                        key={trm}
                        onClick={() => {
                          setSelectedTerm(trm);
                          setTermOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 text-left transition-colors"
                      >
                        <span>{trm}</span>
                        {selectedTerm === trm && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 4. Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Rank 1: Fatima (Gold Card) */}
        {topThree[0] && (
          <div className="bg-[#FFFBF2] border border-[#FDECA8] shadow-sm rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow group h-full">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FEF4CE]/20 rounded-full translate-x-6 -translate-y-6 -z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Top Tag and Crown badge */}
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#FEF5D1] flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-500 fill-amber-400 animate-bounce" />
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
                {topThree[0].class}
              </span>
            </div>

            {/* Profile Avatar and Name */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-[#0F5A47] text-white flex items-center justify-center font-bold text-lg border-2 border-amber-300 shadow-sm shrink-0">
                {topThree[0].avatar}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-800 leading-tight truncate">{topThree[0].name}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {topThree[0].subjects.map((sub, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-amber-100/60 bg-amber-50/20 -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div>
                <p className="text-2xl font-black text-[#0F5D48] tracking-tight">{topThree[0].avgScore}%</p>
                <p className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Average</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 tracking-tight">{topThree[0].attendance}%</p>
                <p className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Attendance</p>
              </div>
            </div>
          </div>
        )}

        {/* Rank 2: Ibrahim (Silver Card) */}
        {topThree[1] && (
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow group h-full">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-200/20 rounded-full translate-x-6 -translate-y-6 -z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Top Tag and Trophy */}
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-slate-400 fill-slate-200" />
              </div>
              <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full border border-slate-300">
                {topThree[1].class}
              </span>
            </div>

            {/* Profile Avatar and Name */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-[#0F5A47] text-white flex items-center justify-center font-bold text-lg border-2 border-slate-300 shadow-sm shrink-0">
                {topThree[1].avatar}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-800 leading-tight truncate">{topThree[1].name}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {topThree[1].subjects.map((sub, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-200 text-slate-500 text-[10px] font-bold rounded">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 bg-slate-100/20 -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div>
                <p className="text-2xl font-black text-blue-600 tracking-tight">{topThree[1].avgScore}%</p>
                <p className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Average</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 tracking-tight">{topThree[1].attendance}%</p>
                <p className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Attendance</p>
              </div>
            </div>
          </div>
        )}

        {/* Rank 3: Ngozi (Bronze Card) */}
        {topThree[2] && (
          <div className="bg-[#FFF9F6] border border-[#FFE2D1] shadow-sm rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow group h-full">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/10 rounded-full translate-x-6 -translate-y-6 -z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Top Tag and Trophy */}
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0E6] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-orange-500 fill-orange-300" />
              </div>
              <span className="px-3 py-1 bg-orange-50 text-orange-800 text-xs font-bold rounded-full border border-orange-200">
                {topThree[2].class}
              </span>
            </div>

            {/* Profile Avatar and Name */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-[#0F5A47] text-white flex items-center justify-center font-bold text-lg border-2 border-orange-200 shadow-sm shrink-0">
                {topThree[2].avatar}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-800 leading-tight truncate">{topThree[2].name}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {topThree[2].subjects.map((sub, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-orange-100 bg-[#FFFBF9] -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div>
                <p className="text-2xl font-black text-orange-600 tracking-tight">{topThree[2].avgScore}%</p>
                <p className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Average</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 tracking-tight">{topThree[2].attendance}%</p>
                <p className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-0.5">Attendance</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 5. All Rankings Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">All Rankings</h2>
          <span className="text-xs font-bold text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-200">
            {filteredStudents.length} students
          </span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-350" />
            <p className="text-sm font-semibold">No students match the current filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase bg-slate-50/50">
                  <th className="py-4 px-6 text-center w-16">Rank</th>
                  <th className="py-4 px-6">Student</th>
                  <th className="py-4 px-6">Class</th>
                  <th className="py-4 px-6">Subjects</th>
                  <th className="py-4 px-6 text-center">Avg Score</th>
                  <th className="py-4 px-6 text-center">At Risk</th>
                  <th className="py-4 px-6 text-center">Attendance</th>
                  <th className="py-4 px-6 text-center">Trend</th>
                  <th className="py-4 px-6 text-right">Badges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-700">
                {/* Dynamically display first 3 if present in filtered lists as rows if podium isn't displayed, or just table students */}
                {/* To match mockup, we start showing from remainingTable which are ranks 4 to 10 */}
                {remainingTable.map((student) => (
                  <tr key={student.rank} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6 text-center font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                      {student.rank}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0F5D48] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                          {student.avatar}
                        </div>
                        <span className="font-bold text-slate-800 block hover:text-blue-600 cursor-pointer">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-500">
                      {student.class}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {student.subjects.map((sub, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded border border-slate-200">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-extrabold">
                      <span className={
                        student.avgScore >= 80 ? 'text-[#10B981]' : 
                        student.avgScore >= 70 ? 'text-[#3B82F6]' : 'text-amber-500'
                      }>
                        {student.avgScore}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {student.atRisk ? (
                        <span className="px-2.5 py-0.5 bg-red-50 text-red-650 text-[11px] font-bold rounded-full border border-red-100">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-slate-50 text-slate-450 text-[11px] font-bold rounded-full border border-slate-200">
                          No
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-600">
                      {student.attendance}%
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center justify-center">
                        {student.trend === "up" && <ArrowUp className="w-4 h-4 text-emerald-500" />}
                        {student.trend === "down" && <ArrowDown className="w-4 h-4 text-red-500" />}
                        {student.trend === "dash" && <span className="text-slate-400 font-bold">—</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {student.badge ? (
                        <span className={`px-2.5 py-1 text-[10px] font-black rounded-full border uppercase tracking-wider inline-block ${
                          student.badge === "Most Improved" ? "bg-emerald-50 text-emerald-750 border-emerald-200" :
                          student.badge === "Rising Star" ? "bg-blue-55 text-blue-750 border-blue-200" :
                          student.badge === "Creative Writer" ? "bg-teal-50 text-teal-750 border-teal-200" :
                          student.badge === "Consistent Performer" ? "bg-cyan-50 text-cyan-750 border-cyan-200" :
                          "bg-amber-55 text-amber-750 border-amber-200"
                        }`}>
                          {student.badge}
                        </span>
                      ) : (
                        <span className="text-slate-350">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 6. Student Score Comparison Chart (Large Bar Chart) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative">
        <h2 className="text-lg font-extrabold text-slate-900 mb-6">Student Score Comparison</h2>
        
        {/* Custom SVG Responsive Bar Chart */}
        <div className="w-full relative h-[320px]">
          <svg className="w-full h-full" viewBox="0 0 800 320" preserveAspectRatio="none">
            {/* Grid Y Lines */}
            {[0, 30, 60, 90, 120].map((tick, index) => {
              const yVal = 260 - (tick / 120) * 200;
              return (
                <g key={index}>
                  <line 
                    x1="45" 
                    y1={yVal} 
                    x2="780" 
                    y2={yVal} 
                    stroke="#F1F5F9" 
                    strokeWidth="1" 
                    strokeDasharray={tick === 0 ? "0" : "4 4"}
                  />
                  <text 
                    x="25" 
                    y={yVal + 4} 
                    textAnchor="end" 
                    className="text-[10px] fill-slate-400 font-bold"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Render Bars */}
            {[
              { name: "Adebayo Johnson", initials: "AJ", score: 87.3 },
              { name: "Chidinma Eze", initials: "CE", score: 76.5 },
              { name: "Emeka Okafor", initials: "EO", score: 119.0 },
              { name: "Amina Bello", initials: "AB", score: 60.0 },
              { name: "Olumide Adeyemi", initials: "OA", score: 102.0 },
              { name: "Zainab Yusuf", initials: "ZY", score: 119.5 }
            ].map((bar, index) => {
              const barWidth = 60;
              const spacing = 110;
              const xCoord = 75 + index * spacing;
              const barHeight = (bar.score / 120) * 200;
              const yCoord = 260 - barHeight;

              return (
                <g key={index}>
                  <path 
                    d={getRoundedTopPath(xCoord, yCoord, barWidth, barHeight, 6)}
                    fill="#3B82F6"
                    className="cursor-pointer hover:fill-blue-600 transition-colors duration-200"
                    onMouseEnter={(e) => {
                      setBarTooltip({
                        x: xCoord + 15,
                        y: yCoord - 10,
                        name: bar.name,
                        score: bar.score
                      });
                    }}
                    onMouseLeave={() => setBarTooltip(null)}
                  />
                  <text 
                    x={xCoord + 30} 
                    y="280" 
                    textAnchor="middle" 
                    className="text-[11px] fill-slate-500 font-bold"
                  >
                    {bar.initials}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* SVG Tooltip Popup */}
          {barTooltip && (
            <div 
              style={{ 
                left: `${(barTooltip.x / 800) * 100}%`, 
                top: `${(barTooltip.y / 320) * 100}%` 
              }}
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md z-40 whitespace-nowrap"
            >
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
              {barTooltip.name}: {barTooltip.score}%
            </div>
          )}
        </div>
      </div>

      {/* 7. Performance Overview Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900">Performance Overview</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Academy Performance Trend (Line Chart) */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative">
            <h3 className="text-base font-extrabold text-slate-950 mb-5">Academy Performance Trend</h3>
            
            <div className="w-full relative h-[220px]">
              <svg className="w-full h-full" viewBox="0 0 500 220" preserveAspectRatio="none">
                {/* Horizontal Ticks & Grid Lines */}
                {[60, 67, 74, 85].map((tick, idx) => {
                  // Map values 60 to 85 to height 150 (from y=30 to y=180)
                  const yVal = 180 - ((tick - 60) / 25) * 150;
                  return (
                    <g key={idx}>
                      <line 
                        x1="35" 
                        y1={yVal} 
                        x2="480" 
                        y2={yVal} 
                        stroke="#F1F5F9" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                      />
                      <text 
                        x="20" 
                        y={yVal + 3} 
                        textAnchor="end" 
                        className="text-[10px] fill-slate-400 font-bold"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* Line definitions */}
                <defs>
                  <linearGradient id="lineTrendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>

                {/* Fade Path area */}
                <path 
                  d="M 50 162 C 90 162, 90 108, 130 108 C 170 108, 170 120, 210 120 C 250 120, 250 78, 290 78 C 330 78, 330 102, 370 102 C 410 102, 410 96, 450 96 L 450 180 L 50 180 Z" 
                  fill="url(#lineTrendGrad)" 
                />

                {/* Main Stroke Path */}
                <path 
                  d="M 50 162 C 90 162, 90 108, 130 108 C 170 108, 170 120, 210 120 C 250 120, 250 78, 290 78 C 330 78, 330 102, 370 102 C 410 102, 410 96, 450 96" 
                  fill="none" 
                  stroke="#3B82F6" 
                  strokeWidth="2.5" 
                />

                {/* Points on Line */}
                {[
                  { month: "Sep", val: 63, x: 50, y: 162 },
                  { month: "Oct", val: 72, x: 130, y: 108 },
                  { month: "Nov", val: 70, x: 210, y: 120 },
                  { month: "Dec", val: 77, x: 290, y: 78 },
                  { month: "Jan", val: 73, x: 370, y: 102 },
                  { month: "Feb", val: 74, x: 450, y: 96 }
                ].map((pt, index) => (
                  <g key={index}>
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="4" 
                      fill="#FFFFFF" 
                      stroke="#3B82F6" 
                      strokeWidth="2" 
                      className="cursor-pointer hover:r-6 hover:stroke-blue-700 transition-all"
                      onMouseEnter={() => {
                        setTrendTooltip({
                          x: pt.x,
                          y: pt.y - 10,
                          month: pt.month,
                          val: pt.val
                        });
                      }}
                      onMouseLeave={() => setTrendTooltip(null)}
                    />
                    <text 
                      x={pt.x} 
                      y="200" 
                      textAnchor="middle" 
                      className="text-[9px] fill-slate-400 font-bold"
                    >
                      {pt.month}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Trend Tooltip */}
              {trendTooltip && (
                <div 
                  style={{ 
                    left: `${(trendTooltip.x / 500) * 100}%`, 
                    top: `${(trendTooltip.y / 220) * 100}%` 
                  }}
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md z-45 whitespace-nowrap"
                >
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-800 rotate-45" />
                  {trendTooltip.month}: {trendTooltip.val}%
                </div>
              )}
            </div>
          </div>

          {/* Performance by Class (Bar Chart) */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative">
            <h3 className="text-base font-extrabold text-slate-950 mb-5">Performance by Class</h3>
            
            <div className="w-full relative h-[220px]">
              <svg className="w-full h-full" viewBox="0 0 500 220" preserveAspectRatio="none">
                {/* Horizontal Ticks & Grid Lines */}
                {[0, 25, 50, 75, 100].map((tick, idx) => {
                  const yVal = 180 - (tick / 100) * 150;
                  return (
                    <g key={idx}>
                      <line 
                        x1="35" 
                        y1={yVal} 
                        x2="480" 
                        y2={yVal} 
                        stroke="#F1F5F9" 
                        strokeWidth="1" 
                        strokeDasharray={tick === 0 ? "0" : "4 4"}
                      />
                      <text 
                        x="20" 
                        y={yVal + 3} 
                        textAnchor="end" 
                        className="text-[10px] fill-slate-400 font-bold"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

                {/* Bars for Classes */}
                {[
                  { className: "JSS1", score: 78.0 },
                  { className: "JSS2", score: 73.0 },
                  { className: "JSS3", score: 70.0 },
                  { className: "SS1", score: 76.0 },
                  { className: "SS2", score: 69.0 },
                  { className: "SS3", score: 80.0 }
                ].map((bar, index) => {
                  const barWidth = 24;
                  const spacing = 70;
                  const xCoord = 55 + index * spacing;
                  const barHeight = (bar.score / 100) * 150;
                  const yCoord = 180 - barHeight;

                  return (
                    <g key={index}>
                      <path 
                        d={getRoundedTopPath(xCoord, yCoord, barWidth, barHeight, 4)}
                        fill="#3B82F6"
                        className="cursor-pointer hover:fill-blue-600 transition-colors"
                        onMouseEnter={() => {
                          setClassBarTooltip({
                            x: xCoord + 12,
                            y: yCoord - 10,
                            className: bar.className,
                            score: bar.score
                          });
                        }}
                        onMouseLeave={() => setClassBarTooltip(null)}
                      />
                      <text 
                        x={xCoord + 12} 
                        y="198" 
                        textAnchor="middle" 
                        className="text-[9px] fill-slate-400 font-bold"
                      >
                        {bar.className}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Class Bar Tooltip */}
              {classBarTooltip && (
                <div 
                  style={{ 
                    left: `${(classBarTooltip.x / 500) * 100}%`, 
                    top: `${(classBarTooltip.y / 220) * 100}%` 
                  }}
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md z-45 whitespace-nowrap"
                >
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-800 rotate-45" />
                  {classBarTooltip.className}: {classBarTooltip.score}%
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default LeadershipBoard;