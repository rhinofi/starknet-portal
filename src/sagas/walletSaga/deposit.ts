import { PayloadAction } from '@reduxjs/toolkit'

import { deposit, depositEth } from '../../api/bridge'
import { NOTIFICATIONS } from '../../constants/notifications'
import { TransactionStatuses } from '../../enums/TransactionStatuses'
import { addDeposit } from '../../redux/slices/bridgeSlice'
import { NotificationStatuses } from '../../redux/slices/notifications.types'
import { addNotification } from '../../redux/slices/notificationsSlice'
import { DepositPayload } from '../../redux/slices/walletSlice.types'
import { store } from '../../store'
import { ABIS } from '../../utils/abis'
import { l1_getContract } from '../../utils/contract'
import { Layers } from '../../utils/layer'
import { getTokenDetails } from '../../utils/tokens'
import { chainId } from './approval'

export function * handleDeposit (action: PayloadAction<DepositPayload>) {
  const { fromAddress, toAddress, amount, token } = action.payload

  const tokenDetails = getTokenDetails(Layers.L1, token)
  const tokenBridgeAddress = tokenDetails.bridgeAddress[chainId]

  if (token === 'ETH') {
    const contract = l1_getContract(tokenBridgeAddress, ABIS.L1_ETH_BRIDGE)

    yield depositEth({
      recipient: toAddress,
      amount: amount.toString(),
      contract,
      options: {
        from: fromAddress
      },
      emitter: emitter(amount, token)
    })
  } else {
    const contract = l1_getContract(
      tokenBridgeAddress,
      ABIS.L1_ERC20_BRIDGE
    )

    yield deposit({
      recipient: toAddress,
      amount: amount.toString(),
      decimals: tokenDetails.decimals,
      contract,
      options: {
        from: fromAddress
      },
      emitter: emitter(amount, token)
    })
  }
}

const emitter = (amount: string, token: string) => (error: any, transactionHash: string) => {
  if (!error) {
    console.log('Tx hash received', { transactionHash })
    store.dispatch(addNotification({
      id: NOTIFICATIONS.DEPOSIT_L1,
      title: 'Sending funds to L2 (1/2)',
      status: NotificationStatuses.PENDING,
      meta: {
        txHashL1: transactionHash,
        token,
        description: `${amount} ${token}`
      }
    }))
    store.dispatch(addDeposit({
      transactions: {
        [Layers.L1]: {
          hash: transactionHash,
          status: TransactionStatuses.PENDING
        }
      },
      amount,
      token
    }))
  }
}
