export type NotificationsState = {
    notifications: { [key: string]: Notification }
}

export type Notification = {
    status: NotificationStatuses
    title: string
    meta?: NotificationMeta
}

type NotificationMeta = {
  txHashL1?: string
  txHashL2?: string
  token?: string,
  description?: string
}

export enum NotificationStatuses {
    PENDING,
    ERROR,
    SUCCESS
}

export type UpdateNotificationPayload = {
    id: string,
    status?: NotificationStatuses,
    title?: string
}

export type SetNotificationPayload = {
    id: string
} & Notification

export type AddNotificationPayload = {
    id?: string
} & Notification
