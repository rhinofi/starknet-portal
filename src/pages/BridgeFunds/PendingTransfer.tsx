import { Button, Spacing, Text, TokenIcon } from '@deversifi/dvf-shared-ui'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'
import moment from 'moment'
import styled from 'styled-components'

import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg'
import { Container } from '../../components/common/presentation/Container'
import { ExplorerLink } from '../../components/common/presentation/ExplorerLink'
import { TransactionStatusIcon } from '../../components/common/presentation/TransactionStatusIcon'
import { isCompleted } from '../../enums/TransactionStatuses'
import { useAppDispatch } from '../../redux/hooks'
import { removeTransfer } from '../../redux/slices/bridgeSlice'
import { Transfer } from '../../redux/slices/bridgeSlice.types'
import { claimWithdraw } from '../../redux/slices/walletSlice'
import { Layers, layerSwitch } from '../../utils/layer'

const TransactionStatus = ({
  transfer,
  layer
}: {
  transfer?: Transfer
  layer: Layers
}) => {
  const dispatch = useAppDispatch()
  const transaction = transfer?.transactions?.[layer]

  return (
    <Container alignItems='center'>
      <TransactionStatusIcon status={transaction?.status} />
      <Text>{layerSwitch(layer, 'L1', 'L2')} transaction</Text>
      <ExplorerLink txHash={transaction?.hash} layer={layer} />
      {transfer?.type === 'withdrawal' && layer === Layers.L1 && (
        <WithdrawButton
          size={20}
          disabled={!isCompleted(transfer?.transactions?.[Layers.L2]?.status)}
          onClick={() =>
            dispatch(
              claimWithdraw({
                toAddress: transfer.toAddress || '',
                amount: transfer.amount || '',
                token: transfer.token || '',
                transferId: transfer.id || ''
              })
            )
          }
        >
          Withdraw
        </WithdrawButton>
      )}
      <Date size={TypographySizes.Small}>
        {isCompleted(transaction?.status)
          ? 'Done'
          : `~ Estimated ${layerSwitch(layer, '1-5', '20')} minutes`}
      </Date>
    </Container>
  )
}

export const PendingTransfer = ({ transfer }: { transfer: Transfer }) => {
  const dispatch = useAppDispatch()

  const isDeposit = transfer.type === 'deposit'
  const isTransferCompleted =
    isCompleted(transfer?.transactions?.[Layers.L1]?.status) &&
    isCompleted(transfer?.transactions?.[Layers.L2]?.status)

  return (
    <Wrapper>
      <Container alignItems='center'>
        <TokenIcon token={transfer.token} />
        <Spacing size='10' />
        <Text>
          {isDeposit ? 'Deposit' : 'Withdrawal'} {transfer.amount}{' '}
          {transfer.token}
        </Text>
        <Date size={TypographySizes.Small}>
          {moment(transfer?.timestamp).fromNow()}
        </Date>
        {isTransferCompleted && (
          <ExitWrapper onClick={() => dispatch(removeTransfer(transfer.id))}>
            <ExitIcon />
          </ExitWrapper>
        )}
      </Container>
      <Spacing size='12' />
      <TransactionStatus
        transfer={transfer}
        layer={isDeposit ? Layers.L1 : Layers.L2}
      />
      <TransactionStatus
        transfer={transfer}
        layer={isDeposit ? Layers.L2 : Layers.L1}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.neutral};
  padding: 10px;
  margin-bottom: 14px;
`

const Date = styled(Text)`
  margin-left: auto;
`

const WithdrawButton = styled(Button)`
  margin: 0 auto;
`

const ExitWrapper = styled.div`
  margin-left: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`
