import styled from 'styled-components'

import { getExplorerLinkL1, getExplorerLinkL2 } from '../../../utils/explorer'
import { Layers, layerSwitch } from '../../../utils/layer'
import { Icon } from './Icon'

type Props = {
    txHash?: string
    layer: Layers
}

export const ExplorerLink = ({ txHash, layer }: Props) => {
  if (!txHash) return <></>

  return (
    <Link
      href={layerSwitch(layer, getExplorerLinkL1(txHash, 'tx'), getExplorerLinkL2(txHash, 'tx'))}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Icon active id='external-link' />
    </Link>
  )
}

const Link = styled.a`
  i {
    margin-left: 12px;
    color: ${props => props.theme.textSecondary};
    transition: color 0.15s ease-in-out;

    &:hover {
      color: ${props => props.theme.text}BB;
    }
  }
`
