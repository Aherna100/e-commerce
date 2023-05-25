import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiStore = createApi({
    reducerPath: 'apiStore',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                return headers
            }
        },
        // credentials: "include"
    }),
    tagTypes: ["item"],
    endpoints: (builder) => ({
        getProductsLimit: builder.query({
            query: (page) => `/product?page=${page}&limit=8`
        }),
        getItemProduct: builder.query({
            query: productId => `/product/${productId}`
        }),
        getOrderItems: builder.query({
            query: () => `/order`,
            providesTags: ["item"]
        }),
        getOrderDetails: builder.query({
            query: (id) => `/order/${id}`,
            providesTags: ["item"]
        }),
        deleteItem: builder.mutation({
            query: (itemId) => ({
                url: `/order/${itemId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["item"]
        }),
        addItemOrder: builder.mutation({
            query: (body) => ({
                url: `/order/neworder/items`,
                method: 'POST',
                body
            }),
            invalidatesTags: ["item"]
        }),
        updateOrderQuantity: builder.mutation({
            query: (body) => ({
                url: `/order/${body.orderId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ["item"]
        }),
        getVerifyUserStatus: builder.query({
            query: () => ({
                url: `/auth/current-session`,
                credentials: "include"
            })
        }),

    })


})

export const {
    useGetProductsLimitQuery,
    useGetItemProductQuery,
    useGetOrderItemsQuery,
    useGetOrderDetailsQuery,
    useDeleteItemMutation,
    useAddItemOrderMutation,
    useUpdateOrderQuantityMutation,

    useGetVerifyUserStatusQuery
} = apiStore;