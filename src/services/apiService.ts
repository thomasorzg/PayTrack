import axios from 'axios';

interface LoginResponse {
    token: string;
}

const API_BASE_URL = 'http://localhost:8080/crud';

const getAuthHeaders = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('access_token') as string,
        'Cache-Control': 'no-cache'
    }
}

const apiService = {
    // Función para iniciar sesión
    login: async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await axios.post<LoginResponse>('http://localhost:8080/auth/users', { email, password });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para crear un registro
    create: async (document: any, data: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/${document}`, data, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para buscar todos los registros
    findAll: async (document: any, queryParams = '') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${document}?${queryParams}`, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para buscar un registro por ID
    findOne: async (document: any, id: any) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${document}/${id}`, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para actualizar un registro
    update: async (document: any, id: any, data: any) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${document}/${id}`, data, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para eliminar un registro
    delete: async (document: any, id: any) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${document}/${id}`, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para eliminar todos los registros
    deleteAll: async (document: any) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${document}`, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
};

export default apiService;
