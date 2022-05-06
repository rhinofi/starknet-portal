import { Button } from '@deversifi/dvf-shared-ui'
import { useMemo } from 'react'

import { MODALS } from '../../constants/modals'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleModal } from '../../redux/slices/modalSlice'
import {
  approveToken,
  deposit,
  initiateWithdraw,
  selectAllowances
} from '../../redux/slices/walletSlice'
import { Layers, layerSwitch } from '../../utils/layer'
import { requiresAllowance } from '../../utils/tokens'
import { FormValues } from './BridgeFunds'

type Props = {
  layer: Layers
  isDeposit: boolean
  addressL1: string
  addressL2: string
  formValues: FormValues
  isFormValid: boolean
  resetAmount: () => void
}

export const BridgeFundsWidgetCTA = ({
  layer,
  isDeposit,
  addressL1,
  addressL2,
  formValues,
  isFormValid,
  resetAmount = () => {}
}: Props) => {
  const dispatch = useAppDispatch()

  const allowancesL1 = useAppSelector(selectAllowances(Layers.L1))

  const { token, amount } = useMemo(() => formValues || {}, [
    formValues
  ]) as FormValues
  const needsApproval = useMemo(
    () =>
      layerSwitch(layer, requiresAllowance(allowancesL1, amount, token), false),
    [layer, amount, token, allowancesL1]
  )

  // Connect wallet CTA
  if (!layerSwitch(layer, addressL1, addressL2)) {
    return (
      <Button
        fullWidth
        onClick={() =>
          dispatch(
            toggleModal(
              layerSwitch(
                layer,
                MODALS.CONNECT_WALLET_L1,
                MODALS.CONNECT_WALLET_L2
              )
            )
          )
        }
      >
        Connect {layerSwitch(layer, 'L1', 'L2')} wallet
      </Button>
    )
  }

  // Approve CTA
  if (needsApproval) {
    return (
      <Button
        fullWidth
        onClick={() =>
          dispatch(
            approveToken({
              layer,
              token: formValues.token,
              address: layerSwitch(layer, addressL1, addressL2)
            })
          )
        }
      >
        {'Approve'}
      </Button>
    )
  }

  // Deposit CTA
  if (isDeposit) {
    return (
      <Button
        fullWidth
        disabled={!isFormValid}
        onClick={() => {
          dispatch(
            deposit({
              fromAddress: addressL1,
              toAddress: formValues.toAddress,
              amount: formValues.amount,
              token: formValues.token
            })
          )
          // resetAmount()
        }}
      >
        {'Deposit'}
      </Button>
    )
  }

  // Withdrawal CTA
  return (
    <Button
      fullWidth
      disabled={!isFormValid}
      onClick={() => {
        dispatch(
          initiateWithdraw({
            toAddress: formValues.toAddress,
            amount: formValues.amount,
            token: formValues.token
          })
        )
        resetAmount()
      }}
    >
      {'Initiate withdraw'}
    </Button>
  )
}
