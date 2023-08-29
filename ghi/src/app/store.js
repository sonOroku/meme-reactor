import { configureStore } from '@reduxjs/toolkit'
import { memeApi } from './apiSlice'

export const store = configureStore({
    reducer: {
        [memeApi.reducerPath]: memeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(memeApi.middleware)
})
