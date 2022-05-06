import Decimal from 'decimal.js'

export const calculateBalanceUsd = (balance: number, price: number) => {
  return new Decimal(balance).mul(price).toNumber()
}

export const formatBalanceUsd = (balanceUsd: number) => {
  return `$${balanceUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
}
