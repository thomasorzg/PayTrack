import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
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

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;