import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';
import msLexi from '../assets/msLexi.png';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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


                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
