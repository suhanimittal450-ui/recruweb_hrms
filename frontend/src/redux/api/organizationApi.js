import { baseApi } from './baseApi';

const makeOrgResource = (builder, { path, tag }) => ({
  [`get${tag}s`]: builder.query({
    query: (params) => ({ url: `/organization/${path}`, method: 'get', params }),
    transformResponse: (response) => response.data,
    providesTags: (result) =>
      Array.isArray(result)
        ? [...result.map((item) => ({ type: tag, id: item._id })), { type: tag, id: 'LIST' }]
        : [{ type: tag, id: 'LIST' }],
  }),
  [`create${tag}`]: builder.mutation({
    query: (body) => ({ url: `/organization/${path}`, method: 'post', data: body }),
    invalidatesTags: [{ type: tag, id: 'LIST' }],
  }),
  [`update${tag}`]: builder.mutation({
    query: ({ id, ...body }) => ({ url: `/organization/${path}/${id}`, method: 'put', data: body }),
    invalidatesTags: (result, error, { id }) => [{ type: tag, id }, { type: tag, id: 'LIST' }],
  }),
  [`delete${tag}`]: builder.mutation({
    query: (id) => ({ url: `/organization/${path}/${id}`, method: 'delete' }),
    invalidatesTags: [{ type: tag, id: 'LIST' }],
  }),
});

export const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ...makeOrgResource(builder, { path: 'companies', tag: 'Company' }),
    ...makeOrgResource(builder, { path: 'branches', tag: 'Branch' }),
    ...makeOrgResource(builder, { path: 'departments', tag: 'Department' }),
    ...makeOrgResource(builder, { path: 'designations', tag: 'Designation' }),
    getOrganizationTree: builder.query({
      query: () => ({ url: '/organization/tree', method: 'get' }),
      transformResponse: (response) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompanysQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetBranchsQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDesignationsQuery,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
  useGetOrganizationTreeQuery,
} = organizationApi;
