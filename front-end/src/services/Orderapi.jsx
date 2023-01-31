// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/order/' }),
  tagTypes: ['Category', 'Myproduct'],

  endpoints: (builder) => ({
      myOrders: builder.query({
        query: (access_token ) => {
          return {
            url: `order/`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
              }
            
          }
        },
        providesTags: ['Myproduct'],

      }),
      makeOrder: builder.mutation({
        query: ({ actulData, access_token }) => {
          return {
            url: 'placeorder/',
            method: 'POST',
            body: actulData,
            headers: {
              'authorization': `Bearer ${access_token}`,
            }
          }
        }
      }),
      
})
})


export const { useMyOrdersQuery,useMakeOrderMutation} = orderApi