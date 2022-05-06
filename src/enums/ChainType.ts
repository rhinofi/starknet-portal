const ETHERSCAN_URL = 'etherscan.io'
const VOYAGER_URL = 'voyager.online'

type ChainProps = {
  id: number
  name: string
  blockExplorerUrl: string
  l2Id: string
  l2IdPrefix: string
  l2BlockExplorerUrl: string
}

export const ChainType: { [key: string]: ChainProps } = {
  MAIN: {
    id: 1,
    name: 'main',
    blockExplorerUrl: `https://${ETHERSCAN_URL}`,
    l2Id: 'SN_MAIN',
    l2IdPrefix: '23448594291968334',
    l2BlockExplorerUrl: `https://${VOYAGER_URL}`
  },
  GOERLI: {
    id: 5,
    name: 'goerli',
    blockExplorerUrl: `https://goerli.${ETHERSCAN_URL}`,
    l2Id: 'SN_GOERLI',
    l2IdPrefix: '1536727068981429685321',
    l2BlockExplorerUrl: `https://goerli.${VOYAGER_URL}`
  }
}
