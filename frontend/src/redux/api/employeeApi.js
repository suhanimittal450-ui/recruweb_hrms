import { baseApi } from './baseApi';

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      // params: { page, limit, search, status, department, branch, sortBy, order }
      query: (params) => ({ url: '/employees', method: 'get', params }),
      transformResponse: (response) => response.data, // { employees, total, page, limit, pages }
      providesTags: (result) =>
        result?.employees
          ? [
              ...result.employees.map((e) => ({ type: 'Employee', id: e._id })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
    }),
    getEmployeeById: builder.query({
      query: (id) => ({ url: `/employees/${id}`, method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: 'Employee', id }],
    }),
    getMyEmployee: builder.query({
      query: () => ({ url: '/employees/me', method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: [{ type: 'Employee', id: 'ME' }],
    }),
    createEmployee: builder.mutation({
      query: (body) => ({ url: '/employees', method: 'post', data: body }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }, { type: 'Dashboard' }],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/employees/${id}`, method: 'put', data: body }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Employee', id }, { type: 'Employee', id: 'LIST' }],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({ url: `/employees/${id}`, method: 'delete' }),
      invalidatesTags: [{ type: 'Employee', id: 'LIST' }, { type: 'Dashboard' }],
    }),

    // ------------------------------------------------------------------
    // Documents
    // ------------------------------------------------------------------
    getPendingDocuments: builder.query({
      query: () => ({ url: '/employees/documents/pending', method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: [{ type: 'EmployeeDocuments', id: 'PENDING' }],
    }),
    getEmployeeDocuments: builder.query({
      query: (employeeId) => ({ url: `/employees/${employeeId}/documents`, method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, employeeId) => [{ type: 'EmployeeDocuments', id: employeeId }],
    }),
    uploadEmployeeDocument: builder.mutation({
      query: ({ employeeId, formData }) => ({
        url: `/employees/${employeeId}/documents`,
        method: 'post',
        data: formData,
        // Let the browser set the multipart boundary — overriding the
        // instance's default 'application/json' header.
        headers: { 'Content-Type': undefined },
      }),
      invalidatesTags: (result, error, { employeeId }) => [
        { type: 'EmployeeDocuments', id: employeeId },
        { type: 'EmployeeDocuments', id: 'PENDING' },
      ],
    }),
    verifyEmployeeDocument: builder.mutation({
      query: ({ employeeId, documentId, status, remarks }) => ({
        url: `/employees/${employeeId}/documents/${documentId}/verify`,
        method: 'patch',
        data: { status, remarks },
      }),
      invalidatesTags: (result, error, { employeeId }) => [
        { type: 'EmployeeDocuments', id: employeeId },
        { type: 'EmployeeDocuments', id: 'PENDING' },
      ],
    }),

    // ------------------------------------------------------------------
    // Onboarding
    // ------------------------------------------------------------------
    getEmployeeOnboarding: builder.query({
      query: (employeeId) => ({ url: `/employees/${employeeId}/onboarding`, method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, employeeId) => [{ type: 'EmployeeOnboarding', id: employeeId }],
    }),
    toggleOnboardingStep: builder.mutation({
      query: ({ employeeId, stepId, completed }) => ({
        url: `/employees/${employeeId}/onboarding/${stepId}`,
        method: 'patch',
        data: { completed },
      }),
      invalidatesTags: (result, error, { employeeId }) => [{ type: 'EmployeeOnboarding', id: employeeId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useGetMyEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeDocumentsQuery,
  useGetPendingDocumentsQuery,
  useUploadEmployeeDocumentMutation,
  useVerifyEmployeeDocumentMutation,
  useGetEmployeeOnboardingQuery,
  useToggleOnboardingStepMutation,
} = employeeApi;
