import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/common/presentation/Container'
import { Title1, Title2, Text } from '../../components/common/presentation/Text'
import CircleInfo from './CircleInfo'

const Onboarding: FunctionComponent = () => (
  <Wrapper direction='column' alignItems='center'>
    <Title1>Welcome to the StarkNet Portal</Title1>
    <Title2 $negative>Ethereum as it should be.</Title2>
    <Text align='center'>
      This is your gateway to the entire StarkNet ecosystem.. Create your
      Starknet account, bridge assets to and from Starknet, manage your
      portfolio and explore decentralized apps that launch on Starknet, all in a
      matter of seconds and at a fraction of standard fees. Ethereum, as it
      should be.
      <br />
      <br />
      By joining StarkNet now, you'll be a pioneer and we'll help you create a
      legacy. You can build your very own 'alpha user'/'Starknet alpha' score to
      show just how early you were and how much of the ecosystem you've
      explored.
    </Text>
    <CircleInfo />
  </Wrapper>
)

export default Onboarding

const Wrapper = styled(Container)`
  max-width: 900px;
  margin: 56px auto 0px;
`
