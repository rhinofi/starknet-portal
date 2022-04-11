import { takeLatest } from '@redux-saga/core/effects'

import {
  APPROVE_TOKEN,
  CONNECT_WALLET_L1,
  CONNECT_WALLET_L2,
  DEPOSIT,
  DISCONNECT_WALLET_L1,
  DISCONNECT_WALLET_L2,
  FETCH_ALLOWANCE,
  FETCH_BALANCES_L1,
  FETCH_BALANCES_L2,
  WITHDRAW
} from '../../types'
import { handleApproveToken, handleFetchAllowance } from './approval'
import { handleFetchBalancesL1, handleFetchBalancesL2 } from './balances'
import { handleConnectWalletL1, handleConnectWalletL2, handleDisconnectWalletL1, handleDisconnectWalletL2 } from './connection'
import { handleDeposit } from './deposit'
import { handleWithdraw } from './withdraw'

export function * walletSaga () {
  yield takeLatest(CONNECT_WALLET_L1, handleConnectWalletL1)
  yield takeLatest(DISCONNECT_WALLET_L1, handleDisconnectWalletL1)
  yield takeLatest(CONNECT_WALLET_L2, handleConnectWalletL2)
  yield takeLatest(DISCONNECT_WALLET_L2, handleDisconnectWalletL2)
  yield takeLatest(FETCH_ALLOWANCE, handleFetchAllowance)
  yield takeLatest(APPROVE_TOKEN, handleApproveToken)
  yield takeLatest(DEPOSIT, handleDeposit)
  yield takeLatest(WITHDRAW, handleWithdraw)
  yield takeLatest(FETCH_BALANCES_L1, handleFetchBalancesL1)
  yield takeLatest(FETCH_BALANCES_L2, handleFetchBalancesL2)
}
