import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const memeApi = createApi({
    reducerPath: 'memeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST
    }),
    endpoints: (builder) => ({
        getAllMemes: builder.query({
            query: () => '/api/memes',
        }),
        login: builder.mutation({
            query: (input) => {
                console.log(input)
                const formData = new FormData();
                formData.append('username', input.username)
                formData.append('password', input.password)
                console.log(formData)
                return {
                    url: '/token',
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                }
            }
        }),
        getToken: builder.query({
            query: () => ({
                url: "/token",
                credentials: "include"
            }),
            providesTags: ['Token']
        })
    })
})

export const {
    useGetAllMemesQuery,
    useLoginMutation,
} = memeApi;
