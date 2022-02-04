import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { wordsSlice } from './words/slice'
import typeReducer from './typeWord/slice'
import authReducer from './auth/slice'

const persistConfig = {
  key: 'auth',
  storage,
}

const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
]

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    enwords: wordsSlice.reducer,
    typeWords: typeReducer,
  },
  middleware,
})

export const storePersist = persistStore(store)
setupListeners(store.dispatch)
