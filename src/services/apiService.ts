import axios from 'axios';

interface LoginResponse {
    // Define aquí las propiedades esperadas en tu respuesta de login
    token: string;
}

const apiService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await axios.post<LoginResponse>('http://localhost:8080/auth/users', { email, password });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
};

export default apiService;
