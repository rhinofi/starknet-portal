import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'

import modalReducer from './redux/slices/modalSlice'
import walletReducer from './redux/slices/walletSlice'
import sagas from './sagas/index'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    modal: modalReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(sagas)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
