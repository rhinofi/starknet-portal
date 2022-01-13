import {FunctionComponent, useState} from 'react'
import {Title2, Title3} from '../../components/common/presentation/Text'
import {Page} from "../../components/common/presentation/Page";
import {Border} from "../../components/common/presentation/Border";
import Spacing from "../../components/common/presentation/Spacing"
import Table, {Column} from "../../components/common/presentation/Table/Table";

const columns: Column[] = [
  {
    key: 'token',
    label: 'Token',
    align: 'left'
  },
  {
    key: 'price',
    label: 'Price 24h',
    align: 'center'
  },
  {
    key: 'balance',
    label: 'Total Balance',
    align: 'right'
  }
]

const data = [
  {
    token: 'ETH',
    price: 200,
    balance: 2323.232
  },
  {
    token: 'BTC',
    price: 41234,
    balance: 0.33
  },
  {
    token: 'ETH',
    price: 200,
    balance: 2323.232
  }
]

const Portfolio: FunctionComponent = () => {
  const [usdPortfolioValue, setUsdPortfolioValue] = useState(0)
  return (
    <Page>
      <Title2>Portfolio</Title2>
      <Title3>${usdPortfolioValue}</Title3>
      <Spacing vertical={24} />
      <Border>
        <Table data={data} columns={columns} />
      </Border>
    </Page>
  )
}

export default Portfolio
