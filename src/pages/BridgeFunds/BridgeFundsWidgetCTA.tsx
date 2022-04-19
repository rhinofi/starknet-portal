import { Button } from '@deversifi/dvf-shared-ui'
import { useMemo } from 'react'
import styled from 'styled-components'

import arrowDown from '../../assets/icons/arrow-down.svg'
import { config } from '../../config/config'
import { MODALS } from '../../constants/modals'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectWithdrawal } from '../../redux/slices/bridgeSlice'
import { toggleModal } from '../../redux/slices/modalSlice'
import {
  approveToken,
  claimWithdraw,
  deposit,
  initiateWithdraw,
  selectAllowances
} from '../../redux/slices/walletSlice'
import { Layers, layerSwitch } from '../../utils/layer'
import { FormValues } from './BridgeFundsWidget'

type Props = {
  layer: Layers
  isDeposit: boolean
  addressL1: string
  addressL2: string
  formValues: FormValues
  isFormValid: boolean
}

export const BridgeFundsWidgetCTA = ({
  layer,
  isDeposit,
  addressL1,
  addressL2,
  formValues,
  isFormValid
}: Props) => {
  const dispatch = useAppDispatch()

  const allowancesL1 = useAppSelector(selectAllowances(Layers.L1))
  const withdrawal = useAppSelector(selectWithdrawal)

  const { token } = useMemo(() => formValues || {}, [formValues]) as FormValues
  const tokenAllowance = useMemo(
    () =>
      token === 'ETH'
        ? config.maxAllowance
        : allowancesL1
          ? allowancesL1[token]
          : 0,
    [token, allowancesL1]
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
  if (tokenAllowance === 0) {
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
        onClick={() =>
          dispatch(
            deposit({
              fromAddress: addressL1,
              toAddress: formValues.toAddress,
              amount: formValues.amount,
              token: formValues.token
            })
          )
        }
      >
        {'Deposit'}
      </Button>
    )
  }

  // Withdrawal CTA
  return (
    <>
      <Button
        fullWidth
        disabled={!isFormValid || Boolean(withdrawal?.transactions?.[Layers.L2]?.status)}
        onClick={() =>
          dispatch(
            initiateWithdraw({
              toAddress: formValues.toAddress,
              amount: formValues.amount,
              token: formValues.token
            })
          )
        }
      >
        {'Initiate withdraw'}
      </Button>
      <ArrowWrapper>
        <img src={arrowDown} alt='arrow down' />
      </ArrowWrapper>
      <Button
        // disabled={withdrawal?.transactions?.[Layers.L2]?.status !== TransactionStatuses.COMPLETED && !withdrawal?.transactions?.[Layers.L1]?.status}
        fullWidth
        onClick={() =>
          dispatch(
            claimWithdraw({
              toAddress: formValues.toAddress,
              amount: formValues.amount,
              token: formValues.token
            })
          )
        }
      >
        {'Claim withdraw'}
      </Button>
    </>
  )
}

const ArrowWrapper = styled.div`
  margin: 14px auto;
  text-align: center;
`
