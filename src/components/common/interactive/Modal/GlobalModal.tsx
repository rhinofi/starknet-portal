import { MODALS } from '../../../../constants/modals'
import { useAppSelector } from '../../../../redux/hooks'
import { selectActiveModal } from '../../../../redux/slices/modalSlice'
import ConnectWalletL1Modal from './ConnectWalletL1Modal'
import ConnectWalletL2Modal from './ConnectWalletL2Modal'

const GlobalModal = () => {
  const activeModal = useAppSelector(selectActiveModal)

  return (
    <>
      <ConnectWalletL1Modal isVisible={activeModal === MODALS.CONNECT_WALLET_L1} />
      <ConnectWalletL2Modal isVisible={activeModal === MODALS.CONNECT_WALLET_L2} />
    </>
  )
}

export default GlobalModal
