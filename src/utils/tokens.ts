import { L1Tokens as L1TokensConfig } from '../config/addresses/tokens/tokens.l1'
import { L2Tokens as L2TokensConfig } from '../config/addresses/tokens/tokens.l2'
import { Layers, layerSwitch } from './layer'

export const getTokenDetails = (layer: Layers, token: string) =>
  layerSwitch(layer, L1TokensConfig, L2TokensConfig).filter(
    (item: any) => item.symbol === token
  )[0]
