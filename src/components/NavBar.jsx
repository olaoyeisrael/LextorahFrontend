import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { isAdmin } from '../utils/auth';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className='lg:px-20 px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 bg-[#FFFFFF] backdrop-blur-md z-50 border-b border-green-100'>
        {/* Logo */}
        <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className='h-8 w-auto object-contain' />
        </div>
       
        {/* Desktop Menu */}
        <div className='items-center gap-8 hidden lg:flex'>
            <NavLink to='/#aitutor' className='text-slate-600 hover:text-[#0D9488] font-medium transition-colors'>
                Meet Ms. Lexi®
            </NavLink>
            <NavLink to='/learners' className='text-slate-600 hover:text-[#0D9488] hover:-underline-offset-8 font-medium transition-colors'>
                Learners
            </NavLink>
             <NavLink to='/teachers' className='text-slate-600 hover:text-[#0D9488] hover:underline font-medium transition-colors'>
                Teachers
            </NavLink>
            <NavLink to='/parents' className='text-slate-600 hover:text-[#0D9488] font-medium transition-colors'>
                    Parents
            </NavLink>
            <NavLink to ='/institution' className='text-slate-600 hover:text-[#0D9488] font-medium transition-colors'>
                    Institutions
            </NavLink>

            
            <div className="flex items-center gap-4 ml-4">
                <Link to='https://www.lextorah-elearning.com/elearning/register' className='px-5 py-2.5 bg-[#0D9488] hover:bg-green-700 text-white font-bold rounded-md transition-all shadow-md hover:shadow-lg'>
                    Get Started
                </Link>
            </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className='lg:hidden text-slate-700'>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {open && (
            <div className='fixed top-[73px] left-0 right-0 bottom- bg-white z-40 p-6 flex flex-col gap-6 border-t border-slate-100'>
                <NavLink to='/' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    Home
                </NavLink>
                <NavLink to='/learners' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    Learners
                </NavLink>
                 <NavLink to='/teachers' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    Teachers
                </NavLink>
                <NavLink to='/parents' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    Parents  
                </NavLink>
                 <NavLink to='/institution' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    Institution
                </NavLink   >
                <hr className="border-slate-100" />
                <Link to='/login' onClick={closeMenu} className='text-lg font-bold text-slate-900 text-center'>
                    Log In
                </Link>
                <Link to='https://lextorah.com/register-now/' onClick={closeMenu} className='w-full py-3 bg-green-500 text-white font-bold rounded-xl text-center shadow-md'>
                    Sign Up
                </Link>
            </div>
        )}
    </nav>
  );
};

export default NavBar;