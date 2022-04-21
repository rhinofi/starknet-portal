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
        '0x30fab1f1cc35d6ab0a992240528e122bc46c196eebfed9d21a5f800f72f066d'
    },
    tokenAddress: {
      [ChainIds.MAIN]: '',
      [ChainIds.GOERLI]:
        '0x2dd93e385742984bf2fc887cd5d8b5ec6917d80af09cf7a00a63710ad51ba53'
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
