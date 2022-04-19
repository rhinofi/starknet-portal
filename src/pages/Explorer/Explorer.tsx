import { Text } from '@deversifi/dvf-shared-ui'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'
import styled from 'styled-components'

import blueCircle from '../../assets/backgrounds/blue-circle.svg'
import ellipse from '../../assets/backgrounds/ellipse.svg'
import ethereum from '../../assets/tokens/ethereum.svg'
import frax from '../../assets/tokens/frax.svg'
import starknet from '../../assets/tokens/starknet.svg'
import usdt from '../../assets/tokens/usdt.svg'
import wbtc from '../../assets/tokens/wbtc.svg'
import { Planet } from './Planet'

type ExplorerData = {
    [key: string]: HubData[]
}

export type HubData = ProjectData[]

export type ProjectData = {
    name: string
    icon: string
}

const data: ExplorerData = {
  wallets: [
    [
      { name: 'Metamask', icon: ethereum },
      { name: 'Argent', icon: starknet }
    ]
  ],
  exchanges: [
    [
      { name: 'Metamask', icon: wbtc },
      { name: 'Argent', icon: usdt },
      { name: 'Argent', icon: frax }
    ]
  ],
  tools: [
    [
      { name: 'Metamask', icon: usdt }
    ]
  ],
  test: [
    [
      { name: 'Metamask', icon: ethereum },
      { name: 'Metamask', icon: wbtc },
      { name: 'Argent', icon: usdt },
      { name: 'Argent', icon: frax }
    ]
  ],
  test2: [
    [
      { name: 'Metamask', icon: ethereum },
      { name: 'Argent', icon: starknet }
    ]
  ]
}

const categories = Object.keys(data)

export const Explorer = () => {
  return (
    <Wrapper>
      <Container>
        <BlueCircle>
          <Ellipse>
            <Neon />
            <Circle>
              <Text transparency={false} size={TypographySizes.Big}>
                StarkNet
              </Text>
              <Text transparency={false} size={TypographySizes.Big}>
                Ecosystem
              </Text>
            </Circle>
          </Ellipse>
        </BlueCircle>
        {
          categories.map((planet, index) => (
            <Planet key={planet} title={planet} angle={index * 360 / categories.length} hubs={data[planet]} />
          ))
        }
      </Container>
    </Wrapper>
  )
}

// Sizes
const coreSize = 316
const circleSize = 170

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 10px);
`

const Container = styled.div`
  height: ${coreSize}px;
  width: ${coreSize}px;
  position: relative;
  //border: 1px solid yellow;
`

const BlueCircle = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${blueCircle});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Ellipse = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url(${ellipse});
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Neon = styled.div`
  position: absolute;
  background: conic-gradient(
    from -80.97deg at 46.18% 51.15%,
    #8feaec -54.94deg,
    #4619dc 28.29deg,
    #eb6f61 157.82deg,
    #e867d3 220.83deg,
    #8feaec 305.06deg,
    #4619dc 388.29deg
  );
  filter: blur(15px);
  width: ${circleSize}px;
  height: ${circleSize}px;
  border-radius: 50%;
  animation-name: spin;
  animation-duration: 20000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const Circle = styled.div`
  z-index: 1;
  width: ${circleSize}px;
  height: ${circleSize}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(#1e1f25, #1e1f25),
    conic-gradient(
      from 43.98deg at 46.18% 51.15%,
      #faee87 -54.94deg,
      #e84545 28.29deg,
      #e870fb 157.82deg,
      #b3fbf7 220.83deg,
      #faee87 305.06deg,
      #e84545 388.29deg
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
`
