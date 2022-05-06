import { Spacing } from '@deversifi/dvf-shared-ui'

import metamaskWallet from '../../../../assets/wallets/metamask.svg'
import { MODALS } from '../../../../constants/modals'
import { useAppDispatch } from '../../../../redux/hooks'
import { toggleModal } from '../../../../redux/slices/modalSlice'
import { connectWalletL1 } from '../../../../redux/slices/walletSlice'
import { WalletButton, WalletButtonsWrapper } from '../../presentation/WalletButton'
import { Modal } from './Modal'

type Props = {
  isVisible: boolean
}

export const ConnectWalletL1Modal = ({ isVisible }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <Modal
      title='Connect your wallet'
      onClose={() => dispatch(toggleModal({ activeModal: MODALS.CONNECT_WALLET_L1 }))}
      limitHeight={false}
      isVisible={isVisible}
      maxWidth={600}
    >
      <div>
        <Spacing size='24' />
        <WalletButtonsWrapper>
          <WalletButton onClick={() => dispatch(connectWalletL1())}>
            <div>
              <img src={metamaskWallet} alt='metamask-wallet' />
            </div>
          </WalletButton>
        </WalletButtonsWrapper>
      </div>
    </Modal>
  )
}
