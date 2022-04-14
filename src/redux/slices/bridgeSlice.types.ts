import { TransactionStatuses } from '../../enums/TransactionStatuses'
import { Layers } from '../../utils/layer'

export type BridgeState = {
  deposit: DepositState;
};

export type DepositState = {
  transactions?: {
    [key in Layers]?: TransactionState;
  };
  amount?: string;
  token?: string;
};

type TransactionState = {
  hash: string;
  status: TransactionStatuses;
};
