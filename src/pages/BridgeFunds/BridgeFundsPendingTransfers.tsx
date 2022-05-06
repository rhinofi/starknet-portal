import styled from 'styled-components'

import { useAppSelector } from '../../redux/hooks'
import {
  selectDeposits,
  selectWithdrawals
} from '../../redux/slices/bridgeSlice'
import { PendingTransfer } from './PendingTransfer'

export const BridgeFundsPendingTransfers = () => {
  const deposits = useAppSelector(selectDeposits)
  const withdrawals = useAppSelector(selectWithdrawals)

  return (
    <Wrapper>
      {deposits.map(deposit => (
        <PendingTransfer key={deposit.id} transfer={deposit} />
      ))}
      {withdrawals.map(withdrawal => (
        <PendingTransfer key={withdrawal.id} transfer={withdrawal} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 20px;
`
