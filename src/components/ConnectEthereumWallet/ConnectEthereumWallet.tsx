import { FunctionComponent, useEffect } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import config from '../../config/config'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAddressL1, setAddressL1 } from '../../redux/slices/userSlice'
import { getExplorerLinkL1 } from '../../utils/explorer'
import WalletInfo from '../common/interactive/WalletInfo'
import { web3 } from '../../web3'

const ConnectEthereumWallet: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const address = useAppSelector(selectAddressL1)

  useEffect(() => {
    const checkConnection = async () => {
      web3.eth.getAccounts().then(async (addr: string[]) => {
        dispatch(setAddressL1(addr[0]))
      })
    }
    checkConnection()
    // eslint-disable-next-line
  }, [])

  const initiateWeb3Provider = async () => {
    const web3Modal = new Web3Modal({
      network: config.chain.toLowerCase(), // optional
      cacheProvider: true, // optional
      providerOptions: {} // required
    })

    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const accounts = await web3.eth.getAccounts()

    dispatch(setAddressL1(accounts[0]))
  }

  const disconnectWallet = async () => {
    dispatch(setAddressL1(''))
    const web3Modal = new Web3Modal()
    await web3Modal.clearCachedProvider()
  }

  return (
    <WalletInfo
      address={address}
      icon='ethereum'
      explorerUrl={getExplorerLinkL1(address, 'address')}
      connectWallet={initiateWeb3Provider}
      disconnectWallet={disconnectWallet}
    />
  )
}

export default ConnectEthereumWallet
