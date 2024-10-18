
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface Props {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const { user } = useAuthStore();

    if (!user) {
        // If user is not authenticated, redirect to Sign In page
        return <Navigate to="/signin" />;
    }

    // If user is authenticated, render the children (protected content)
    return children;
};

export default ProtectedRoute;
