import styled from 'styled-components'
import tokens from '../../../assets/tokens'
import { shortenAddress } from '../../../utils'
import { Button, TextButton } from '../../common/interactive/Button'
import CopyButton from '../../common/interactive/CopyButton'
import LabelCard from '../../common/presentation/LabelCard'
import { Container } from '../presentation/Container'

type Props = {
  address: string
  icon: string
  explorerUrl: string
  connectWallet: () => void
  disconnectWallet: () => void
}

const WalletInfo = ({
  address,
  icon,
  explorerUrl,
  connectWallet,
  disconnectWallet
}: Props) => {
  return (
    <LabelCard>
      <IconWrapper alignItems='center' justifyContent='center'>
        <img src={tokens[icon]} alt='layer_icon' />
      </IconWrapper>
      {!address ? (
        <Button onClick={connectWallet}>Connect wallet</Button>
      ) : (
        <>
          <ExplorerLink
            href={explorerUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {shortenAddress(address)}
          </ExplorerLink>
          <CopyButton text={address} successPosition='bottom' />
          &nbsp;
          <TextButton onClick={disconnectWallet}>Disconnect</TextButton>
        </>
      )}
    </LabelCard>
  )
}

export default WalletInfo

const IconWrapper = styled(Container)`
  margin-right: 10px;
`

const ExplorerLink = styled.a`
  color: #fff;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.mainFont};
`
