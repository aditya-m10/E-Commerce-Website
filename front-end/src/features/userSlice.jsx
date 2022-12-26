import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "",
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name
    },
    unsetUserInfo: (state, action) => {
      state.name = action.payload.name
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer