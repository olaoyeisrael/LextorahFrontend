import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
    const token = useSelector((state) => state.user.token);
    return token ? <Outlet /> : <Navigate to='/login' replace />;
};

export const StudentProtectedRoute = () => {
    const token = useSelector((state) => state.user.token);
    const role = useSelector((state) => state.user.role);
    
    if (!token) return <Navigate to='/login' replace />;
    // Tutors do not have access to study modules / classrooms
    if (role === 'tutor') return <Navigate to='/dashboard' replace />;
    return <Outlet />;
};

export const TutorProtectedRoute = () => {
    const token = useSelector((state) => state.user.token);
    const role = useSelector((state) => state.user.role);
    
    if (!token) return <Navigate to='/login' replace />;
    if (role !== 'tutor' && role !== 'admin') return <Navigate to='/dashboard' replace />;
    return <Outlet />;
};

export const AdminProtectedRoute = () => {
    const token = useSelector((state) => state.user.token);
    const role = useSelector((state) => state.user.role);
    
    if (!token) return <Navigate to='/login' replace />;
    if (role !== 'admin') return <Navigate to='/dashboard' replace />;
    return <Outlet />;
};

export default ProtectedRoute;