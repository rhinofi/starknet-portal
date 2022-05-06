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

export const L2Tokens: TokenConfig[] = [
  {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]:
        '0x30fab1f1cc35d6ab0a992240528e122bc46c196eebfed9d21a5f800f72f066d'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]:
        '0x2dd93e385742984bf2fc887cd5d8b5ec6917d80af09cf7a00a63710ad51ba53'
    }
  },
  {
    name: 'TKN',
    symbol: 'TKN',
    decimals: 8,
    bridgeAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]:
        '0x0061f462a8a2ea511189e4ec73d115ef65fad071e643e99644818249604a525d'
    },
    tokenAddress: {
      [ChainType.MAIN.id]: '',
      [ChainType.GOERLI.id]:
        '0x021eb73bd66eb18c37ec7b1e2567bc3fa8ba9ac0d391b53745a5f9d483217595'
    }
  }
]
