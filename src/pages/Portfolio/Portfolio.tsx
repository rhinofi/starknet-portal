import { Spacing, Table, Text, Title } from '@deversifi/dvf-shared-ui'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'
import sumBy from 'lodash/sumBy'
import { FunctionComponent, useMemo } from 'react'

import { Page } from '../../components/common/presentation/Page'
import { useAppSelector } from '../../redux/hooks'
import { selectPrices } from '../../redux/slices/pricesSlice'
import { selectBalances } from '../../redux/slices/walletSlice'
import { Layers } from '../../utils/layer'
import { calculateBalanceUsd, formatBalanceUsd } from '../../utils/price'
import { PortfolioColumns } from './Portfolio.columns'

export const Portfolio: FunctionComponent = () => {
  const balancesL1 = useAppSelector(selectBalances(Layers.L1))
  const balancesL2 = useAppSelector(selectBalances(Layers.L2))
  const prices = useAppSelector(selectPrices)

  const data = useMemo(() => Object.entries(balancesL1 || {}).map(([key, value]) => {
    const token = key
    const price = prices[token]
    const balanceL1 = value.balance
    const balanceUsdL1 = calculateBalanceUsd(balanceL1, price)
    const balanceL2 = balancesL2?.[key]?.balance || 0
    const balanceUsdL2 = calculateBalanceUsd(balanceL2, price)
    const totalBalance = balanceL1 + balanceL2
    const totalBalanceUsd = calculateBalanceUsd(totalBalance, price)

    return ({
      token: key,
      balanceL1,
      balanceL2,
      balanceUsdL1,
      balanceUsdL2,
      totalBalance,
      totalBalanceUsd,
      price
    })
  }), [balancesL1, balancesL2, prices])

  const portfolioValueUsd = useMemo(() => sumBy(data, 'totalBalanceUsd'), [data])

  return (
    <Page>
      <Title size='big'>Portfolio</Title>
      <Text size={TypographySizes.Large} transparency={false}>{formatBalanceUsd(portfolioValueUsd)}</Text>
      <Spacing size='24' />
      <Table
        columns={PortfolioColumns}
        data={data}
      />
    </Page>
  )
}
