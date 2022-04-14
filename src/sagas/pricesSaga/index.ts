import { call, put, takeLatest } from '@redux-saga/core/effects'

import { L1Tokens } from '../../config/addresses/tokens/tokens.l1'
import config from '../../config/config'
import { setPrices } from '../../redux/slices/pricesSlice'
import { FETCH_PRICES } from '../../types'

const fetchTokenPrices = async () => {
  const tokens = L1Tokens.map(token => token.name)
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokens.join(',')}&vs_currencies=${config.pricesCurrency}`)
  const coingeckoPrices = await res.json()
  const prices: { [key: string]: number} = {}
  L1Tokens.forEach((token) => {
    prices[token.symbol] = coingeckoPrices?.[token.name]?.usd
  })
  return prices
}

function * handleFetchPrices () {
  try {
    const prices = yield call(fetchTokenPrices)
    yield put(setPrices(prices))
  } catch (error) {
    console.error('Failed to fetch prices from Coingecko.', error)
  }
}

export function * pricesSaga () {
  yield takeLatest(FETCH_PRICES, handleFetchPrices)
}
