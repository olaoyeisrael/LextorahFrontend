import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Camera, Edit2, Key, BookOpen, CheckCircle, Flame, Activity, User, Bell, Lock, Globe, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateProfileName } from '../../store/userSlice';
import { apiClient } from '../../utils/api';

const Profile = () => {
    const dispatch = useDispatch();
    const { firstName, lastName, email, studentSprints } = useSelector((state) => state.user);
    
    // Fallback details matching mockup if not present in redux
    const fullName = firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : "Amara Okafor";
    const userEmail = email;

    // Calculate overview metrics dynamically where possible
    const enrolledCount = studentSprints?.length || 8;
    const completedCount = 0; // Placeholder/mock metric
    const activeCount = 3;    // Placeholder/mock metric
    const progressPercent = 72; // Placeholder/mock metric

    const initials = fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    // Modal Visibility states
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);

    // Form states
    const [profileForm, setProfileForm] = useState({
        firstName: firstName || '',
        lastName: lastName || ''
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Loading & Message states
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [profileMessage, setProfileMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);

    const handleOpenEditProfile = () => {
        setProfileForm({
            firstName: firstName || '',
            lastName: lastName || ''
        });
        setProfileMessage(null);
        setIsEditProfileOpen(true);
    };

    const handleOpenEditPassword = () => {
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setPasswordMessage(null);
        setIsEditPasswordOpen(true);
    };

    const handleEditProfileSubmit = async (e) => {
        e.preventDefault();
        setLoadingProfile(true);
        setProfileMessage(null);
        try {
            const res = await apiClient('/api/user/update-profile', {
                method: 'POST',
                body: JSON.stringify({
                    first_name: profileForm.firstName,
                    last_name: profileForm.lastName
                })
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(updateProfileName({
                    firstName: profileForm.firstName,
                    lastName: profileForm.lastName
                }));
                setProfileMessage({ type: 'success', text: data.message || 'Profile updated successfully!' });
                setTimeout(() => {
                    setIsEditProfileOpen(false);
                    setProfileMessage(null);
                }, 1500);
            } else {
                setProfileMessage({ type: 'error', text: data.error || 'Failed to update profile.' });
            }
        } catch (error) {
            setProfileMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleEditPasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        setLoadingPassword(true);
        setPasswordMessage(null);
        try {
            const res = await apiClient('https://www.lextorah-elearning.com/ap/laravel/api/change-password', {
                method: 'POST',
                body: JSON.stringify({
                    current_password: passwordForm.currentPassword,
                    new_password: passwordForm.newPassword,
                    new_password_confirmation: passwordForm.confirmPassword
                })
            });
            const data = await res.json();
            if (res.ok) {
                setPasswordMessage({ type: 'success', text: data.message || 'Password updated successfully!' });
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setTimeout(() => {
                    setIsEditPasswordOpen(false);
                    setPasswordMessage(null);
                }, 1500);
            } else {
                setPasswordMessage({ type: 'error', text: data.error || 'Failed to update password.' });
            }
        } catch (error) {
            setPasswordMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoadingPassword(false);
        }
    };

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
                            <p><span className="font-semibold">Email:</span> {userEmail}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 shrink-0">
                        <button 
                            onClick={handleOpenEditProfile}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-colors bg-white shadow-sm"
                        >
                            <Edit2 className="w-4 h-4 text-slate-500" />
                            Edit Profile
                        </button>
                        <button 
                            onClick={handleOpenEditPassword}
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
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-28">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="block text-xl font-black text-slate-800 leading-none mb-1">{enrolledCount}</span>
                            <span className="text-xs font-semibold text-slate-500">Enrolled Courses</span>
                        </div>
                    </div>

                    {/* Completed Card */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-28">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="block text-xl font-black text-slate-800 leading-none mb-1">{completedCount}</span>
                            <span className="text-xs font-semibold text-slate-500">Completed Courses</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Settings Section */}
            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Edit Personal Info */}
                    <div 
                        onClick={handleOpenEditProfile}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-[#0d9488] transition-colors">Edit personal information</h4>
                            <p className="text-xs text-slate-500 mt-1">Update your name, email, and contact details.</p>
                        </div>
                    </div>

                    {/* Password Management */}
                    <div 
                        onClick={handleOpenEditPassword}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex gap-4 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-[#0d9488] transition-colors">Password management</h4>
                            <p className="text-xs text-slate-500 mt-1">Change your password and secure your account.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {isEditProfileOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditProfileOpen(false)}
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
                        />
                        {/* Modal Content */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 border border-slate-100 shadow-2xl relative z-10"
                        >
                            <button 
                                onClick={() => setIsEditProfileOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Edit Personal Information</h3>
                            <p className="text-sm text-slate-500 mb-6">Update your first and last name details.</p>
                            
                            <form onSubmit={handleEditProfileSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                    <input 
                                        type="text"
                                        required
                                        value={profileForm.firstName}
                                        onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium text-slate-900"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                    <input 
                                        type="text"
                                        required
                                        value={profileForm.lastName}
                                        onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium text-slate-900"
                                    />
                                </div>

                                {profileMessage && (
                                    <div className={`p-4 rounded-xl text-sm font-medium ${
                                        profileMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                        {profileMessage.text}
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button 
                                        type="button"
                                        onClick={() => setIsEditProfileOpen(false)}
                                        className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={loadingProfile}
                                        className="flex-1 py-3 bg-[#0d9488] hover:bg-teal-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {loadingProfile ? <Loader className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Change Password Modal */}
            <AnimatePresence>
                {isEditPasswordOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditPasswordOpen(false)}
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
                        />
                        {/* Modal Content */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 border border-slate-100 shadow-2xl relative z-10"
                        >
                            <button 
                                onClick={() => setIsEditPasswordOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Change Password</h3>
                            <p className="text-sm text-slate-500 mb-6">Create a secure password for your account.</p>
                            
                            <form onSubmit={handleEditPasswordSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                                    <input 
                                        type="password"
                                        required
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium text-slate-900"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                                    <input 
                                        type="password"
                                        required
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium text-slate-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                                    <input 
                                        type="password"
                                        required
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all font-medium text-slate-900"
                                    />
                                </div>

                                {passwordMessage && (
                                    <div className={`p-4 rounded-xl text-sm font-medium ${
                                        passwordMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                        {passwordMessage.text}
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button 
                                        type="button"
                                        onClick={() => setIsEditPasswordOpen(false)}
                                        className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={loadingPassword}
                                        className="flex-1 py-3 bg-[#0d9488] hover:bg-teal-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {loadingPassword ? <Loader className="w-4 h-4 animate-spin" /> : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;

