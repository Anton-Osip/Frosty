import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dev-api.fr0.me';
const API_TOKEN =
  import.meta.env.VITE_API_TOKEN || 'VAkUrqSrfl6Tk4YM1zb8rcelPBkhICFZgltlakaVvfjvYaKs9v2lJVmJG6oKQra9qq';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);
