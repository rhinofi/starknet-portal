interface Config {
  networkId: number
  L1: Layer
  L2: Layer
}

interface Layer {
  network: string
  explorer: string
}

const config: Config = {
  networkId: 5,
  L1: {
    network: 'goerli',
    explorer: 'https://goerli.etherscan.io'
  },
  L2: {
    network: '',
    explorer: 'https://goerli.voyager.online'
  }
}

export default config
