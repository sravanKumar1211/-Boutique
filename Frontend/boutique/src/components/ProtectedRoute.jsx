import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
    const { isAuthenticated, loading } = useSelector(state => state.user);

    // 1. If Redux is still fetching the user data, show Loader
    if (loading) {
        return <Loader />
    }

    // 2. Once loading is finished, if NOT authenticated, go to login
    if (isAuthenticated === false) {
        return <Navigate to='/login' />
    }

    // 3. If loading is finished and authenticated is true, show the component
    return element;
}

export default ProtectedRoute
