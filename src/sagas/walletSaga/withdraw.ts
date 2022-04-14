import { PayloadAction } from '@reduxjs/toolkit'

import { initiateWithdraw } from '../../api/bridge'
import { WithdrawPayload } from '../../redux/slices/walletSlice.types'
import { ABIS } from '../../utils/abis'
import { l2_getContract } from '../../utils/contract'
import { Layers } from '../../utils/layer'
import { getTokenDetails } from '../../utils/tokens'
import { chainId } from './approval'

export function * handleWithdraw (action: PayloadAction<WithdrawPayload>) {
  const { toAddress, amount, token } = action.payload

  const tokenDetails = getTokenDetails(Layers.L2, token)
  const tokenBridgeAddress = tokenDetails.bridgeAddress[chainId]

  const contract = l2_getContract(tokenBridgeAddress, ABIS.L2_TOKEN_BRIDGE)

  yield initiateWithdraw({
    recipient: toAddress,
    amount: amount.toString(),
    decimals: tokenDetails.decimals,
    contract
  })
}
