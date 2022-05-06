import { createSlice, DeepPartial, PayloadAction } from '@reduxjs/toolkit'
import concat from 'lodash/concat'
import filter from 'lodash/filter'
import map from 'lodash/map'
import merge from 'lodash/merge'

import { RootState } from '../../store'
import { Layers } from '../../utils/layer'
import { randomId } from '../../utils/notifications'
import { BridgeState, Transfer, TransferWithoutId } from './bridgeSlice.types'

const initialState: BridgeState = {
  transfers: [
    // TODO: remove
    // {
    //   id: 'fddgdg',
    //   amount: '0.01',
    //   type: 'deposit',
    //   token: 'SLF',
    //   timestamp: moment().subtract(2, 'minutes').toDate(),
    //   transactions: {
    //     [Layers.L1]: {
    //       hash: '0x5602a03828d2ae945e900fee60425b179d4043bf6661f4f68d3f15d4c36f6b23',
    //       status: TransactionStatuses.COMPLETED
    //     },
    //     [Layers.L2]: {
    //       hash: '0x24fd1c5148f222cde3468b53aab9db8c44f08edf76e492d8adac4fe9d3ca265',
    //       status: TransactionStatuses.PENDING
    //     }
    //   }
    // },
    // {
    //   id: 'fddgddddg',
    //   amount: '0.4',
    //   type: 'withdrawal',
    //   token: 'ETH',
    //   timestamp: moment().subtract(20, 'minutes').toDate(),
    //   transactions: {
    //     [Layers.L2]: {
    //       hash: '0x24fd1c5148f222cde3468b53aab9db8c44f08edf76e492d8adac4fe9d3ca265',
    //       status: TransactionStatuses.PENDING
    //     }
    //   }
    // }
  ]
}

export const bridgeSlice = createSlice({
  name: 'bridge',
  initialState,
  reducers: {
    addTransfer: (state, action: PayloadAction<TransferWithoutId>) => {
      state.transfers = concat(state.transfers, {
        id: randomId(),
        ...action.payload
      })
    },
    updateTransfer: (state, action: PayloadAction<{ id: string, transfer: DeepPartial<Transfer> }>) => {
      state.transfers = map(state.transfers, t => t.id === action.payload.id ? merge(t, action.payload.transfer) : t)
    },
    removeTransfer: (state, action: PayloadAction<string>) => {
      state.transfers = filter(state.transfers, t => t.id !== action.payload)
    }
  }
})

// Actions
export const { addTransfer, updateTransfer, removeTransfer } = bridgeSlice.actions

// Selectors
export const selectDeposits = (state: RootState) => filter(state.bridge.transfers, t => t.type === 'deposit')
export const selectWithdrawals = (state: RootState) => filter(state.bridge.transfers, t => t.type === 'withdrawal')
export const selectTransferByTxHash = (txHash: string) => (state: RootState) => filter(state.bridge.transfers, t => t?.transactions?.[Layers.L1]?.hash === txHash || t?.transactions?.[Layers.L2]?.hash === txHash)[0]
export const selectTransferById = (id: string) => (state: RootState) => filter(state.bridge.transfers, t => t?.id === id)?.[0]

export default bridgeSlice.reducer
