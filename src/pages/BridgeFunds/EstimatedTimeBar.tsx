import { Text } from '@deversifi/dvf-shared-ui'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'
import styled from 'styled-components'

import { Container } from '../../components/common/presentation/Container'

type Props = {
  estimate: number
}

export const EstimateTimeBar = ({ estimate }: Props) => {
  return (
    <Container alignItems='center'>
      <LoadingBar>
        <LoadingBarAnimation />
      </LoadingBar>
      <Label size={TypographySizes.Small}>
       Estimate ~{estimate} minutes
      </Label>
    </Container>
  )
}

const Label = styled(Text)`
    white-space: nowrap;
    margin-left: 20px;
`

const LoadingBar = styled.div`
  height: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.neutralWhite};
  overflow: hidden;
  border-radius: 2px;
`

const LoadingBarAnimation = styled.div`
  width: 40%;
  height: 4px;
  background-color: ${({ theme }) => theme.accentGreen};
  -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @-webkit-keyframes running-progress {
    0% {
      margin-left: 0px;
      margin-right: 100%;
    }
    100% {
      margin-left: 100%;
      margin-right: 0;
    }
  }
  @keyframes running-progress {
    0% {
      margin-left: 0px;
      margin-right: 100%;
      width: 10%;
    }
    15% {
      width: 20%;
    }
    30% {
      width: 30%;
    }
    100% {
      margin-left: 100%;
      margin-right: 0;
    }
  }
`
