import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
    const { isAuthenticated, user } = useAuth();
    const [loading, setLoading] = useState(true);

    // useEffect to check if user is authenticated from local storage
    useEffect(() => {
        const isAuthenticatedFromStorage = localStorage.getItem("isAuthenticated");
        if (isAuthenticatedFromStorage) {
            // Set the authentication state based on local storage
            setLoading(false);
        }
        setLoading(false);
    }, []);

    // Check if loading is true, return nothing
    if (loading) {
        return;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles && roles.length > 0 && !userHasRoles(user, roles)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

const userHasRoles = (user: any, requiredRoles: string[]) => {
    console.log(user.roles);
    return requiredRoles.some(role => user.roles.includes(role));
}

export default PrivateRoute;