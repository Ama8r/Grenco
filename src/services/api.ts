import axios, { type AxiosInstance } from 'axios';

// في وضع التطوير (localhost) سيستخدم البروكسي (/api)
// في وضع الرفع (Production) سيستخدم الرابط الكامل
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://grenco.athrcode.site/api' 
  : '/api'; 

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 20000, 
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;