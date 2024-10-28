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
    if (error.response.status === 401 && error.response.data === 'invalid signature') {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
   

    return Promise.reject(error)
  }
);
const apiService = {
  addJob: (data) => api.post('/jobs', data),
  getJobs: (filters = {}) => api.get('/jobs/all', { params: filters }),
    loginUser: (credentials) => api.post('/login', credentials),
  registerUser: (userData) => api.post('/register', userData),
  PostProposals: (data) => api.post('/proposals', data),
  getProposals: (data) => api.get('/proposals', data),
  clientJobs: (data) => api.get('/jobs', { params: data }),
 updateProposalStatus: (proposalId, status) => api.patch(`/proposals/${proposalId}`, status),
 confirm: (proposalId,) => api.patch(`proposals/confirm/${proposalId}`)
};

export default apiService;
