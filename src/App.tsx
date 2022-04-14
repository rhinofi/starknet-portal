import { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import GlobalModal from './components/common/interactive/Modal/GlobalModal'
import Notifications from './components/common/presentation/Notifications/Notifications'
import config from './config/config'
import { useInterval } from './hooks/useInterval'
import Router from './pages/Router'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchPrices } from './redux/slices/pricesSlice'
import { fetchBalancesL1, fetchBalancesL2, selectAddress } from './redux/slices/walletSlice'
import { listenToLogMessageToL2Event } from './services/eventManager'
import theme from './theme'
import { Layers } from './utils/layer'

const App = () => {
  const dispatch = useAppDispatch()
  const addressL1 = useAppSelector(selectAddress(Layers.L1))
  const addressL2 = useAppSelector(selectAddress(Layers.L2))

  const fetchTokenBalancesL1 = () => { if (addressL1) dispatch(fetchBalancesL1({ address: addressL1 })) }
  const fetchTokenBalancesL2 = () => { if (addressL2) dispatch(fetchBalancesL2({ address: addressL2 })) }

  useEffect(fetchTokenBalancesL1, [addressL1])
  useEffect(fetchTokenBalancesL2, [addressL2])

  useInterval(fetchTokenBalancesL1, config.intervals.fetchBalancesInterval)
  useInterval(fetchTokenBalancesL2, config.intervals.fetchBalancesInterval)

  useInterval(() => dispatch(fetchPrices()), config.intervals.fetchPricesInterval, true)

  useEffect(() => {
    listenToLogMessageToL2Event(dispatch)
  }, [])

  return (
    <ThemeProvider theme={theme.dark}>
      <Main>
        <Router />
        <GlobalModal />
        <Notifications />
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
