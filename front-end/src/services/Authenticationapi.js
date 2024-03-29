// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({
      registerUser: builder.mutation({
      query: (user) => {
        return {
            url:'register/',
            method:'POST',
            body:user,
            headers: {
              'Content-type': 'application/json',
            }
        }
      }
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
            url:'login/',
            method:'POST',
            body:user,
            headers: {
              'Content-type': 'application/json',
            }
        }
      }
    }),
    sendEmail: builder.mutation({
      query: (user) => {
        return {
            url:'passemailreset/',
            method:'POST',
            body:user,
            headers: {
              'Content-type': 'application/json',
            }
        }
      }
    }),
    getDataUser: builder.query({
      query: (access_token) => {
        return {
          url: 'profile/',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: 'passchange/',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${access_token}`,
          }
        }
      }
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `passreset/${id}/${token}`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    
    
  }),
})



export const { useRegisterUserMutation ,useLoginUserMutation ,useSendEmailMutation ,useGetDataUserQuery,useChangeUserPasswordMutation,useResetPasswordMutation} = authApi