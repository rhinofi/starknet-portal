import { Text } from '@deversifi/dvf-shared-ui'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

import { Container } from '../../components/common/presentation/Container'

export const GetStartedButton: FunctionComponent = () => (
  <Wrapper alignItems='center' justifyContent='center'>
    <Neon />
    <OutsideCircle alignItems='center' justifyContent='center'>
      <InsideCircle alignItems='center' justifyContent='center'>
        <CustomText>Get started</CustomText>
      </InsideCircle>
    </OutsideCircle>
  </Wrapper>
)

const Wrapper = styled(Container)`
  height: 100%;
  padding-top: 20px;
`

const OutsideCircle = styled(Container)`
  z-index: 1;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: ${({ theme }) => theme.secondaryBackground};
`

const Neon = styled.div`
  border-radius: 50%;
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
  width: 150px;
  height: 150px;
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

const InsideCircle = styled(Container)`
  width: 123px;
  height: 123px;
  border-radius: 50%;
  background: ${({ theme }) => theme.neutral};
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);

  &:hover {
    background: ${({ theme }) => theme.neutral600};
    color: #fff;
  }
`

const CustomText = styled(Text)`
  font-family: ${({ theme }) => theme.defaultFont};
  font-weight: 700;
  color: inherit;
`
