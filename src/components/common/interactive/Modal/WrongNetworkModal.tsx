
import { Text } from '@deversifi/dvf-shared-ui'

import { config } from '../../../../config/config'
import { MODALS } from '../../../../constants/modals'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { selectModalData, toggleModal } from '../../../../redux/slices/modalSlice'
import { selectLayer } from '../../../../redux/slices/walletSlice'
import { Layers, layerSwitch } from '../../../../utils/layer'
import { Modal } from './Modal'

type ModalData = {
    layer: Layers
}

type Props = {
  isVisible: boolean
}
export const WrongNetworkModal = ({ isVisible }:Props) => {
  const dispatch = useAppDispatch()
  const { layer } = useAppSelector(selectModalData) as ModalData
  const layerData = useAppSelector(selectLayer(layer))

  const onClose = async () => {
    if (layerData.web3) {
      const network = await layerData.web3.eth.net.getId()
      if (network === config.chainId) {
        dispatch(toggleModal({ activeModal: MODALS.WRONG_NETWORK }))
      }
    }
  }

  return (
    <Modal
      title='Wrong network selected'
      onClose={onClose}
      limitHeight={false}
      isVisible={isVisible}
      maxWidth={600}
    >
      <Text>
        Your {layerSwitch(layer, 'L1', 'L2')} wallet is not set on the right network. Please change selected network to {config.chainName}
      </Text>
    </Modal>
  )
}
