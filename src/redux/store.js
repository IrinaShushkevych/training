import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { wordsSlice } from "./words/slice";
import typeReducer from "./typeWord/slice";
import authReducer from "./auth/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    enwords: wordsSlice.reducer,
    typeWords: typeReducer,
  },
});

setupListeners(store.dispatch);
