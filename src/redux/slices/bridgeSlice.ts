import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash'

import { RootState } from '../../store'
import { BridgeState, DepositState, WithdrawalState } from './bridgeSlice.types'

const initialState: BridgeState = {
  deposit: {},
  withdrawal: {}
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
    },
    addWithdrawal: (state, action: PayloadAction<WithdrawalState>) => {
      state.withdrawal = action.payload
    },
    updateWithdrawal: (state, action) => {
      state.withdrawal = merge(state.withdrawal, action.payload)
    }
  }
})

// Actions
export const { addDeposit, updateDeposit, addWithdrawal, updateWithdrawal } = bridgeSlice.actions

// Selectors
export const selectDeposit = (state: RootState) => state.bridge.deposit
export const selectWithdrawal = (state: RootState) => state.bridge.withdrawal

export default bridgeSlice.reducer
