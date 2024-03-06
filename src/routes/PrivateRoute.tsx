import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isLogged = async () => {
            const token = localStorage.getItem("authToken");
            if (token === null) {
                setIsAuthenticated(false);
                return;
            }

            // Hacer la petición al servidor para verificar si el token es válido
            /* const response = await fetch("http://localhost:4000/auth/verify", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsAuthenticated(response.ok);*/

            // Por ahora, asumimos que el usuario está autenticado si hay un token
            setIsAuthenticated(true);
        };

        isLogged();
    }, []);

    return isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

export default PrivateRoute;
