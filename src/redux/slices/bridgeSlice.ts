import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash'

import { RootState } from '../../store'
import { BridgeState, DepositState } from './bridgeSlice.types'

const initialState: BridgeState = {
  deposit: {}
}

export const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    addDeposit: (state, action: PayloadAction<DepositState>) => {
      state.deposit = action.payload
    },
    updateDeposit: (state, action) => {
      state.deposit = merge(state.deposit, action.payload)
    }
  }
})

// Actions
export const { addDeposit, updateDeposit } = bridgeSlice.actions

// Selectors
export const selectDeposit = (state: RootState) => state.bridge.deposit

export default bridgeSlice.reducer
