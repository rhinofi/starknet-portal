const L1_MESSAGING = require('../abis/l1/StarknetMessaging.json')

const L1_ERC20 = require('../abis/l1/ERC20.json')
const L2_ERC20 = require('../abis/l2/ERC20.json')

const L1_ETH_BRIDGE = require('../abis/l1/StarknetEthBridge.json')
const L1_ERC20_BRIDGE = require('../abis/l1/StarknetERC20Bridge.json')
const L2_TOKEN_BRIDGE = require('../abis/l2/token_bridge.json')

export const ABIS = {
  L1_ERC20,
  L2_ERC20,
  L1_ETH_BRIDGE,
  L1_ERC20_BRIDGE,
  L2_TOKEN_BRIDGE,
  L1_MESSAGING
}
