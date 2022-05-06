import { TransactionStatuses } from '../../enums/TransactionStatuses'
import { Layers } from '../../utils/layer'

export type BridgeState = {
  transfers: Transfer[]
}

export type TransferWithoutId = {
  type: 'deposit' | 'withdrawal'
  transactions?: {
    [key in Layers]?: Partial<TransactionState>
  }
  amount?: string
  token?: string
  toAddress?: string
  timestamp?: Date
}

export type Transfer = {
  id: string
} & TransferWithoutId

export type TransactionState = {
  hash: string
  status: TransactionStatuses
}
