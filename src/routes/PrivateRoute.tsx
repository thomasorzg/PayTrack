import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = true;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;