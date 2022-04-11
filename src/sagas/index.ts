import { spawn } from '@redux-saga/core/effects'

import { walletSaga } from './walletSaga/index'

export default function * rootSaga () {
  yield spawn(walletSaga)
}
