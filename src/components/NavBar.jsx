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
            <NavLink to='/' className='text-slate-600 hover:text-green-600 font-medium transition-colors'>
                Home
            </NavLink>
            <a href='/#aitutor' className='text-slate-600 hover:text-green-600 font-medium transition-colors'>
                AI Tutor
            </a>
             <a href='/#features' className='text-slate-600 hover:text-green-600 font-medium transition-colors'>
                Features
            </a>
            <a href='/#howitworks' className='text-slate-600 hover:text-green-600 font-medium transition-colors'>
                    How It Works
            </a>

            
            <div className="flex items-center gap-4 ml-4">
                <Link to='/login' className='text-slate-900 font-bold hover:text-green-600 transition-colors'>
                    Log In
                </Link>
                <Link to='https://www.lextorah-elearning.com/elearning/register' className='px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg'>
                    Sign Up
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
                <a href='/#aitutor' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    AI Tutor
                </a>
                 <a href='#' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    Features
                </a>
                <a href='#' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    How It Works    
                </a>
                 <a href='#' onClick={closeMenu} className='text-lg font-medium text-slate-700 hover:text-green-600'>
                    Testimonials
                </a>
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