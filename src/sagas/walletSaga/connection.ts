import { getStarknet } from '@argent/get-starknet'
import { put, select } from '@redux-saga/core/effects'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import config from '../../config/config'
import { MODALS } from '../../constants/modals'
import { NOTIFICATIONS } from '../../constants/notifications'
import { toggleModal } from '../../redux/slices/modalSlice'
import { NotificationStatuses } from '../../redux/slices/notifications.types'
import { addNotification, updateNotification } from '../../redux/slices/notificationsSlice'
import { clearL1, clearL2, selectWeb3Modal, setAddressL2, setL1 } from '../../redux/slices/walletSlice'
import { Layers } from '../../utils/layer'

export function * handleConnectWalletL1 () {
  yield put(addNotification({
    id: NOTIFICATIONS.CONNECT_WALLET_L1,
    title: 'Connecting L1 wallet',
    status: NotificationStatuses.PENDING
  }))

  const web3Modal = new Web3Modal({
    network: config.chain.toLowerCase(), // optional
    cacheProvider: false, // optional
    providerOptions: {} // required
  })

  const provider = yield web3Modal.connect()
  const web3 = new Web3(provider)
  const accounts = yield web3.eth.getAccounts()

  yield put(
    setL1({
      web3Modal,
      address: accounts[0]
    })
  )
  yield put(toggleModal(MODALS.CONNECT_WALLET_L1))
  yield put(updateNotification({
    id: NOTIFICATIONS.CONNECT_WALLET_L1,
    title: 'L1 Wallet connected',
    status: NotificationStatuses.SUCCESS
  }))
}

export function * handleDisconnectWalletL1 () {
  const Web3Modal = yield select(selectWeb3Modal(Layers.L1))
  yield Web3Modal.clearCachedProvider()
  yield put(clearL1())
  yield put(addNotification({
    title: 'L1 Wallet disconnected',
    status: NotificationStatuses.SUCCESS
  }))
}

export function * handleConnectWalletL2 (): Generator<any, void, string[]> {
  yield put(addNotification({
    id: NOTIFICATIONS.CONNECT_WALLET_L2,
    title: 'Connecting L2 wallet',
    status: NotificationStatuses.PENDING
  }))
  // check if wallet extension is installed and initialized. Shows a modal prompting the user to download ArgentX otherwise.
  const starknet = getStarknet({ showModal: true })
  const [userWalletContractAddress] = yield starknet.enable() // may throws when no extension is detected
  if (starknet.isConnected) {
    yield put(setAddressL2(userWalletContractAddress))
    yield put(toggleModal(MODALS.CONNECT_WALLET_L2))
    yield put(updateNotification({
      id: NOTIFICATIONS.CONNECT_WALLET_L2,
      title: 'L2 Wallet connected',
      status: NotificationStatuses.SUCCESS
    }))
  } else {
    console.error('Failed to connect Argent wallet')
    yield put(updateNotification({
      id: NOTIFICATIONS.CONNECT_WALLET_L2,
      title: 'Failed to connect L2 wallet',
      status: NotificationStatuses.ERROR
    }))
  }
}

export function * handleDisconnectWalletL2 () {
  yield put(clearL2())
  yield put(addNotification({
    title: 'L2 Wallet disconnected',
    status: NotificationStatuses.SUCCESS
  }))
}
