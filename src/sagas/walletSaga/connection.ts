import { getStarknet } from '@argent/get-starknet'
import { put } from '@redux-saga/core/effects'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import config from '../../config/config'
import { MODALS } from '../../constants/modals'
import { toggleModal } from '../../redux/slices/modalSlice'
import { clearL1, clearL2, setAddressL2, setL1 } from '../../redux/slices/walletSlice'
import { store } from '../../store'
import { Layers } from '../../utils/layer'

export function * handleConnectWalletL1 () {
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
}

export function * handleDisconnectWalletL1 () {
  const Web3Modal = store.getState().wallet[Layers.L1].web3Modal
  yield Web3Modal.clearCachedProvider()
  yield put(clearL1())
}

export function * handleConnectWalletL2 (): Generator<any, void, string[]> {
  // check if wallet extension is installed and initialized. Shows a modal prompting the user to download ArgentX otherwise.
  const starknet = getStarknet({ showModal: true })
  const [userWalletContractAddress] = yield starknet.enable() // may throws when no extension is detected
  if (starknet.isConnected) {
    yield put(setAddressL2(userWalletContractAddress))
    yield put(toggleModal(MODALS.CONNECT_WALLET_L2))
  } else {
    console.error('Failed to connect Argent wallet')
  }
}

export function * handleDisconnectWalletL2 () {
  yield put(clearL2())
}
