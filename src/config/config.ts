interface Config {
  chainId: number // TODO: remove and keep only the two others
  chainIdL1: number
  chainIdL2: number
  chain: 'GOERLI' | 'MAIN'
  pricesCurrency: string
  intervals: { [key: string]: number }
  timeouts: { [key: string]: number }
  starknetContract: string
  maxAllowance: number
}

export const config: Config = {
  chainId: 5,
  chainIdL1: 5,
  chainIdL2: 5,
  chain: 'GOERLI',
  pricesCurrency: 'usd',
  intervals: {
    fetchBalancesInterval: 10 * 1000,
    fetchPricesInterval: 60 * 1000
  },
  timeouts: {
    notificationCloseTimeout: 5000
  },
  starknetContract: '0xde29d060d45901fb19ed6c6e959eb22d8626708e',
  maxAllowance: 2 ** 256 - 1
}
