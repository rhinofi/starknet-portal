import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash'

import { RootState } from '../../store'
import { FETCH_PRICES } from '../../types'

export interface PricesState {
  [key: string]: number
}

const initialState: PricesState = {}

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<PricesState>) => {
      state = merge(state, action.payload)
    }
  }
})

// Actions
export const { setPrices } = pricesSlice.actions
export const fetchPrices = createAction(FETCH_PRICES)

// Selectors
export const selectPrices = (state: RootState) => state.prices

export default pricesSlice.reducer
