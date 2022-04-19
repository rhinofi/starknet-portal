import { Spacing } from '@deversifi/dvf-shared-ui'
import styled from 'styled-components'

import { DepositState } from '../../redux/slices/bridgeSlice.types'
import { Layers } from '../../utils/layer'
import { BridgeFundsSingleStep } from './BridgeFundsSingleStep'

type Props = {
    deposit: DepositState
}

export const BridgeFundsSteps = ({ deposit }: Props) => {
  return (
    <Wrapper>
      <Spacing size='20' />
      <BridgeFundsSingleStep
        index={1}
        title='Sending funds - L1 transaction'
        description='Your wallet will open and you will be asked to approve this transaction. This ERC-20 transaction is approved for the first token deposit, later you won’t need it anymore.'
        status={deposit.transactions?.[Layers.L1]?.status}
      />
      <Spacing size='30' />
      <BridgeFundsSingleStep
        index={2}
        title='Sending funds - L2 transaction'
        description='The waiting period is necessary as the blockchain is processing the transaction. No need to refresh. Go to Portfolio to see progresses.'
        status={deposit.transactions?.[Layers.L2]?.status}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
  border-radius: 20px;
`
