import { Button } from '@deversifi/dvf-shared-ui'
import { useMemo } from 'react'
import styled from 'styled-components'

import tokens from '../../../assets/tokens'
import { MODALS } from '../../../constants/modals'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { toggleModal } from '../../../redux/slices/modalSlice'
import {
  disconnectWalletL1,
  disconnectWalletL2,
  selectAddress
} from '../../../redux/slices/walletSlice'
import { shortenAddress } from '../../../utils/address'
import { getExplorerLinkL1, getExplorerLinkL2 } from '../../../utils/explorer'
import { Layers, layerSwitch } from '../../../utils/layer'
import CopyButton from '../../common/interactive/CopyButton'
import { Container } from '../presentation/Container'

type Props = {
  layer: Layers;
};

const WalletInfo = ({ layer }: Props) => {
  const address = useAppSelector(selectAddress(layer))

  const dispatch = useAppDispatch()

  const explorerUrl = useMemo(
    () => layerSwitch(layer, getExplorerLinkL1(address, 'address'), getExplorerLinkL2(address, 'address')),
    [address, layer]
  )

  const icon = layerSwitch(layer, tokens.ethereum, tokens.starknet)

  const connectWallet = () => dispatch(toggleModal(layer === Layers.L1 ? MODALS.CONNECT_WALLET_L1 : MODALS.CONNECT_WALLET_L2))

  const disconnectWallet = () => dispatch(layer === Layers.L1 ? disconnectWalletL1() : disconnectWalletL2())

  return (
    <>
      {!address
        ? (
          <Button size="38px" onClick={connectWallet}>
            <ButtonContent
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <img src={icon} alt="layer_icon" />
            Connect wallet
            </ButtonContent>
          </Button>
        )
        : (
          <CustomButton>
            <img src={icon} alt="layer_icon" />
            <ExplorerLink
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenAddress(address)}
            </ExplorerLink>
            <CopyButton text={address} successPosition="bottom" />
          &nbsp;
            <Button size="16" onClick={disconnectWallet}>
            Disconnect
            </Button>
          </CustomButton>
        )}
    </>
  )
}

export default WalletInfo

const ButtonContent = styled(Container)`
  img {
    margin-right: 10px;
  }
`

const CustomButton = styled.div`
  cursor: default;
  display: flex;
  direction: row;
  align-items: center;
  & img {
    margin-right: 10px;
  }
`

const ExplorerLink = styled.a`
  margin-right: 12px;
  font-family: ${({ theme }) => theme.defaultFont};
  font-weight: 400;
  color: ${({ theme }) => theme.textSecondary};
`
