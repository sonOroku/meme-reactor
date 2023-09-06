import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const memeApi = createApi({
  reducerPath: "memeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),

  endpoints: (builder) => ({
    getAllMemes: builder.query({
      query: () => "/api/memes",
      providesTags: [{ id: "All", type: "Memes" }],
      transformResponse: (memes) => {
        if (memes) {
          memes.sort(
            (a, b) => new Date(b["created_at"]) - new Date(a["created_at"])
          );
        }
        return memes;
      },
    }),

    getMeme: builder.query({
      query: (meme_id) => {
        return {
          url: `/api/memes/${meme_id}`,
          credentials: "include",
        }
      },
      providesTags: [{id: "One", type: "Memes"}]
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
        };
      },
      transformResponse: (response) =>
        response.sort((a, b) => {
          const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1; // a should come before b in the sorted order
          } else if (nameA > nameB) {
            return 1; // a should come after b in the sorted order
          } else {
            return 0; // names are equal
          }
        }),
    }),

    createMeme: builder.mutation({
      query: (input) => {
        return {
          url: "/api/memes",
          method: "POST",
          body: input,
          credentials: "include",
        };
      },
      invalidatesTags: ["Memes"],
    }),

    getUserMemes: builder.query({
      query: () => {
        return {
          url: "/api/memes/mine",
          credentials: "include",
        };
      },
      providesTags: [{ id: "Mine", type: "Memes" }],
      transformResponse: (memes) => {
        if (memes) {
          memes.sort(
            (a, b) => new Date(b["created_at"]) - new Date(a["created_at"])
          );
        }
        return memes;
      },
    }),

    createLike: builder.mutation({
      query: (input) => {
        return {
          url: `/api/memes/${input.meme_id}/likes`,
          credentials: "include",
          method: "POST",
        };
      },
      invalidatesTags: ["Likes"],
    }),

    getLikes: builder.query({
      query: () => {
        return {
          url: "/api/likes/mine",
          credentials: "include",
        };
      },
      transformResponse: (likes) => {
        const myLikes = likes.likes
        if (myLikes) {
          myLikes.sort(
            (a, b) => new Date(b["liked_at"]) - new Date(a["liked_at"])
          );
          return myLikes;
        }
      },
      providesTags: ["Likes"],
    }),

    unlike: builder.mutation({
      query: (input) => {
        return {
          url: `/api/likes/${input.like_id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["Likes", "Memes"],
    }),
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
  useGetLikesQuery,
  useUnlikeMutation,
  useGetMemeQuery,
} = memeApi;
