import { Contract as L2Contract } from 'starknet'
import { Contract as L1Contract } from 'web3-eth-contract'

import {
  l1_callContract,
  l1_sendTransaction,
  l2_sendTransaction
} from '../utils/contract'
import {
  parseFromDecimals,
  parseToDecimals,
  parseToFelt,
  parseToUint256
} from '../utils/number'

type DepositProps = {
  recipient: string
  amount: string
  decimals?: number
  contract: L1Contract
  options?: any
  emitter: any
}

export const deposit = async ({
  recipient,
  amount,
  decimals,
  contract,
  options,
  emitter
}: DepositProps) => {
  try {
    return l1_sendTransaction(
      contract,
      'deposit',
      [parseToDecimals(amount, decimals).toString(), recipient],
      options,
      emitter
    )
  } catch (ex) {
    return Promise.reject(ex)
  }
}

export const depositEth = async ({
  recipient,
  amount,
  contract,
  options,
  emitter
}: DepositProps) => {
  try {
    return l1_sendTransaction(
      contract,
      'deposit',
      [recipient],
      {
        ...options,
        value: parseToDecimals(amount)
      },
      emitter
    )
  } catch (ex) {
    return Promise.reject(ex)
  }
}

export const withdraw = async ({
  recipient,
  amount,
  decimals,
  contract,
  emitter
}: DepositProps) => {
  try {
    return l1_sendTransaction(
      contract,
      'withdraw',
      [parseToDecimals(amount, decimals).toString(), recipient],
      {
        from: recipient
      },
      emitter
    )
  } catch (ex) {
    return Promise.reject(ex)
  }
}

type MaxDepositProps = {
  decimals: number
  contract: L1Contract
}
export const maxDeposit = async ({ decimals, contract }: MaxDepositProps) => {
  try {
    const maxDeposit = await l1_callContract(contract, 'maxDeposit')
    return parseFromDecimals(maxDeposit, decimals)
  } catch (ex) {
    return Promise.reject(ex)
  }
}

interface InitiateWithdraw {
  recipient: string
  amount: string
  decimals: number
  contract: L2Contract
}

export const initiateWithdraw = async ({
  recipient,
  amount,
  decimals,
  contract
}: InitiateWithdraw) => {
  try {
    return l2_sendTransaction(contract, 'initiate_withdraw', {
      l1Recipient: parseToFelt(recipient),
      amount: parseToUint256(amount, decimals) as any
    })
  } catch (ex) {
    return Promise.reject(ex)
  }
}
