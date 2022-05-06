import config from '../config/config'
import { ChainType } from '../enums/ChainType'

const getExplorerLink = (isL1: boolean) => (address: string, type: string) => {
  return `${
    ChainType[config.chain][isL1 ? 'blockExplorerUrl' : 'l2BlockExplorerUrl']
  }/${type}/${address}`
}

export const getExplorerLinkL1 = getExplorerLink(true)
export const getExplorerLinkL2 = getExplorerLink(false)
