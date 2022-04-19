export enum TransactionStatuses {
  NOT_SENT = 'NOT_SENT',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export const isPending = (status: TransactionStatuses) => status === TransactionStatuses.PENDING
export const isCompleted = (status: TransactionStatuses) => status === TransactionStatuses.COMPLETED
export const isNotSent = (status: TransactionStatuses) => status === TransactionStatuses.NOT_SENT
export const isFailed = (status: TransactionStatuses) => status === TransactionStatuses.FAILED
