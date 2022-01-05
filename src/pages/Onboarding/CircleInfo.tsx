import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../../components/common/presentation/Container'
import CircleInfoDetails from './CircleInfoDetails'
import CurvedButton from './CurvedButton'
import GetStartedButton from './GetStartedButton'

const titles = [
  'Bridge funds in minutes',
  'Explore StarkNet',
  'You need an account!'
]

const texts = [
  'Use our bridge to transfer your funds to Starknet and start exploring all the apps and integrations the universe has to offer. the universe. \n\n We’ve also built a portfolio for you, which will integrate with all apps on Starknet and enable you to track all your investments in one place. Handy right?',
  'Use our live, constantly-updated integrations explorer to find all the best apps launching on Starknet every day.',
  "To bridge the gap with Metamarsk, all you need to do is create an Argent wallet and then transfer your funds from your Metamask account.  Then you're ready to roll."
]

const CircleInfo: FunctionComponent = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  return (
    <Container>
      <CircleInfoDetails
        visible={activeItem === 1}
        title={titles[1]}
        text={texts[1]}
      />
      <Wrapper>
        <CurvedButton
          text='Bridge Funds'
          arc={-80}
          radius={-130}
          textTranslation={{ x: 0, y: -36 }}
          setActive={(inactive: boolean) => setActiveItem(inactive ? null : 0)}
        />
        <CurvedButton
          text='Explore StarkNet'
          arc={95}
          radius={155}
          textRotation={-60}
          imgRotation={120}
          textTranslation={{ x: 48, y: -65 }}
          setActive={(inactive: boolean) => setActiveItem(inactive ? null : 1)}
        />
        <CurvedButton
          text='Create Account'
          arc={100}
          radius={150}
          textRotation={60}
          imgRotation={-120}
          textTranslation={{ x: -48, y: -63 }}
          setActive={(inactive: boolean) => setActiveItem(inactive ? null : 2)}
        />
        <GetStartedButton />
      </Wrapper>
      <CircleInfoDetails
        visible={activeItem === 0 || activeItem === 2}
        title={activeItem !== null ? titles[activeItem] : ''}
        text={activeItem !== null ? texts[activeItem] : ''}
      />
    </Container>
  )
}

export default CircleInfo

const Wrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  & > div:first-child {
    position: absolute;
    bottom: 0;
    left: 14%;
  }
  & > div:nth-child(2) {
    position: absolute;
    left: -50px;
    top: 110px;
  }
  & > div:nth-child(3) {
    position: absolute;
    right: -50px;
    top: 110px;
  }
`
