// --- src/components/PrivateRoute.js ---
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="loading-div">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;