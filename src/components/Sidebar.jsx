import React from 'react';
import { NavLink } from 'react-router-dom'; // Assuming react-router-dom is used
import { LayoutDashboard, BookOpen, History, Settings, LogOut, MonitorCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const studentLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: MonitorCheck, label: 'Take a Test', path: '/test' },
  { icon: BookOpen, label: 'My Courses', path: '/courses' },
  { icon: History, label: 'History', path: '/history' },
  // { icon: Settings, label: 'Settings', path: '/settings' },
];

const adminLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Curriculum', path: '/curriculum' },
    { icon: BookOpen, label: 'Student Performance', path: '/student-performance' },
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
        w-64 bg-white border-r border-green-100 flex-col h-full 
        fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
               <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                 AI
               </div>
               <span className="text-xl font-bold text-slate-900">AI Tutor</span>
            </div>

            <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Profile</h3>
                <div className="flex items-center gap-3 px-2 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                       <span className="text-green-700 font-bold">
                          {firstName ? firstName[0]?.toUpperCase() : ''}
                          {lastName ? lastName[0]?.toUpperCase() : ''}
                       </span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">{firstName} {lastName}</p>
                        <p className="text-xs text-slate-500">{role}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Menu</h3>
              {(role === 'admin' ? adminLinks : studentLinks).map((link) => (

                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose} // Close sidebar on mobile when link clicked
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                      isActive
                        ? 'bg-green-50 text-green-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </NavLink>
              ))}
            </nav>
        </div>

        <div className="p-4 mt-auto border-t border-green-50">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
