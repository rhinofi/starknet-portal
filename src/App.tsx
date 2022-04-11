import { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import GlobalModal from './components/common/interactive/Modal/GlobalModal'
import { useInterval } from './hooks/useInterval'
import Router from './pages/Router'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchBalancesL1, fetchBalancesL2, selectAddress } from './redux/slices/walletSlice'
import theme from './theme'
import { Layers } from './utils/layer'

const FETCH_BALANCES_INTERVAL = 10000 // TODO: move to config

const App = () => {
  const dispatch = useAppDispatch()
  const addressL1 = useAppSelector(selectAddress(Layers.L1))
  const addressL2 = useAppSelector(selectAddress(Layers.L2))

  const fetchTokenBalancesL1 = () => { dispatch(fetchBalancesL1({ address: addressL1 })) }
  const fetchTokenBalancesL2 = () => { dispatch(fetchBalancesL2({ address: addressL2 })) }

  useEffect(fetchTokenBalancesL1, [addressL1])
  useEffect(fetchTokenBalancesL2, [addressL2])

  useInterval(fetchTokenBalancesL1, FETCH_BALANCES_INTERVAL)
  useInterval(fetchTokenBalancesL2, FETCH_BALANCES_INTERVAL)

  return (
    <ThemeProvider theme={theme.dark}>
      <Main>
        <Router />
        <GlobalModal />
      </Main>
    </ThemeProvider>
  )
}

export default App

const Main = styled.div`
  background-color: ${({ theme }) => theme.background};
  font-family: ${({ theme }) => theme.mainFont};
  color: ${({ theme }) => theme.neutral300};
  overflow: auto;
  min-width: 1280px;
  min-height: 100vh;

  button {
    font-family: ${props => props.theme.mainFont};
  }
`
