import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

interface UserState {
    id: string;
    name: string;
    matricula: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: UserState | null;
    isAuthenticated: boolean;
    setLogin: (data: any) => void;
    logout: () => void;
    hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserState | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setLogin = useCallback((data: any) => {
        setIsAuthenticated(true);
        sessionStorage.setItem('access_token', data.access_token);
        sessionStorage.setItem('refresh_token', data.refresh_token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        //const decodedUser: UserState = jwtDecode(data.access_token); // se usará para obtener el rol del usuario
        setUser(data.user);
    }, []);

    const handleLogout = useCallback(() => {
        sessionStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    const hasRole = useCallback((roles: string[]): boolean => {
        return roles.includes(user?.role ?? '');
    }, [user]);

    // Verificación para ver si el usuario está autenticado
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        const refreshToken = sessionStorage.getItem('refresh_token');
        const storedUser = sessionStorage.getItem('user');
        if (accessToken && refreshToken && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const value = {
        user,
        isAuthenticated,
        setLogin,
        logout: handleLogout,
        hasRole
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
