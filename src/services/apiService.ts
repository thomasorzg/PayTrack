import axios from 'axios';

interface LoginResponse {
    token: string;
    user: any;
}

const API_BASE_URL = 'http://localhost:8080';

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
            const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/users`, { email, password });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para iniciar sesión para estudiantes
    loginStudent: async (matricula: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/student/users`, { matricula, password });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para crear una sesión de pago
    createCheckoutSession: async (items: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/stripe/create-checkout-session`, items, {
                headers: getAuthHeaders()
            });

            return response;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para obtener los productos de Stripe
    fetchStripeProducts: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/stripe/products`, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    createStripeProduct: async (product: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/stripe/create-product`, product, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    // Función para crear un registro
    create: async (document: any, data: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/crud/${document}`, data, {
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
            const response = await axios.get(`${API_BASE_URL}/crud/${document}?${queryParams}`, {
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
            const response = await axios.get(`${API_BASE_URL}/crud/${document}/${id}`, {
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
            const response = await axios.put(`${API_BASE_URL}/crud/${document}/${id}`, data, {
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
            const response = await axios.delete(`${API_BASE_URL}/crud/${document}/${id}`, {
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
            const response = await axios.delete(`${API_BASE_URL}/crud/${document}`, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
};

export default apiService;
