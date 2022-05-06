import { MODALS } from '../../../../constants/modals'
import { ProjectModal } from '../../../../pages/Explorer/ProjectModal'
import { useAppSelector } from '../../../../redux/hooks'
import { selectActiveModal } from '../../../../redux/slices/modalSlice'
import { ConnectWalletL1Modal } from './ConnectWalletL1Modal'
import { ConnectWalletL2Modal } from './ConnectWalletL2Modal'
import { WrongNetworkModal } from './WrongNetworkModal'

export const GlobalModal = () => {
  const activeModal = useAppSelector(selectActiveModal)

  return (
    <>
      <ConnectWalletL1Modal isVisible={activeModal === MODALS.CONNECT_WALLET_L1} />
      <ConnectWalletL2Modal isVisible={activeModal === MODALS.CONNECT_WALLET_L2} />
      <ProjectModal isVisible={activeModal === MODALS.PROJECT_DETAILS} />
      <WrongNetworkModal isVisible={activeModal === MODALS.WRONG_NETWORK} />
    </>
  )
}
