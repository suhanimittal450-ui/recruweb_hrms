import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    'Employee',
    'EmployeeDocuments',
    'EmployeeOnboarding',
    'Company',
    'Branch',
    'Department',
    'Designation',
    'Dashboard',
    'Attendance',
    'Leave',
    'Offer',
    'Candidate',
  ],
  endpoints: () => ({}),
});
