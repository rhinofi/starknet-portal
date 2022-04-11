import { PayloadAction } from '@reduxjs/toolkit'

import { deposit, depositEth } from '../../api/bridge'
import { DepositPayload } from '../../redux/slices/walletSlice.types'
import { l1_getContract } from '../../utils/contract'
import { Layers } from '../../utils/layer'
import { getTokenDetails } from '../../utils/tokens'
import { chainId } from './approval'

const starknetEthBridgeABI = require('../../abis/l1/StarknetEthBridge.json')
const starknetERC20BridgeABI = require('../../abis/l1/StarknetERC20Bridge.json')

export function * handleDeposit (action: PayloadAction<DepositPayload>) {
  const { fromAddress, toAddress, amount, token } = action.payload

  const tokenDetails = getTokenDetails(Layers.L1, token)
  const tokenBridgeAddress = tokenDetails.bridgeAddress[chainId]

  if (token === 'ETH') {
    const contract = l1_getContract(tokenBridgeAddress, starknetEthBridgeABI)

    yield depositEth({
      recipient: toAddress,
      amount: amount.toString(),
      contract,
      options: {
        from: fromAddress
      },
      emitter: (error: any, transactionHash: string) => {
        if (!error) {
          console.log('Tx hash received', { transactionHash })
        }
      }
    })
  } else {
    const contract = l1_getContract(
      tokenBridgeAddress,
      starknetERC20BridgeABI
    )

    yield deposit({
      recipient: toAddress,
      amount: amount.toString(),
      decimals: tokenDetails.decimals,
      contract,
      options: {
        from: fromAddress
      },
      emitter: (error: any, transactionHash: string) => {
        if (!error) {
          console.log('Tx hash received', { transactionHash })
        }
      }
    })
  }
}
