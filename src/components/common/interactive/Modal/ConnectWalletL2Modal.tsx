import { Spacing, Text } from '@deversifi/dvf-shared-ui'

import argentWallet from '../../../../assets/wallets/argent.svg'
import { MODALS } from '../../../../constants/modals'
import { useAppDispatch } from '../../../../redux/hooks'
import { toggleModal } from '../../../../redux/slices/modalSlice'
import { connectWalletL2 } from '../../../../redux/slices/walletSlice'
import { WalletButton, WalletButtonsWrapper } from '../../presentation/WalletButton'
import { Modal } from './Modal'

type Props = {
    isVisible: boolean
}

export const ConnectWalletL2Modal = ({ isVisible }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <Modal
      title='Connect your wallet'
      onClose={() => dispatch(toggleModal({ activeModal: MODALS.CONNECT_WALLET_L2 }))}
      limitHeight={false}
      isVisible={isVisible}
      maxWidth={600}
    >
      <div>
        <Spacing size='24' />
        <Text>Popular Ethereum wallets (like Metamask) are not compatible with StarkNet alpha.</Text>
        <Spacing size='24' />
        <WalletButtonsWrapper>
          <WalletButton onClick={() => dispatch(connectWalletL2())}>
            <div>
              <img src={argentWallet} alt='argent-wallet' />
            </div>
          </WalletButton>
        </WalletButtonsWrapper>
        <WalletButtonsWrapper>
          <WalletButton>
            <div>
              I don't have a StarkNet wallet 🙁 Help me create one
            </div>
          </WalletButton>
        </WalletButtonsWrapper>
      </div>
    </Modal>
  )
}
