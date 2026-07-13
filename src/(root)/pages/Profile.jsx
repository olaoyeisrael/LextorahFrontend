import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Camera, Edit2, Key, BookOpen, CheckCircle, Flame, Activity, User, Bell, Lock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { firstName, lastName, email, studentSprints } = useSelector((state) => state.user);
    
    // Fallback details matching mockup if not present in redux
    const fullName = firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : "Amara Okafor";
    const userEmail = email || "[EMAIL_ADDRESS]";
    const studentId = "LTX-2026-0417"; // Standard structured student ID

    // Calculate overview metrics dynamically where possible
    const enrolledCount = studentSprints?.length || 8;
    const completedCount = 5; // Placeholder/mock metric
    const activeCount = 3;    // Placeholder/mock metric
    const progressPercent = 72; // Placeholder/mock metric

    const initials = fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="max-w-4xl mx-auto font-Mada pb-16">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Student Profile</h1>
            </header>

            {/* Profile Hero Section */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-8">
                {/* Green Banner */}
                <div className="h-32 bg-[#0d9488]" />
                
                {/* Profile Detail Card */}
                <div className="px-8 pb-8 pt-4 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
                    {/* Avatar with Camera badge */}
                    <div className="relative -mt-20 mb-2 md:mb-0 shrink-0 w-28 h-28 rounded-full border-4 border-white bg-teal-100 flex items-center justify-center text-teal-800 text-3xl font-bold shadow-md">
                        {initials}
                        <button className="absolute bottom-0 right-0 p-2 bg-[#0d9488] text-white rounded-full border-2 border-white hover:bg-teal-700 transition-colors shadow-sm">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Details Column */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h2 className="text-2xl font-bold text-slate-900 truncate">{fullName}</h2>
                            <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-bold border border-green-200 shrink-0">
                                Enrolled
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-slate-500">
                            <p><span className="font-semibold">Student ID:</span> {studentId}</p>
                            <p><span className="font-semibold">Email:</span> {userEmail}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 shrink-0">
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-colors bg-white shadow-sm"
                        >
                            <Edit2 className="w-4 h-4 text-slate-500" />
                            Edit Profile
                        </button>
                        <button 
                            onClick={() => alert('Change password feature is currently linked to authentication settings.')}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-colors bg-white shadow-sm"
                        >
                            <Key className="w-4 h-4 text-slate-500" />
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Learning Overview Grid */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Learning Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Enrolled Card */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block text-2xl font-black text-slate-800 leading-none mb-1">{enrolledCount}</span>
                            <span className="text-xs font-semibold text-slate-500">Enrolled Courses</span>
                        </div>
                    </div>

                    {/* Completed Card */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block text-2xl font-black text-slate-800 leading-none mb-1">{completedCount}</span>
                            <span className="text-xs font-semibold text-slate-500">Completed Courses</span>
                        </div>
                    </div>

                    {/* Active Card */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center mb-3">
                            <Flame className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block text-2xl font-black text-slate-800 leading-none mb-1">{activeCount}</span>
                            <span className="text-xs font-semibold text-slate-500">Active Courses</span>
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center mb-2">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-2xl font-black text-slate-800 leading-none">{progressPercent}%</span>
                                <span className="text-xs font-semibold text-slate-500">Progress</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Settings Section */}
            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Edit Personal Info */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-[#0d9488] transition-colors">Edit personal information</h4>
                            <p className="text-xs text-slate-500 mt-1">Update your name, email, and contact details.</p>
                        </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-[#0d9488] transition-colors">Notification preferences</h4>
                            <p className="text-xs text-slate-500 mt-1">Choose what updates you receive and how.</p>
                        </div>
                    </div>

                    {/* Password Management */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-[#0d9488] transition-colors">Password management</h4>
                            <p className="text-xs text-slate-500 mt-1">Change your password and secure your account.</p>
                        </div>
                    </div>

                    {/* Language Preferences */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-[#0d9488] transition-colors">Language preferences</h4>
                            <p className="text-xs text-slate-500 mt-1">Set your preferred learning language.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
