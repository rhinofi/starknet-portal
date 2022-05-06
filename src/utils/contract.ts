
import { getStarknet } from '@argent/get-starknet'
import {
  Abi,
  Contract as L2Contract,
  stark
} from 'starknet'
import { Contract as L1Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'

import { web3 } from '../web3'

const TransactionConsumedStatuses = ['PENDING', 'ACCEPTED_ON_L2']

export const l1_getContract = (address: string, ABI: AbiItem[]) =>
  new web3.eth.Contract(ABI, address)

export const l1_callContract = async (
  contract: L1Contract,
  method: string,
  args: string[] = []
) => {
  try {
    return await contract.methods?.[method](...args).call()
  } catch (ex) {
    return Promise.reject(ex)
  }
}

export const l1_sendTransaction = async (
  contract: L1Contract,
  method: string,
  args: string[] = [],
  options = {},
  cb = () => {}
) => {
  try {
    return contract.methods?.[method](...args).send(options, cb)
  } catch (ex) {
    return Promise.reject(ex)
  }
}

export const l2_getContract = (address: string, ABI: Abi) => new L2Contract(ABI, address)

export const l2_callContract = async (
  contract: L2Contract,
  method: string,
  args: any[] = []
) => {
  try {
    return await contract.call(method, args)
  } catch (ex) {
    return Promise.reject(ex)
  }
}

export const l2_sendTransaction = async (
  contract: L2Contract,
  method: string,
  args: any = {}
) => {
  try {
    console.log(args)
    const calldata = stark.compileCalldata(args)
    const transaction = {
      contractAddress: contract.address,
      entrypoint: method,
      calldata
    }
    console.log(transaction)
    return await getStarknet()?.account?.execute(transaction)
  } catch (ex) {
    return Promise.reject(ex)
  }
}

export const l2_waitForTransaction = async (
  hash: string,
  customStatus: string,
  retryInterval: number = 5000
) => {
  return new Promise<void>(resolve => {
    let processing = false
    const waitingForStatuses = customStatus
      ? [customStatus]
      : TransactionConsumedStatuses
    console.debug(
      `Waiting for transaction with statuses ${waitingForStatuses.join(' ')}`
    )
    const intervalId = setInterval(async () => {
      if (processing) return
      console.debug('Checking transaction again')
      const statusPromise = getStarknet().provider.getTransactionStatus(hash)
      processing = true
      const { tx_status } = await statusPromise
      console.debug(`Transaction status is ${tx_status}`)
      if (waitingForStatuses.includes(tx_status)) {
        console.debug('We got our desired status!')
        clearInterval(intervalId)
        resolve()
      } else {
        console.debug('We haven\'t got our desired status, trying again.')
        processing = false
      }
    }, retryInterval)
  })
}
