import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    const token =JSON.parse(user).token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
   
    }

  }
);
const apiService = {
  addJob: (data) => api.post('/jobs', data),
  getJobs: () => api.get('/jobs'),
  loginUser: (credentials) => api.post('/login', credentials),
  registerUser: (userData) => api.post('/register', userData),
};

export default apiService;
