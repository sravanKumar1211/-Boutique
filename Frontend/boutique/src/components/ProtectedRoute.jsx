import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

function ProtectedRoute({ element, isAdmin }) {
    const { isAuthenticated, loading, user } = useSelector(state => state.user);

    // If loading is true, we ARE still checking the cookie/token.
    // We MUST return the loader here and NOT the Navigate component.
    if (loading) {
        return <Loader />; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAdmin && user?.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return element;
}

export default ProtectedRoute;
