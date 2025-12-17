import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                 <div className="w-12 h-12 bg-sky-500 text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6"/><path d="M20 16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 2v4"/><path d="M12 18v4"/></svg>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
                <p className="text-slate-600">Start your journey with AI Tutor today.</p>
            </div>

            <form className="space-y-4 mb-8">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                    <input 
                        type="password" 
                        placeholder="Create a password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <button className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                    Sign Up
                </button>
            </form>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-400">or</span>
                </div>
            </div>

             <div className="space-y-3">
                 <button className="w-full py-3 px-4 border-2 border-slate-100 hover:border-slate-200 rounded-xl flex items-center justify-center gap-3 font-bold text-slate-700 transition-all hover:bg-slate-50">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Sign up with Google
                </button>
            </div>
            
            <p className="text-center mt-8 text-slate-600">
                Already have an account? <Link to="/login" className="text-sky-500 font-bold hover:underline">Log in</Link>
            </p>
        </div>
    </div>
  )
}

export default Signup
