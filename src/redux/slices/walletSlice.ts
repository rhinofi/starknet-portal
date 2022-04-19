import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import {
  APPROVE_TOKEN,
  CLAIM_WITHDRAW,
  CONNECT_WALLET_L1,
  CONNECT_WALLET_L2,
  DEPOSIT,
  DISCONNECT_WALLET_L1,
  DISCONNECT_WALLET_L2,
  FETCH_ALLOWANCE,
  FETCH_BALANCES_L1,
  FETCH_BALANCES_L2,
  INITIATE_WITHDRAW
} from '../../types'
import { Layers } from '../../utils/layer'
import {
  ApproveTokenPayload,
  DepositPayload,
  FetchAllowancePayload,
  FetchBalancesPayload,
  SetAllowancePayload,
  SetBalancesL1Payload,
  WalletState,
  WithdrawPayload
} from './walletSlice.types'

const initialState: WalletState = {
  [Layers.L1]: {
    address: '',
    web3Modal: null,
    allowances: {},
    balances: {}
  },
  [Layers.L2]: {
    address: '',
    web3Modal: null,
    allowances: {},
    balances: {}
  }
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setL1: (state, action) => {
      state[Layers.L1] = action.payload
    },
    setL2: (state, action) => {
      state[Layers.L2] = action.payload
    },
    setAddressL1: (state, action: PayloadAction<string>) => {
      state[Layers.L1].address = action.payload
    },
    setAddressL2: (state, action: PayloadAction<string>) => {
      state[Layers.L2].address = action.payload
    },
    clearL1: (state) => {
      state[Layers.L1] = initialState[Layers.L1]
    },
    clearL2: (state) => {
      state[Layers.L2] = initialState[Layers.L2]
    },
    setAllowance: (state, action: PayloadAction<SetAllowancePayload>) => {
      // TODO: keep other allowances
      state[Layers.L1].allowances = {
        [action.payload.token]: action.payload.allowance
      }
    },
    setBalancesL1: (state, action: PayloadAction<SetBalancesL1Payload>) => {
      state[Layers.L1].balances = action.payload.balances
    },
    setBalancesL2: (state, action: PayloadAction<SetBalancesL1Payload>) => {
      state[Layers.L2].balances = action.payload.balances
    }
  }
})

// Actions
export const connectWalletL1 = createAction(CONNECT_WALLET_L1)
export const connectWalletL2 = createAction(CONNECT_WALLET_L2)
export const disconnectWalletL1 = createAction(DISCONNECT_WALLET_L1)
export const disconnectWalletL2 = createAction(DISCONNECT_WALLET_L2)
export const fetchAllowance =
  createAction<FetchAllowancePayload>(FETCH_ALLOWANCE)
export const approveToken = createAction<ApproveTokenPayload>(APPROVE_TOKEN)
export const deposit = createAction<DepositPayload>(DEPOSIT)
export const initiateWithdraw = createAction<WithdrawPayload>(INITIATE_WITHDRAW)
export const claimWithdraw = createAction<WithdrawPayload>(CLAIM_WITHDRAW)
export const fetchBalancesL1 = createAction<FetchBalancesPayload>(FETCH_BALANCES_L1)
export const fetchBalancesL2 = createAction<FetchBalancesPayload>(FETCH_BALANCES_L2)

export const { setL1, setL2, setAddressL1, setAddressL2, clearL1, clearL2, setAllowance, setBalancesL1, setBalancesL2 } =
  walletSlice.actions

// Selectors
export const selectLayer = (layer: Layers) => (state: RootState) =>
  state.wallet[layer]
export const selectAddress = (layer: Layers) => (state: RootState) =>
  state.wallet[layer].address
export const selectAllowances = (layer: Layers) => (state: RootState) =>
  state.wallet[layer].allowances
export const selectBalances = (layer: Layers) => (state: RootState) =>
  state.wallet[layer].balances
export const selectWeb3Modal = (layer: Layers) => (state: RootState) =>
  state.wallet[layer].web3Modal

export default walletSlice.reducer
