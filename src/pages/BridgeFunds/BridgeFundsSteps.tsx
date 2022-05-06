import { Spacing } from '@deversifi/dvf-shared-ui'
import isEmpty from 'lodash/isEmpty'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useAppSelector } from '../../redux/hooks'
import { selectDeposits, selectWithdrawals } from '../../redux/slices/bridgeSlice'
import { selectAllowances } from '../../redux/slices/walletSlice'
import { Layers } from '../../utils/layer'
import { requiresAllowance } from '../../utils/tokens'
import { BridgeFundsSingleStep } from './BridgeFundsSingleStep'

type Props = {
  amount: string
  token: string
  isDeposit: boolean
}

export const BridgeFundsSteps = ({
  amount,
  token,
  isDeposit = true
}: Props) => {
  const deposits = useAppSelector(selectDeposits)
  const deposit = deposits[0] || {}
  const withdrawals = useAppSelector(selectWithdrawals)
  const withdrawal = withdrawals[0] || {}
  const allowancesL1 = useAppSelector(selectAllowances(Layers.L1))

  const needsApproval = useMemo(
    () => requiresAllowance(allowancesL1, amount, token),
    [token, allowancesL1]
  )
  const isPending =
    (isDeposit && !isEmpty(deposit)) || (!isDeposit && !isEmpty(withdrawal))

  if (isDeposit) {
    return (
      <Wrapper>
        <Spacing size='20' />
        {needsApproval && (
          <BridgeFundsSingleStep
            index={1}
            title='Approve'
            description='Your wallet will open and you will be asked to approve this transaction. This ERC-20 transaction is approved for the first token deposit, later you won’t need it anymore.'
            status={deposit.transactions?.[Layers.L1]?.status}
          />
        )}
        <Spacing size='30' />
        <BridgeFundsSingleStep
          index={1}
          title='Depositing funds - L1 transaction'
          description='Your wallet will open and you will be asked to approve this transaction. This ERC-20 transaction is approved for the first token deposit, later you won’t need it anymore.'
          status={deposit.transactions?.[Layers.L1]?.status}
        />
        <Spacing size='20' />
        {/* <EstimateTimeBar estimate={10} /> */}
        <Spacing size='30' />
        <BridgeFundsSingleStep
          index={2}
          title='Depositing funds - L2 transaction'
          description='The waiting period is necessary as the blockchain is processing the transaction. No need to refresh. Go to Portfolio to see progresses.'
          status={deposit.transactions?.[Layers.L2]?.status}
        />
      </Wrapper>
    )
  }

  // Withdrawal steps
  return (
    <Wrapper>
      <Spacing size='20' />
      <BridgeFundsSingleStep
        index={1}
        title='Initiating funds withdrawal (L2)'
        description='Sending the funds to the bridge contract on L2. This transaction needs to be accepted on L1 and it might take around 25 minutes.'
        status={deposit.transactions?.[Layers.L1]?.status}
      />
      <Spacing size='30' />
      <BridgeFundsSingleStep
        index={2}
        title='Completing funds withdrawal (L1)'
        description='Final transaction on L1 to get the funds in your wallet.'
        status={deposit.transactions?.[Layers.L2]?.status}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
  border-radius: 20px;
`
