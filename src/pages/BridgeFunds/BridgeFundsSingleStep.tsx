import { Spacing, Text, Title } from '@deversifi/dvf-shared-ui'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'
import styled, { css } from 'styled-components'

import loader from '../../assets/icons/loader.svg'
import { Container } from '../../components/common/presentation/Container'
import { isCompleted, isNotSent, isPending, TransactionStatuses } from '../../enums/TransactionStatuses'

type Props = {
  index: number
  title: string
  description: string
  status?: TransactionStatuses
}

export const BridgeFundsSingleStep = ({
  index,
  title,
  description,
  status = TransactionStatuses.NOT_SENT
}: Props) => {
  return (
    <Container alignItems='center'>
      <IndexWrapper>
        <IndexBorder status={status} />
        <Index>
          <Text transparency={isNotSent(status)} size={TypographySizes.Large}>
            {index}
          </Text>
        </Index>
      </IndexWrapper>
      <Container direction='column'>
        <StepTitle size={TypographySizes.Normal} transparency={isNotSent(status)}>{title}</StepTitle>
        <Spacing size='10' />
        <Text transparency={isNotSent(status)}>{description}</Text>
      </Container>
    </Container>
  )
}

const indexSize = 90

const IndexWrapper = styled.div`
  position: relative;
  min-width: ${indexSize}px;
  height: ${indexSize}px;
  margin-right: 20px;
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

const Index = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 42px;
  font-weight: 600;
  &>p {
      font-size: 42px !important;
  }
`

const StepTitle = styled(Title)`
  font-size: 19px;
`
