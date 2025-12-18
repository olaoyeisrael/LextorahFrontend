import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { decode } from '../../utils/auth';
import { Loader } from 'lucide-react';

const Login = () => {
    const [credential, setCredential] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleForgotPassword = () => {
        window.alert('Please contact the admin to reset your password.')
    }

    const handleLogin = async() => {
        setLoading(true)
        const loginData = {
            email: credential.email,
            password: credential.password
        }
       const response = await fetch('https://www.lextorah-elearning.com/ap/laravel/api/login', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(loginData)
       })
       const data = await response.json()
       if (data.success) {
        const token = data.token
        const decoded = await decode(token);
        console.log("decoded: ", decoded)
        
        // Dispatch to Redux using decoded token data
        // Trying common claim names. User said token contains it.
        dispatch(setUser({
            firstName: decoded.first_name || decoded.firstname || '', 
            lastName: decoded.last_name || decoded.lastName || '',
            email: decoded.email || '',
            token: token,
            role: decoded.role || '',
            user_id: decoded.id || '',
            enrolled_course: decoded.course || '',
            enrolled_level: decoded.level || '',
        }));
        setLoading(false)
        navigate('/dashboard')
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', decoded.id)
        localStorage.setItem('enrolled_course', decoded.course)
        localStorage.setItem('enrolled_level', decoded.level)
        localStorage.setItem('firstName', decoded.first_name || decoded.firstname || '')
        localStorage.setItem('lastName', decoded.last_name || decoded.lastName || '')
       }else{

        setError(data.msg)
        setLoading(false)
       }
      
    }

    const handleChange = (e) => {
        setCredential({...credential, [e.target.name]: e.target.value})
    }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6"/><path d="M20 16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 2v4"/><path d="M12 18v4"/></svg>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back!</h1>
                <p className="text-slate-600">Continue your personalized learning journey.</p>
            </div>

            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        name='email'
                        value={credential.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-slate-700">Password</label>
                        <button onClick={handleForgotPassword} className="text-sm text-green-500 font-bold hover:text-green-300">Forgot Password?</button>
                    </div>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        name='password'
                        value={credential.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                {loading ? 
                <div className="flex justify-center items-center">
                <Loader/>
                </div> :
                <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all" onClick={handleLogin}>
                    Log In
                </button>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-400">or</span>
                </div>
            </div>

            {/* <div className="space-y-3">
                 <button className="w-full py-3 px-4 border-2 border-slate-100 hover:border-slate-200 rounded-xl flex items-center justify-center gap-3 font-bold text-slate-700 transition-all hover:bg-slate-50">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Log in with Google
                </button>
                 <button className="w-full py-3 px-4 border-2 border-slate-100 hover:border-slate-200 rounded-xl flex items-center justify-center gap-3 font-bold text-slate-700 transition-all hover:bg-slate-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.71c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    Log in with GitHub
                </button>
            </div> */}
            
            <p className="text-center mt-8 text-slate-600">
                Don't have an account? <Link to="https://www.lextorah-elearning.com/elearning/register" className="text-green-300 font-bold hover:underline">Sign Up</Link>
            </p>
        </div>
    </div>
  )
}

export default Login
