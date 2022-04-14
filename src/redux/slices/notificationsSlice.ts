import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import merge from 'lodash/merge'
import omit from 'lodash/omit'

import { RootState } from '../../store'
import { ADD_NOTIFICATION, UPDATE_NOTIFICATION } from '../../types'
import { AddNotificationPayload, NotificationsState, SetNotificationPayload, UpdateNotificationPayload } from './notifications.types'

const initialState: NotificationsState = {
  notifications: {}
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<SetNotificationPayload>) => {
      state.notifications[action.payload.id] = action.payload
    },
    modifyNotification: (state, action: PayloadAction<UpdateNotificationPayload>) => {
      const { id } = action.payload
      state.notifications[id] = merge(state.notifications[id], omit(action.payload, ['id']))
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.notifications = omit(state.notifications, [action.payload])
    }
  }
})

// Actions
export const { setNotification, modifyNotification, deleteNotification } = notificationsSlice.actions
export const addNotification = createAction<AddNotificationPayload>(ADD_NOTIFICATION)
export const updateNotification = createAction<UpdateNotificationPayload>(UPDATE_NOTIFICATION)

// Selectors
export const selectNotifications = (state: RootState) => state.notifications?.notifications || {}

export default notificationsSlice.reducer
