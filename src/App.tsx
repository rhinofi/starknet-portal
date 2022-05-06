import { useEffect } from 'react'
import { useInterval } from './hooks/useInterval'
import Router from './pages/Router'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import {
  selectAddressL1,
  selectAddressL2,
  setBalancesL1,
  setBalancesL2
} from './redux/slices/userSlice'
import { getTokenBalances } from './services/balances'

const App = () => {
  const dispatch = useAppDispatch()
  const addressL1 = useAppSelector(selectAddressL1)
  const addressL2 = useAppSelector(selectAddressL2)

  useEffect(() => {
    fetchTokenBalancesL1()
    // eslint-disable-next-line
  }, [addressL1])

  useEffect(() => {
    fetchTokenBalancesL2()
    // eslint-disable-next-line
  }, [addressL2])

  const fetchTokenBalancesL1 = async () => {
    const l1Balances = await getTokenBalances(addressL1, true)
    dispatch(setBalancesL1(l1Balances))
  }

  const fetchTokenBalancesL2 = async () => {
    const l2Balances = await getTokenBalances(addressL2, false)
    dispatch(setBalancesL2(l2Balances))
  }

  useInterval(fetchTokenBalancesL1, 10000)
  useInterval(fetchTokenBalancesL2, 10000)

  return <Router />
}

export default App
