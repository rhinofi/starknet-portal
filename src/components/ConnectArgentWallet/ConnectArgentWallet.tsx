import { getStarknet } from '@argent/get-starknet'
import { FunctionComponent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectAddressL2, setAddressL2 } from '../../redux/slices/userSlice'
import { getExplorerLinkL2 } from '../../utils/explorer'
import WalletInfo from '../common/interactive/WalletInfo'

const ConnectArgentWallet: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const address = useAppSelector(selectAddressL2)

  useEffect(() => {
    initiateArgentX()
    // eslint-disable-next-line
  }, [])

  const initiateArgentX = async () => {
    // check if wallet extension is installed and initialized. Shows a modal prompting the user to download ArgentX otherwise.
    const starknet = getStarknet({ showModal: true })
    try {
      const [userWalletContractAddress] = await starknet.enable() // may throws when no extension is detected
      dispatch(setAddressL2(userWalletContractAddress))
    } catch (e) {
      console.error(e)
    }

    // check if connection was successful
    if (starknet.isConnected) {
      // If the extension was installed and successfully connected, you have access to a starknet.js Signer object to do all kind of requests through the users wallet contract.
      console.log('connected!')
    } else {
      // In case the extension wasn't successfully connected you still have access to a starknet.js Provider to read starknet states and sent anonymous transactions
      console.log('failed!')
    }
  }

  const disconnectWallet = () => {
    dispatch(setAddressL2(''))
  }

  return (
    <WalletInfo
      address={address}
      icon='starknet'
      explorerUrl={getExplorerLinkL2(address, 'contract')}
      connectWallet={initiateArgentX}
      disconnectWallet={disconnectWallet}
    />
  )
}

export default ConnectArgentWallet
