import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const memeApi = createApi({
    reducerPath: 'memeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getAllMemes: builder.query({
            query: () => '/api/memes',
        })
    })
})

export const {
    useGetAllMemesQuery,
} = memeApi;
