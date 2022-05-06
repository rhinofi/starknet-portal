import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/common/presentation/Container'
import { Page } from '../../components/common/presentation/Page'
import { Text, Title2 } from '../../components/common/presentation/Text'
import BridgeFundsWidget from './BridgeFundsWidget'

const BridgeFunds: FunctionComponent = () => {
  return (
    <Page>
      <ContentWrapper>
        <TextWrapper direction='column'>
          <Title2 $negative>
            Move funds seamlessly between Ethereum and StarkNet
          </Title2>
          <Text>
            In order to send funds from Ethereum to StarkNet you need to have
            both an Ethereum wallet and a StarkNet wallet.
            <br />
            <br />
            Connect your Ethereum wallet to send funds to StarkNet.
            <br />
            <br />
            Why do I need a StarkNet wallet?
            <br />
            StarkNet handles accounts differently than Ethereum. Most popular
            Ethereum wallet providers (such as Metamask) do not yet support
            StarkNet.
            <br />
            <br />
            Why is my StarkNet address different? <br />
            You have created a new account on StarkNet, which is independent
            from your Ethereum address.
          </Text>
        </TextWrapper>
        <BridgeFundsWidget />
      </ContentWrapper>
    </Page>
  )
}

export default BridgeFunds

const ContentWrapper = styled(Container)`
  margin: 0 auto;
  max-width: 1050px;
`

const TextWrapper = styled(Container)`
  max-width: 500px;
  margin-right: 50px;
  padding-top: 80px;
`
