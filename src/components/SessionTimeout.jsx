import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

const SessionTimeout = () => {
    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [showWarning, setShowWarning] = useState(false);
    const [countdown, setCountdown] = useState(60);
    
    const warningTimerRef = useRef(null);
    const logoutTimerRef = useRef(null);
    const countdownIntervalRef = useRef(null);
    
    const WARNING_TIME = 14 * 60 * 1000; // 14 minutes in ms
    const LOGOUT_TIME = 15 * 60 * 1000;  // 15 minutes in ms

    const handleLogout = () => {
        // Collect current unsaved text inputs to prevent data loss
        const activeAskInput = document.getElementById('chat-input')?.value || '';
        const activeAssignmentInput = document.getElementById('assignment-textarea')?.value || '';
        
        if (activeAskInput || activeAssignmentInput) {
            const unsavedData = {
                askInput: activeAskInput,
                assignmentInput: activeAssignmentInput,
                timestamp: new Date().getTime()
            };
            localStorage.setItem('expired_session_data', JSON.stringify(unsavedData));
        }

        // Clear warning UI
        setShowWarning(false);
        clearInterval(countdownIntervalRef.current);
        
        // Log out user
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');
        dispatch(logout());
        navigate('/login');
    };

    const resetTimers = () => {
        if (!token) return;

        // Clear existing timers
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
        if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

        setShowWarning(false);
        setCountdown(60);

        // Set warnings and logout timers
        warningTimerRef.current = setTimeout(() => {
            setShowWarning(true);
            startCountdown();
        }, WARNING_TIME);

        logoutTimerRef.current = setTimeout(() => {
            handleLogout();
        }, LOGOUT_TIME);
    };

    const startCountdown = () => {
        countdownIntervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownIntervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        if (!token) return;

        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        
        const handleActivity = () => {
            if (!showWarning) {
                resetTimers();
            }
        };

        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        // Initialize timers
        resetTimers();

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
            if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        };
    }, [token, showWarning]);

    if (!showWarning) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Session Expiring</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                    You have been inactive for a while. You will be logged out in <span className="font-extrabold text-amber-600">{countdown}s</span> to protect your account.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={handleLogout}
                        className="flex-1 py-3 border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                    >
                        Log Out
                    </button>
                    <button
                        onClick={resetTimers}
                        className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                    >
                        Keep Working
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SessionTimeout;
