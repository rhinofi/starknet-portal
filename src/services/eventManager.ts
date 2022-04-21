import { EventData } from 'web3-eth-contract'

import { L1Tokens } from '../config/addresses/tokens/tokens.l1'
import { L2Tokens } from '../config/addresses/tokens/tokens.l2'
import { config } from '../config/config'
import { events } from '../constants/events'
import { NOTIFICATIONS } from '../constants/notifications'
import { transactionHashPrefix } from '../constants/transactionHashPrefix'
import { TransactionStatuses } from '../enums/TransactionStatuses'
import { updateDeposit, updateWithdrawal } from '../redux/slices/bridgeSlice'
import { NotificationStatuses } from '../redux/slices/notifications.types'
import { addNotification, updateNotification } from '../redux/slices/notificationsSlice'
import { AppDispatch } from '../store'
import { ABIS } from '../utils/abis'
import { l1_getContract } from '../utils/contract'
import { getTransactionHash, listenContractEvent, waitForTransaction } from '../utils/events'
import { Layers } from '../utils/layer'

export const listenToLogMessageToL2Event = (dispatch: AppDispatch) => {
  const starknetMessagingContract = l1_getContract(config.starknetContract, ABIS.L1_MESSAGING)

  const filters = {
    from_address: L1Tokens.map(token => token.bridgeAddress[config.chainId]),
    to_address: L2Tokens.map(token => token.bridgeAddress[config.chainId])
  }

  const handleEmittedEvent = (error: Error, event: EventData) => {
    console.log('LogMessageToL2 event received', event, error)

    // Update L1 notification
    dispatch(updateNotification({
      id: NOTIFICATIONS.DEPOSIT_L1,
      title: 'L1 transaction executed.',
      status: NotificationStatuses.SUCCESS
    }))

    // Get L2 transaction hash
    const { to_address, from_address, selector, payload, nonce } = event.returnValues
    const txHashL2 = getTransactionHash(
      transactionHashPrefix.L1_HANDLER,
      from_address,
      to_address,
      selector,
      payload,
      nonce
    )
    console.log('L2 transaction hash', txHashL2)

    // Update the deposit transactions
    dispatch(updateDeposit({
      transactions: {
        [Layers.L1]: {
          status: TransactionStatuses.COMPLETED
        },
        [Layers.L2]: {
          hash: txHashL2,
          status: TransactionStatuses.PENDING
        }
      }
    }))

    // Add a notification for L2
    dispatch(addNotification({
      id: NOTIFICATIONS.DEPOSIT_L2,
      title: 'Sending funds to L2 (2/2)',
      status: NotificationStatuses.PENDING,
      meta: {
        // TODO: get deposit info
        // token: deposit?.token,
        // description: `${deposit?.amount} ${deposit?.token}`
      }
    }))

    waitForTransaction(txHashL2, 'ACCEPTED_ON_L2').then((res) => {
      console.log('L2 transaction completed')

      // Update deposit L2 transaction
      dispatch(updateDeposit({
        transactions: {
          [Layers.L2]: {
            status: TransactionStatuses.COMPLETED
          }
        }
      }))

      // Update L2 notification
      dispatch(updateNotification({
        id: NOTIFICATIONS.DEPOSIT_L2,
        title: 'Deposit completed.',
        status: NotificationStatuses.SUCCESS
      }))
    })
  }

  // Listen to the contract event with the params describes above
  listenContractEvent(starknetMessagingContract, events.LOG_MESSAGE_TO_L2, filters, handleEmittedEvent)
}

export const listenToLogWithdrawalEvent = (dispatch: AppDispatch) => {
  // TODO: extend to all tokens
  const starknetTokenBridgeContract = l1_getContract('0x160e7631f22035149A01420cADD1012267551181', ABIS.L1_ERC20_BRIDGE)

  const filters = {}

  const handleEmittedEvent = (error: Error, event: EventData) => {
    console.log('LogWithdrawal event received', event, error)

    // Update withdrawal L1 transaction
    dispatch(updateWithdrawal({
      transactions: {
        [Layers.L1]: {
          status: TransactionStatuses.COMPLETED
        }
      }
    }))

    // Update L1 notification
    dispatch(updateNotification({
      id: NOTIFICATIONS.WITHDRAWAL_L1,
      title: 'Withdrawal completed',
      status: NotificationStatuses.SUCCESS
    }))
  }

  listenContractEvent(starknetTokenBridgeContract, events.LOG_WITHDRAWAL, filters, handleEmittedEvent)
}
