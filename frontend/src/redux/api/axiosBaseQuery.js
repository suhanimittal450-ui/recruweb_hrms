import axiosInstance from '../../api/axiosInstance';

// Lets RTK Query endpoints run through our existing Axios instance so every
// request still benefits from the JWT header injection + refresh-token
// interceptor defined in api/axiosInstance.js.
export const axiosBaseQuery = () => async ({ url, method = 'get', data, params, headers }) => {
  try {
    const result = await axiosInstance({ url, method, data, params, headers });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
