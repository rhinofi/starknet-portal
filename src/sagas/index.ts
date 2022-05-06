import { spawn } from '@redux-saga/core/effects'

import { notificationsSaga } from './notificationsSaga/index'
import { pricesSaga } from './pricesSaga/index'
import { walletSaga } from './walletSaga/index'

export default function * rootSaga () {
  yield spawn(walletSaga)
  yield spawn(notificationsSaga)
  yield spawn(pricesSaga)
}
