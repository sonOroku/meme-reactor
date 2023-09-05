import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const memeApi = createApi({
  reducerPath: "memeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),

  endpoints: (builder) => ({
    getAllMemes: builder.query({
      query: () => "/api/memes",
      providesTags: ["Memes"],
    }),

    login: builder.mutation({
      query: (input) => {
        const formData = new FormData();
        formData.append("username", input.username);
        formData.append("password", input.password);

        return {
          url: "/token",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Token"],
    }),

    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      transformResponse: (response) => response?.account || null,
      providesTags: ["Token"],
    }),

    signUp: builder.mutation({
      query: (body) => {
        return {
          url: "/api/accounts",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Token"],
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: "/token",
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Token"],
    }),

    getTemplates: builder.query({
        query: () => {
            return {
                url: "/api/memes/templates",
                credentials: "include",
            }
        }
    }),

    createMeme: builder.mutation({
        query: (input) => {
            return {
                url: "/api/memes",
                method: "POST",
                body: input,
                credentials: "include",
            }
        },
        invalidatesTags: ["Memes"]
    }),

    getUserMemes: builder.query({
      query: () => {
        return {
          url: "/api/memes/mine",
          credentials: "include",
        }
      },
      transformResponse: (memes) => {
        if(memes){
        memes.sort((a, b) => new Date(b["created_at"]) - new Date(a["created_at"]))
        }
        return memes
      }
    }),

    createLike: builder.mutation({
      query: (input) => {
        return {
          url: `/api/memes/${input.meme_id}/likes`,
          credentials: "include",
          method: "POST"
        }
      },
    })

  }),
});

export const {
  useGetAllMemesQuery,
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useGetTokenQuery,
  useGetTemplatesQuery,
  useCreateMemeMutation,
  useGetUserMemesQuery,
  useCreateLikeMutation,
} = memeApi;
