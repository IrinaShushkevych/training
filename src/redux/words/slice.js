import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/english.json";

export const wordsSlice = createSlice({
  name: "word",
  initialState: data,
  reducers: {},
});
