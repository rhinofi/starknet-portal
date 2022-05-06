import { L1Tokens as L1TokensConfig } from '../config/addresses/tokens/tokens.l1'
import { L2Tokens as L2TokensConfig } from '../config/addresses/tokens/tokens.l2'
import { Layers, layerSwitch } from './layer'

export const getTokenDetails = (layer: Layers, token: string) =>
  layerSwitch(layer, L1TokensConfig, L2TokensConfig).filter(
    (item: any) => item.symbol === token
  )[0]

export const requiresAllowance = (
  allowances: { [key: string]: number },
  amount: string,
  token: string
) => {
  if (!token) return false

  if (token === 'ETH') {
    return false
  }
  const tokenDetails = getTokenDetails(Layers.L1, token)
  const tokenAllowance = (allowances?.[token] || 0) * (10 ** tokenDetails.decimals / 10 ** 18)
  return Number(amount) > tokenAllowance
}
