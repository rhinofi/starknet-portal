import { delay, put, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { config } from '../../config/config'
import { AddNotificationPayload, NotificationStatuses, UpdateNotificationPayload } from '../../redux/slices/notifications.types'
import { deleteNotification, modifyNotification, setNotification } from '../../redux/slices/notificationsSlice'
import { ADD_NOTIFICATION, UPDATE_NOTIFICATION } from '../../types'
import { randomId } from '../../utils/notifications'

function * handleAddNotification (action: PayloadAction<AddNotificationPayload>) {
  const id = action.payload.id || randomId()
  yield put(setNotification({ ...action.payload, id }))
  if (action.payload.status === NotificationStatuses.SUCCESS) {
    yield delay(config.timeouts.notificationCloseTimeout)
    yield put(deleteNotification(id))
  }
}

function * handleUpdateNotification (action: PayloadAction<UpdateNotificationPayload>) {
  yield put(modifyNotification(action.payload))
  if (action.payload.status === NotificationStatuses.SUCCESS) {
    yield delay(config.timeouts.notificationCloseTimeout)
    yield put(deleteNotification(action.payload.id))
  }
}

export function * notificationsSaga () {
  yield takeEvery(ADD_NOTIFICATION, handleAddNotification)
  yield takeEvery(UPDATE_NOTIFICATION, handleUpdateNotification)
}
