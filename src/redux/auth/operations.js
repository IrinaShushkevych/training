import { createAsyncThunk } from '@reduxjs/toolkit'
import { getData, setData } from '../../services/firebase'

export const getDataUser = createAsyncThunk('auth/getData', async (data) => {
  const response = await getData(data.uid, data.type)
  return { type: data.type, data: response }
})

export const setDataUser = createAsyncThunk('auth/setData', async (data) => {
  console.log(data)
  const response = await setData(data.uid, data.data, data.type)
  return { type: data.type, data: response }
})
