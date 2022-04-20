import { Contract as L1Contract } from 'web3-eth-contract'

import {
  l1_callContract,
  l1_sendTransaction,
  l2_callContract
} from '../utils/contract'
import { parseFromDecimals, parseFromUint256 } from '../utils/number'
import { web3 } from '../web3'

type ApproveProps = {
  spender: string
  value: string
  contract: L1Contract
  options: Object
}
export const approve = async ({
  spender,
  value,
  contract,
  options
}: ApproveProps) => {
  try {
    return await l1_sendTransaction(
      contract,
      'approve',
      [spender, value],
      options
    )
  } catch (ex) {
    return Promise.reject(ex)
  }
}

type AllowanceProps = {
  owner: string
  spender: string
  decimals: number
  contract: L1Contract
}

export const allowance = async ({
  owner,
  spender,
  decimals,
  contract
}: AllowanceProps) => {
  try {
    const allow = await l1_callContract(contract, 'allowance', [owner, spender])
    return parseFromDecimals(allow, decimals)
  } catch (ex) {
    return Promise.reject(ex)
  }
}

type BalanceOfProps = {
  account: string
  decimals: number
  contract: any
}
export const balanceOf = async (
  { account, decimals, contract }: BalanceOfProps,
  isL1 = true
) => {
  try {
    if (isL1) {
      const balance = await l1_callContract(contract, 'balanceOf', [account])
      return parseFromDecimals(balance, decimals)
    } else {
      const { balance } = await l2_callContract(contract, 'balanceOf', [account, { blockIdentifier: 'pending' }])
      return parseFromUint256(balance as any, decimals)
    }
  } catch (ex) {
    return Promise.reject(ex)
  }
}

export const l1_ethBalanceOf = async (account: string) => {
  try {
    const balance = await web3.eth.getBalance(account)
    return parseFromDecimals(balance)
  } catch (ex) {
    return Promise.reject(ex)
  }
}
