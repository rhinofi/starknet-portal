import { Spacing, Table, Text, Title } from '@deversifi/dvf-shared-ui'
import { Column } from '@deversifi/dvf-shared-ui/lib/components/table/types'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'
import { FunctionComponent, useMemo, useState } from 'react'

import { Page } from '../../components/common/presentation/Page'
import { useAppSelector } from '../../redux/hooks'
import { selectBalances } from '../../redux/slices/walletSlice'
import { Layers } from '../../utils/layer'

type T = {
  token: string
  price: number
  balance: number
}

const columns: Column<T>[] = [
  {
    id: 'token',
    title: 'Token'
  },
  {
    id: 'price',
    title: 'Price 24h'
  },
  {
    id: 'balance',
    title: 'Total Balance'
  }
]

const Portfolio: FunctionComponent = () => {
  const balancesL1 = useAppSelector(selectBalances(Layers.L1))
  const balancesL2 = useAppSelector(selectBalances(Layers.L2))

  const [usdPortfolioValue] = useState(0)

  const balancesL1Array = useMemo(() => Object.entries(balancesL1 || {}).map(([key, value]) => ({
    token: key,
    balance: value.balance,
    price: 0
  })), [balancesL1])

  const balancesL2Array = useMemo(() => Object.entries(balancesL2 || {}).map(([key, value]) => ({
    token: key,
    balance: value.balance,
    price: 0
  })), [balancesL2])

  return (
    <Page>
      <Title size='big'>Portfolio</Title>
      <Text>${usdPortfolioValue}</Text>
      <Spacing size='24' />
      <Text size={TypographySizes.Big}>Ethereum Balances</Text>
      <hr />
      <Spacing size='12' />
      <Table
        columns={columns}
        data={balancesL1Array}
      />
      <Spacing size='24' />
      <Text size={TypographySizes.Big}>Starknet Balances</Text>
      <hr />
      <Spacing size='12' />
      <Table
        columns={columns}
        data={balancesL2Array}
      />
    </Page>
  )
}

export default Portfolio
