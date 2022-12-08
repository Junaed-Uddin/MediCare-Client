import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../Contexts/AuthContext';
import useAdmin from '../hooks/useAdmin';
import Loader from '../Pages/Shared/Loader/Loader';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthProvider);
    const location = useLocation();
    const [isAdmin, isLoading] = useAdmin(user?.email);

    if (loading || isLoading) {
        return <Loader></Loader>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;