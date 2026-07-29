import React from 'react';
import { NavLink } from 'react-router-dom'; // Assuming react-router-dom is used
import { LayoutDashboard, BookOpen, History, Settings, LogOut, MonitorCheck, Video, CheckCircle, Calendar, ClipboardList, GraduationCap, HelpCircle, PlusCircle, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import msLexi from '../assets/msLexi.png';

const studentLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'My Courses', path: '/learn' },
  
  { icon: Video, label: 'Live Classes', path: '/live-classes' },
  { icon: MonitorCheck, label: 'Assessments', path: '/assessment' },
  { icon: BookOpen, label: 'Assignments', path: '/assignment' },
  { icon: History, label: 'Course History', path: '/history' },
  { icon: HelpCircle, label: 'How to Use', path: '/how-to-use' },
  { icon: GraduationCap, label: 'Student Profile', path: '/profile' },
  // { icon: History, label: 'Course Room', path: '/classroom' },
  // { icon: Settings, label: 'Settings', path: '/settings' },
];


const adminLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Curriculum', path: '/curriculum' },
    { icon: CheckCircle, label: 'Student Performance', path: '/student-performance' },
    { icon: Video, label: 'Live Classes', path: '/live-classes-admin' },
    { icon: PlusCircle, label: 'Add Course', path: '/add-course' },
    { icon: BookOpen, label: 'Assignments', path: '/assignment' },
    { icon: ClipboardList, label: 'Progress Report', path: '/progress-report'},
];

const tutorLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    // { icon: CheckCircle, label: 'Assign Topic', path: '/assign-topics' },
    { icon: CheckCircle, label: 'Curriculum', path: '/tutor-curriculum' },
    { icon: Video, label: 'Live Classes', path: '/tutor-live-classes' },
    // { icon: BookOpen, label: 'Curriculum', path: '/curriculum' },
    { icon: BookOpen, label: 'Assignments', path: '/assignment' },
    { icon: Bot, label: 'Ms. Lexi Assistant', path: '/tutor-chat' },
    { icon: BookOpen, label: 'Assessments', path: '/assessments' },
    { icon: Video, label: 'Upload Materials', path: '/upload' },
    // { icon: ClipboardList, label: 'AI Alerts', path: '/ai-report' },
    { icon: ClipboardList, label: 'Analytics', path: '/analytics' },
    // { icon: CheckCircle, label: 'Student Performance', path: '/student-performance' },
    // { icon: GraduationCap, label: 'Exam Prep', path: '/exam-prep' },
      { icon: HelpCircle, label: 'How to Use', path: '/how-to-use' },
    
];



const Sidebar = ({ isOpen, onClose }) => {
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const role = useSelector((state) => state.user.role);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role');
    localStorage.removeItem('enrolledCourse');
    localStorage.removeItem('enrolledLevel');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('last_level');
    window.location.href = '/login';
  };
  
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        w-64 border-r border-green-100 flex flex-col h-full 
        fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${role === 'admin' ? 'bg-[#061B4A]' : role === 'tutor' ? 'bg-[#0D9488]' : 'bg-green-50'}
      `}>
        <div className="p-6">
            <div className="flex flex-col gap-1 mb-8">
               <div className="flex items-center gap-2">
                  <img src={msLexi} alt="Ms. Lexi Logo" className="w-8 h-8 rounded-full object-cover" />  
                  <span className={`${role === 'admin' || role === 'tutor' ? 'text-white' : 'text-slate-900'} text-xl font-bold tracking-tight`}>Ms. Lexi</span>
               </div>
               <span className={`${role === 'admin' || role === 'tutor' ? 'text-white/70' : 'text-slate-500'} text-[11px] font-semibold mt-1`}>
                  {role === 'tutor' ? 'Your AI Teaching Assistant' : role === 'admin' ? 'Admin Portal' : 'Your AI Learning Companion'}
               </span>
            </div>

            <div className='mt-16'>



            <nav className="flex-1 space-y-2 mt-4">
              {(role === 'admin' ? adminLinks : role === 'tutor' ? tutorLinks : studentLinks).map((link) => (

                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose} // Close sidebar on mobile when link clicked
                  className={({ isActive }) => {
                    const activeClass =
                      role === 'admin' ? 'bg-[#3C83F6] text-white' :
                      role === 'tutor' ? 'bg-blue-700 text-white' :
                      'bg-[#22C55E] text-white shadow-md shadow-green-200';

                    const inactiveClass =
                      role === 'admin' ? 'text-white hover:bg-blue-800' :
                      role === 'tutor' ? 'text-white hover:bg-teal-700' :
                      'text-slate-500 hover:text-slate-900 hover:bg-slate-100';

                    return `flex items-center gap-3 px-4 py-3  rounded-xl transition-all text-sm font-semibold ${isActive ? activeClass : inactiveClass}`;
                  }}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </NavLink>
              ))}
            </nav>
            </div>
        </div>

        <div className=" p-6 mt-auto ">
            <button onClick={handleLogout} className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-semibold `}>
              <LogOut className="w-5 h-5" />
              Logout
            </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
