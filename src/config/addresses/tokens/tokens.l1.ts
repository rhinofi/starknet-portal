import { ChainType } from '../../../enums/ChainType'

type TokenConfig = {
  name: string
  symbol: string
  decimals: number
  bridgeAddress: {
    [key: number]: string
  }
  tokenAddress?: {
    [key: number]: string
  }
}

export const L1Tokens: TokenConfig[] = [
  {
    name: 'ethereum',
    symbol: 'ETH',
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xcf98f0A8edC6a730E1CA6B64a2528c6bE031Cb12'
    }
  },
  {
    name: 'usd-coin',
    symbol: 'TKN',
    decimals: 8,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x5542fd7dc64008978B50Ccb56274a00DEF2B57FE'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xe4C2493C66e068D65Cf1C38a2d7bDa25d9f08980'
    }
  },
  {
    name: 'bitcoin', // to get a price from Coingecko
    symbol: 'SLF',
    decimals: 6,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0x160e7631f22035149A01420cADD1012267551181'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]: '0xd44BB808bfE43095dBb94c83077766382D63952a'
    }
  }
]
