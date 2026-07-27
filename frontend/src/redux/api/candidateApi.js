import { baseApi } from './baseApi';

export const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: (params) => ({ url: '/candidates', method: 'get', params }),
      transformResponse: (response) => response.data?.candidates || [],
      providesTags: [{ type: 'Candidate', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCandidatesQuery } = candidateApi;
