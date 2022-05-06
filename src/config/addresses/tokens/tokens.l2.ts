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

export const L2Tokens: TokenConfig[] = [
  {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    bridgeAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]:
        '0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82'
    },
    tokenAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]:
        '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
    }
  },
  {
    name: 'TKN',
    symbol: 'TKN',
    decimals: 8,
    bridgeAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]:
        '0x0061f462a8a2ea511189e4ec73d115ef65fad071e643e99644818249604a525d'
    },
    tokenAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]:
        '0x021eb73bd66eb18c37ec7b1e2567bc3fa8ba9ac0d391b53745a5f9d483217595'
    }
  },
  {
    name: 'SLF',
    symbol: 'SLF',
    decimals: 6,
    bridgeAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]: '0x00fd2a9843c19436542e0ac7fc7b5cbf1d0b69fc2abea6d68591e46a5ca2d75a'
    },
    tokenAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]: '0x07a39a50bf689e9430fc81fba0f4d46e245e1657e77455548ed7e32c808cfc10'
    }
  }
]
