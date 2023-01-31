// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/product/' }),
  tagTypes: ['Category', 'Myproduct'],

  endpoints: (builder) => ({
      categoryProduct: builder.query({
        query: ( category  ) => {
          return {
            url: `category/${category}`,
            method: 'GET',
            
          }
        },
        providesTags: ['Myproduct'],

      }),
      myProduct: builder.query({
        query: (access_token) => {
          return {
            url: 'myproduct/',
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${access_token}`,
            }
            
          }
        },
        providesTags: ['Myproduct'],

      }),
      deleteProduct: builder.mutation({
        query: ({id,access_token}) => {
          return{
          url: `delete/${id}`,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          }
        }
      },
      invalidatesTags: ['Myproduct'],

    }),
    addProduct: builder.mutation({
      query: ({ formField, access_token }) => {
        return {
          url: 'create/',
          method: 'POST',
          body: formField,
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      },
      invalidatesTags: ['Myproduct'],

    }),
})
})


export const { useCategoryProductQuery,useMyProductQuery,useDeleteProductMutation,useAddProductMutation} = productApi