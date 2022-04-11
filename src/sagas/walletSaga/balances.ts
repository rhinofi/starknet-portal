import { put } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { keyBy } from 'lodash'
import { Abi } from 'starknet'
import { AbiItem } from 'web3-utils'

import { balanceOf, l1_ethBalanceOf } from '../../api/erc20'
import { L1Tokens } from '../../config/addresses/tokens/tokens.l1'
import { L2Tokens } from '../../config/addresses/tokens/tokens.l2'
import config from '../../config/config'
import { setBalancesL1, setBalancesL2 } from '../../redux/slices/walletSlice'
import { FetchBalancesPayload } from '../../redux/slices/walletSlice.types'
import { l1_getContract, l2_getContract } from '../../utils/contract'

const L1_ERC20_ABI = require('../../abis/l1/ERC20.json')
const L2_ERC20_ABI = require('../../abis/l2/ERC20.json')

const handleFetchBalances = async (account: string, isL1: boolean = true) => {
  const tokens = isL1 ? L1Tokens : L2Tokens

  if (!tokens || !account) {
    return []
  }

  try {
    const balanceOfPromises: any[] = []
    tokens.forEach(tokenConfig => {
      if (tokenConfig.tokenAddress) {
        const tokenContract = isL1
          ? l1_getContract(
            tokenConfig.tokenAddress[config.networkId],
                L1_ERC20_ABI as AbiItem[]
          )
          : l2_getContract(
            tokenConfig.tokenAddress[config.networkId],
                L2_ERC20_ABI as Abi[]
          )

        balanceOfPromises.push(
          balanceOf(
            {
              account,
              decimals: tokenConfig.decimals,
              contract: tokenContract
            },
            isL1
          )
        )
      } else {
        // ETH case
        balanceOfPromises.push(l1_ethBalanceOf(account))
      }
    })

    const balanceOfResults = await Promise.allSettled(balanceOfPromises)

    return tokens.map((token, index) => ({
      symbol: token.symbol,
      name: token.name,
      balance:
          balanceOfResults[index].status === 'rejected'
            ? 0
            : (balanceOfResults[index] as PromiseFulfilledResult<any>).value
    }))
  } catch (e) {
    console.error(e)
    return []
  }
}

export function * handleFetchBalancesL1 (action: PayloadAction<FetchBalancesPayload>) {
  const balances = yield handleFetchBalances(action?.payload?.address, true)
  yield put(setBalancesL1({ balances: keyBy(balances, 'symbol') }))
}

export function * handleFetchBalancesL2 (action: PayloadAction<FetchBalancesPayload>) {
  const balances = yield handleFetchBalances(action?.payload?.address, true)
  yield put(setBalancesL2({ balances: keyBy(balances, 'symbol') }))
}
