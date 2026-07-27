import axiosInstance from '../api/axiosInstance';

const AUTH = '/auth';

export const authService = {
  register: (payload) => axiosInstance.post(`${AUTH}/register`, payload).then((r) => r.data),
  login: (payload) => axiosInstance.post(`${AUTH}/login`, payload).then((r) => r.data),
  logout: () => axiosInstance.post(`${AUTH}/logout`).then((r) => r.data),
  profile: () => axiosInstance.get(`${AUTH}/profile`).then((r) => r.data),
  refreshToken: (refreshToken) => axiosInstance.post(`${AUTH}/refresh-token`, { refreshToken }).then((r) => r.data),
  forgotPassword: (email) => axiosInstance.post(`${AUTH}/forgot-password`, { email }).then((r) => r.data),
  resetPassword: (payload) => axiosInstance.post(`${AUTH}/reset-password`, payload).then((r) => r.data),
  verifyOTP: (payload) => axiosInstance.post(`${AUTH}/verify-otp`, payload).then((r) => r.data),
  verifyEmail: (payload) => axiosInstance.post(`${AUTH}/verify-email`, payload).then((r) => r.data),
  resendOTP: (payload) => axiosInstance.post(`${AUTH}/resend-otp`, payload).then((r) => r.data),
  sendVerificationOTP: (email) => axiosInstance.post(`${AUTH}/send-verification-otp`, { email }).then((r) => r.data),
  changePassword: (payload) => axiosInstance.post(`${AUTH}/change-password`, payload).then((r) => r.data),
};
