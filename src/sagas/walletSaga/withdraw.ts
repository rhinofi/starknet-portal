import { PayloadAction } from '@reduxjs/toolkit'

import { initiateWithdraw } from '../../api/bridge'
import { WithdrawPayload } from '../../redux/slices/walletSlice.types'
import { l2_getContract } from '../../utils/contract'
import { Layers } from '../../utils/layer'
import { getTokenDetails } from '../../utils/tokens'
import { chainId } from './approval'

const L2BridgeABI = require('../../abis/l2/token_bridge.json')

export function * handleWithdraw (action: PayloadAction<WithdrawPayload>) {
  console.log('handle withdraw')
  const { toAddress, amount, token } = action.payload

  const tokenDetails = getTokenDetails(Layers.L2, token)
  const tokenBridgeAddress = tokenDetails.bridgeAddress[chainId]

  const contract = l2_getContract(tokenBridgeAddress, L2BridgeABI)

  yield initiateWithdraw({
    recipient: toAddress,
    amount: amount.toString(),
    decimals: tokenDetails.decimals,
    contract
  })
}
