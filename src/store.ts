import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'

import bridgeReducer from './redux/slices/bridgeSlice'
import modalReducer from './redux/slices/modalSlice'
import notificationsReducer from './redux/slices/notificationsSlice'
import pricesReducer from './redux/slices/pricesSlice'
import walletReducer from './redux/slices/walletSlice'
import sagas from './sagas/index'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    modal: modalReducer,
    notifications: notificationsReducer,
    prices: pricesReducer,
    bridge: bridgeReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(sagas)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
