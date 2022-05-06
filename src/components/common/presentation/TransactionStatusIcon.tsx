import styled from 'styled-components'

import { ReactComponent as CompletedState } from '../../../assets/icons/checkmark.svg'
import { ReactComponent as InitialState } from '../../../assets/icons/circle-grey.svg'
import loader from '../../../assets/icons/loader.svg'
import {
  isCompleted,
  isPending,
  TransactionStatuses
} from '../../../enums/TransactionStatuses'
import { Container } from './Container'

type Props = {
  status?: TransactionStatuses
}

export const TransactionStatusIcon = ({ status }: Props) => {
  return (
    <Wrapper alignItems='center'>
      {isPending(status)
        ? (
          <PendingState />
        )
        : isCompleted(status)
          ? (
            <CompletedState />
          )
          : (
            <InitialState />
          )}
    </Wrapper>
  )
}

const Wrapper = styled(Container)`
  margin-right: 10px;
  svg {
    width: 22px;
    height: 22px;
  }
`

const PendingState = styled.div`
  width: 22px;
  height: 22px;
  background-image: url(${loader});
  background-size: contain;
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
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
