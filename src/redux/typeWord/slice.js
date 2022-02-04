import { createSlice } from '@reduxjs/toolkit'

const initialState = { type: '' }

const typeSlice = createSlice({
  name: 'typeWord',
  initialState,
  reducers: {
    setType(state, { payload }) {
      state.type = payload
    },
  },
})

export const { setType } = typeSlice.actions
export default typeSlice.reducer
