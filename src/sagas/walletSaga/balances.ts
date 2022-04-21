import { put } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { keyBy } from 'lodash'
import { AbiItem } from 'web3-utils'

import { balanceOf, l1_ethBalanceOf } from '../../api/erc20'
import { L1Tokens } from '../../config/addresses/tokens/tokens.l1'
import { L2Tokens } from '../../config/addresses/tokens/tokens.l2'
import { config } from '../../config/config'
import { setBalancesL1, setBalancesL2 } from '../../redux/slices/walletSlice'
import { FetchBalancesPayload } from '../../redux/slices/walletSlice.types'
import { ABIS } from '../../utils/abis'
import { l1_getContract, l2_getContract } from '../../utils/contract'

const handleFetchBalances = async (account: string, isL1: boolean = true) => {
  const tokens = isL1 ? L1Tokens : L2Tokens
  console.log('config', config)
  if (!tokens || !account) {
    return []
  }

  try {
    const balanceOfPromises: any[] = []
    tokens.forEach(tokenConfig => {
      if (tokenConfig.tokenAddress) {
        const tokenContract = isL1
          ? l1_getContract(
            tokenConfig.tokenAddress[config.chainId],
                ABIS.L1_ERC20 as AbiItem[]
          )
          : l2_getContract(
            tokenConfig.tokenAddress[config.chainId],
            ABIS.L2_ERC20
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
  const balances = yield handleFetchBalances(action?.payload?.address, false)
  yield put(setBalancesL2({ balances: keyBy(balances, 'symbol') }))
}
