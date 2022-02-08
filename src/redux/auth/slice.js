import { createSlice } from '@reduxjs/toolkit'
import { getDataUser, setDataUser } from './operations'

const initialState = {
  name: '',
  token: '',
  uid: '',
  type: '',
  words: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createUser(state, { payload }) {
      state.token = payload.token
      state.uid = payload.uid
    },
    setName(state, { payload }) {
      state.name = payload
    },
    removeUser(state) {
      state.token = ''
      state.uid = ''
      state.name = ''
    },
  },
  extraReducers: {
    [getDataUser.fulfilled](state, { payload }) {
      state.type = payload.type
      state.words = [...payload.data.words]
    },
    [setDataUser.fulfilled](state, { payload }) {
      state.type = payload.type
      state.words = [...payload.data.words]
    },
  },
})

export const { createUser, setName, removeUser } = authSlice.actions
export default authSlice.reducer
