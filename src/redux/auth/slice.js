import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  token: "",
  uid: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser(state, { payload }) {
      state.token = payload.token;
      state.uid = payload.uid;
    },
    setName(state, { payload }) {
      state.name = payload;
    },
    removeUser(state) {
      state.token = "";
      state.uid = "";
      state.name = "";
    },
  },
});

export const { createUser, setName, removeUser } = authSlice.actions;
export default authSlice.reducer;
