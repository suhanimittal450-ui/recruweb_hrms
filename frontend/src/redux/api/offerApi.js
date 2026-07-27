import { baseApi } from './baseApi';

export const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => ({ url: '/offers', method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map((o) => ({ type: 'Offer', id: o._id })), { type: 'Offer', id: 'LIST' }]
          : [{ type: 'Offer', id: 'LIST' }],
    }),
    getOfferById: builder.query({
      query: (id) => ({ url: `/offers/${id}`, method: 'get' }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: 'Offer', id }],
    }),
    createOffer: builder.mutation({
      query: (body) => ({ url: '/offers', method: 'post', data: body }),
      invalidatesTags: [{ type: 'Offer', id: 'LIST' }],
    }),
    updateOfferStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/offers/${id}/status`, method: 'patch', data: { status } }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Offer', id }, { type: 'Offer', id: 'LIST' }],
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({ url: `/offers/${id}`, method: 'delete' }),
      invalidatesTags: [{ type: 'Offer', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOffersQuery,
  useGetOfferByIdQuery,
  useCreateOfferMutation,
  useUpdateOfferStatusMutation,
  useDeleteOfferMutation,
} = offerApi;
