import { Text } from '@deversifi/dvf-shared-ui'
import styled, { css } from 'styled-components'

import loader from '../../../assets/icons/loader.svg'
import { isCompleted, isPending, TransactionStatuses } from '../../../enums/TransactionStatuses'

type Props = {
  index: number
  status?: TransactionStatuses
  size?: number
}

export const StepIndex = ({
  index,
  status = TransactionStatuses.NOT_SENT,
  size = 90
}: Props) => {
  return (
    <IndexWrapper indexSize={size}>
      <IndexBorder status={status} />
      <Index indexSize={size}>
        <Text>
          {index}
        </Text>
      </Index>
    </IndexWrapper>
  )
}

const IndexWrapper = styled.div<{ indexSize: number }>`
  position: relative;
  min-width: ${({ indexSize }) => indexSize}px;
  height: ${({ indexSize }) => indexSize}px;
  margin-right: 10px;
`

const IndexBorder = styled.div<{ status: TransactionStatuses }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: ${({ status, theme }) =>
    isCompleted(status)
      ? `1px solid ${theme.accentGreen}`
      : isPending(status)
        ? 'none'
        : `1px solid ${theme.textSecondary}`};

  ${({ status }) =>
    isPending(status) &&
    css`
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
    `}
`

const Index = styled.div<{ indexSize: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  &>p {
      font-size: ${({ indexSize }) => indexSize / 1.5}px !important;
  }
`
