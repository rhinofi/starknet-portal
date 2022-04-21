import { config } from '../config/config'

const getExplorerLink = (isL1: boolean) => (address: string, type: string) => {
  return `${isL1 ? config.l1BlockExplorerUrl : config.l2BlockExplorerUrl}/${type}/${address}`
}

export const getExplorerLinkL1 = getExplorerLink(true)
export const getExplorerLinkL2 = getExplorerLink(false)
