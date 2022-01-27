import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface UserState {
  l1: Layer
  l2: Layer
}

interface Layer {
  address: string
  balances: TokenBalance[]
}

interface TokenBalance {
  symbol: string
  name: string
  balance: number
}

const initialState: UserState = {
  l1: {
    address: '',
    balances: []
  },
  l2: {
    address: '',
    balances: []
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddressL1: (state, action: PayloadAction<string>) => {
      state.l1.address = action.payload
    },
    setAddressL2: (state, action: PayloadAction<string>) => {
      state.l2.address = action.payload
    },
    setBalancesL1: (state, action: PayloadAction<TokenBalance[]>) => {
      state.l1.balances = action.payload
    },
    setBalancesL2: (state, action: PayloadAction<TokenBalance[]>) => {
      state.l2.balances = action.payload
    }
  }
})

export const { setAddressL1 } = userSlice.actions
export const { setAddressL2 } = userSlice.actions
export const { setBalancesL1 } = userSlice.actions
export const { setBalancesL2 } = userSlice.actions

export const selectAddressL1 = (state: RootState) => state.user.l1.address
export const selectAddressL2 = (state: RootState) => state.user.l2.address
export const selectBalancesL1 = (state: RootState) => state.user.l1.balances
export const selectBalancesL2 = (state: RootState) => state.user.l2.balances

export default userSlice.reducer
