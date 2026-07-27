import axios from 'axios';
import { getAccessToken, setAccessToken, clearAccessToken } from '../utils/tokenStorage';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // backend also sets httpOnly refresh/access cookies
  headers: { 'Content-Type': 'application/json' },
});

// Separate client (no interceptors) so the refresh call itself never
// recurses into the 401 handler below.
const refreshClient = axios.create({ baseURL, withCredentials: true });

let isRefreshing = false;
let pendingQueue = [];

const flushQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Populated by the auth slice on logout / forced sign-out so the
// interceptor can dispatch a real logout instead of just clearing memory.
let onAuthFailure = () => {};
export const registerAuthFailureHandler = (fn) => {
  onAuthFailure = fn;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status !== 401 || originalRequest._retry || originalRequest.url?.includes('/auth/')) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const storedRefreshToken = JSON.parse(localStorage.getItem('hrms_refresh_token') || 'null');
      const { data } = await refreshClient.post('/auth/refresh-token', {
        refreshToken: storedRefreshToken,
      });
      const newAccessToken = data?.data?.accessToken;
      const newRefreshToken = data?.data?.refreshToken;

      setAccessToken(newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem('hrms_refresh_token', JSON.stringify(newRefreshToken));
      }

      flushQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      flushQueue(refreshError, null);
      clearAccessToken();
      localStorage.removeItem('hrms_refresh_token');
      onAuthFailure();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
