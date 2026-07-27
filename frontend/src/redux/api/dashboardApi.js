import { baseApi } from './baseApi';

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({ url: '/dashboard', method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: [{ type: 'Dashboard', id: 'MAIN' }],
    }),
    getEnterpriseDashboard: builder.query({
      query: () => ({ url: '/enterprise-dashboard', method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: [{ type: 'Dashboard', id: 'ENTERPRISE' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardQuery, useGetEnterpriseDashboardQuery } = dashboardApi;
