import { ChainIds } from '../../config'

type TokenConfig = {
  name: string
  symbol: string
  decimals: number
  bridgeAddress: {
    [key in ChainIds]: string
  }
  tokenAddress?: {
    [key in ChainIds]: string
  }
}

export const L1Tokens: TokenConfig[] = [
  {
    name: 'ethereum',
    symbol: 'ETH',
    decimals: 18,
    bridgeAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]: '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e'
    }
  },
  {
    name: 'usd-coin',
    symbol: 'TKN',
    decimals: 8,
    bridgeAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]: '0x5542fd7dc64008978B50Ccb56274a00DEF2B57FE'
    },
    tokenAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]: '0xe4C2493C66e068D65Cf1C38a2d7bDa25d9f08980'
    }
  },
  {
    name: 'bitcoin', // to get a price from Coingecko
    symbol: 'SLF',
    decimals: 6,
    bridgeAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]: '0x160e7631f22035149A01420cADD1012267551181'
    },
    tokenAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]: '0xd44BB808bfE43095dBb94c83077766382D63952a'
    }
  }
]
