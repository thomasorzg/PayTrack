import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles }: { children: React.ReactNode, roles?: string[] }) => {
    const { isAuthenticated, user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAuthenticatedFromStorage = localStorage.getItem("isAuthenticated");
        
        if (isAuthenticatedFromStorage) {
            // Set the authentication state based on local storage
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [user, isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Si no está autenticado, redirigir al login
        return <Navigate to="/login" replace />;
    }

    // Roles requeridos para acceder a la ruta
    const requiredRoles = roles ? roles : [];

    if (requiredRoles.length > 0 && (!user || !requiredRoles.includes(user.role))) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
