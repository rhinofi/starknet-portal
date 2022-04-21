const ETHERSCAN_URL = 'etherscan.io'
const VOYAGER_URL = 'voyager.online'

type CommonConfig = {
  pricesCurrency: 'usd';
  intervals: {
    fetchBalancesInterval: number;
    fetchPricesInterval: number;
  };
  timeouts: {
    notificationCloseTimeout: number;
  };
  maxAllowance: number;
};

const commonConfig: CommonConfig = {
  pricesCurrency: 'usd',
  intervals: {
    fetchBalancesInterval: 10 * 1000,
    fetchPricesInterval: 60 * 1000
  },
  timeouts: {
    notificationCloseTimeout: 10000
  },
  maxAllowance: 2 ** 256 - 1
}

export enum ChainIds {
  MAIN = 1,
  GOERLI = 5
}

type NetworkConfig = {
  chainId: ChainIds;
  chainName: string;
  starknetContract: string;
  l1BlockExplorerUrl: string;
  l2BlockExplorerUrl: string;
  l2Id: string;
  l2IdPrefix: string;
};

const goerliConfig: NetworkConfig = {
  chainId: ChainIds.GOERLI,
  chainName: 'goerli',
  starknetContract: '0xde29d060d45901fb19ed6c6e959eb22d8626708e',
  l1BlockExplorerUrl: `https://goerli.${ETHERSCAN_URL}`,
  l2BlockExplorerUrl: `https://goerli.${VOYAGER_URL}`,
  l2Id: 'SN_GOERLI',
  l2IdPrefix: '1536727068981429685321'
}

const mainConfig: NetworkConfig = {
  chainId: ChainIds.MAIN,
  chainName: 'main',
  starknetContract: '',
  l1BlockExplorerUrl: `https://${ETHERSCAN_URL}`,
  l2BlockExplorerUrl: `https://${VOYAGER_URL}`,
  l2Id: 'SN_MAIN',
  l2IdPrefix: '23448594291968334'
}

export const config = {
  ...commonConfig,
  ...(process.env.NODE_ENV === 'development'
    ? goerliConfig
    : mainConfig)
}
