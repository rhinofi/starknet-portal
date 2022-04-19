import { Spacing, Text, TokenIcon } from '@deversifi/dvf-shared-ui'
import { Column } from '@deversifi/dvf-shared-ui/lib/components/table/types'
import { TypographySizes } from '@deversifi/dvf-shared-ui/lib/types/formats'

import { Container } from '../../components/common/presentation/Container'
import { formatBalance } from '../../utils/number'
import { formatBalanceUsd } from '../../utils/price'

type T = {
    token: string
    price: number
    balanceL1: number
    balanceL2: number
    balanceUsdL1: number
    balanceUsdL2: number,
    totalBalance: number,
    totalBalanceUsd: number
  }

export const PortfolioColumns: Column<T>[] = [
  {
    id: 'token',
    title: 'Token',
    renderCell: ({ token }) => (
      <Container alignItems='center'>
        <TokenIcon token={token} />
        <Spacing size='12' />
        <Text transparency={false}>{token}</Text>
      </Container>
    )
  },
  {
    id: 'price',
    title: 'Price (USD)',
    renderCell: ({ price }) => <Text transparency={false}>{formatBalanceUsd(price)}</Text>
  },
  {
    id: 'balanceL1',
    title: 'L1 Balance',
    renderCell: ({ balanceL1, balanceUsdL1 }) => (
      <Container direction='column'>
        <Text transparency={false}>{formatBalance(balanceL1, 4)}</Text>
        <Text size={TypographySizes.Small}>
          {formatBalanceUsd(balanceUsdL1)}
        </Text>
      </Container>
    )
  },
  {
    id: 'balanceL2',
    title: 'L2 Balance',
    renderCell: ({ balanceL2, balanceUsdL2 }) => (
      <Container direction='column'>
        <Text transparency={false}>{formatBalance(balanceL2, 4)}</Text>
        <Text size={TypographySizes.Small}>
          {formatBalanceUsd(balanceUsdL2)}
        </Text>
      </Container>
    )
  },
  {
    id: 'totalBalance',
    title: 'Total Balance',
    renderCell: ({ totalBalance, totalBalanceUsd }) => (
      <Container direction='column'>
        <Text transparency={false}>{formatBalance(totalBalance, 4)}</Text>
        <Text size={TypographySizes.Small}>
          {formatBalanceUsd(totalBalanceUsd)}
        </Text>
      </Container>
    )
  }
]
