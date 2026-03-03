import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import msLexi from '../assets/msLexi.png';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const firstName = useSelector((state) => state.user?.firstName);
    const lastName = useSelector((state) => state.user?.lastName);

    return (
        <div className="h-screen flex bg-green-50 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-green-100 p-4 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        {/* <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                            LA
                        </div> */}
                        <img src={msLexi} alt="Lextorah Logo" className="w-8 h-8 rounded-full" />
                        <span className="text-xl font-bold text-slate-900">Lextorah AI</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>
                {/* Desktop Header */}
                <header className="hidden md:flex bg-white items-center justify-between p-4 px-8 border-b border-gray-100 shrink-0 h-20">
                    <div>
                        <h1 className="text-sm font-bold text-slate-800">Welcome back, {firstName || 'Lex'} 👋</h1>
                        <p className="text-xs text-blue-500 underline cursor-pointer mt-0.5">Let's continue learning today</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors" to="/notifications">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </Link>
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-full pr-3 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex justify-center items-center text-white text-xs font-bold shadow-sm">
                                {firstName ? firstName[0]?.toUpperCase() : 'L'}{lastName ? lastName[0]?.toUpperCase() : 'X'}
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </header>


                <div className="flex-1 overflow-auto bg-[#F8FAFC]">
                    <div className="p-4 md:p-8">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
