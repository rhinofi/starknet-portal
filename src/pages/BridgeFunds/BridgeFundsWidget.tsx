import { Button, CoreCard, Input, Select, Spacing, TokenInput } from '@deversifi/dvf-shared-ui'
import { Form, Formik, FormikProps } from 'formik'
import filter from 'lodash/filter'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import tokens from '../../assets/tokens'
import { L1Tokens as L1TokensConfig } from '../../config/addresses/tokens/tokens.l1'
import { L2Tokens as L2TokensConfig } from '../../config/addresses/tokens/tokens.l2'
import { MODALS } from '../../constants/modals'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleModal } from '../../redux/slices/modalSlice'
import {
  approveToken,
  deposit,
  fetchAllowance,
  selectAddress,
  selectAllowances,
  selectBalances,
  withdraw
} from '../../redux/slices/walletSlice'
import {
  BridgeValidationSchema,
  dynamicSchemaCreator
} from '../../services/validation/formValidation'
import { Layers } from '../../utils/layer'

const L1Tokens = L1TokensConfig.map(token => token.symbol)
const L2Tokens = L2TokensConfig.map(token => token.symbol)

// const StarknetIcon = tokens.starknet
enum Networks {
  Starknet = 'starknet',
  Ethereum = 'ethereum'
}

const networks = [
  { id: Networks.Starknet, name: 'Starknet', icon: <img src={tokens.starknet} alt='starknet' /> },
  { id: Networks.Ethereum, name: 'Ethereum', icon: <img src={tokens.ethereum} alt='starknet' /> }
]
const networksById = keyBy(networks, 'id')

type FormValues = {
  token: string
  amount: string
  fromNetwork: Networks
  toNetwork: Networks
  toAddress: string
}

const BridgeFundsWidget = () => {
  const dispatch = useAppDispatch()

  const addressL1 = useAppSelector(selectAddress(Layers.L1))
  const addressL2 = useAppSelector(selectAddress(Layers.L2))
  const l1Balances = useAppSelector(selectBalances(Layers.L1))
  const l2Balances = useAppSelector(selectBalances(Layers.L2))
  console.log('l1Balances', l1Balances)
  const allowancesL1 = useAppSelector(selectAllowances(Layers.L1))
  console.log('allowances', allowancesL1)

  const formRef = useRef<FormikProps<FormValues>>(null)
  const addressInputRef = useRef() as MutableRefObject<HTMLInputElement>

  const { token } = useMemo(() => formRef?.current?.values || {}, [formRef?.current?.values]) as FormValues
  const tokenAllowance = useMemo(() => token === 'ETH' ? 2 ** 256 - 1 : allowancesL1 ? allowancesL1[token] : 0, [token, allowancesL1])

  const [isDeposit, setIsDeposit] = useState(true)

  useEffect(() => {
    if (isDeposit && addressL2) {
      formRef?.current?.setFieldValue('toAddress', addressL2)
    }
  }, [addressL2])

  useEffect(() => {
    if (!isDeposit && addressL1) {
      formRef?.current?.setFieldValue('toAddress', addressL1)
    }
  }, [addressL1])
  console.log('is deposit', isDeposit)
  const switchIsDeposit = (l1Option: any, l2Option: any) =>
    isDeposit ? l1Option : l2Option

  const handleTokenSelect = (
    token: string,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue('token', token)
    dispatch(fetchAllowance({ token, address: addressL1 }))
  }

  const handleNetworkSelect = (
    value: Networks,
    isFrom: boolean = true,
    setFieldValue: (field: string, value: string) => void
  ) => {
    const otherNetwork = networks.filter(item => item.id !== value)[0]
    setFieldValue('fromNetwork', isFrom ? value : otherNetwork?.id)
    setFieldValue('toNetwork', isFrom ? otherNetwork?.id : value)
    setIsDeposit(
      (isFrom && value === Networks.Ethereum) ||
        (!isFrom && value === Networks.Starknet)
    )
    // if (formRef?.current) {
    //   fetchAllowance(formRef?.current?.values.token)
    // }
  }

  const fromL1 = formRef?.current?.values?.fromNetwork === Networks.Ethereum

  return (
    <CoreCard>
      <Formik
        initialValues={{
          amount: '',
          token: 'ETH',
          fromNetwork: Networks.Ethereum,
          toNetwork: Networks.Starknet,
          toAddress: ''
        }}
        validate={value =>
          dynamicSchemaCreator(value, BridgeValidationSchema, {
            balance: get(
              filter(
                switchIsDeposit(l1Balances, l2Balances),
                (balance: any) =>
                  balance.symbol === formRef?.current?.values?.token
              ),
              [0, 'balance']
            )
          })
        }
        onSubmit={() => {}}
        innerRef={formRef}
      >
        {({ values, setFieldValue }) => (
          <>
            <Form>
              <TokenInput
                type='number'
                label='TOKEN'
                inputName='amount'
                selectName='token'
                selectLabel='Token'
                list={fromL1 ? L1Tokens : L2Tokens}
                // @ts-ignore
                onSelect={(value: any) => handleTokenSelect(value, setFieldValue)}
                // @ts-ignore
                onInputChange={(value: number) =>
                  setFieldValue('amount', value.toString())}
                maxValue={l1Balances?.[values.token]?.balance || 0}
                isExchangeBalance={false}
                blockchainBalance={l1Balances}
              />
              <WidgetSeparator />
              <Select<Networks>
                selectName='fromNetwork'
                label='FROM'
                list={networks}
                onSelect={(item) =>
                  handleNetworkSelect(item, true, setFieldValue)
                }
              />
              <Select<Networks>
                selectName='toNetwork'
                label='TO'
                list={networks}
                onSelect={item =>
                  handleNetworkSelect(item, false, setFieldValue)
                }
              />
              <WidgetSeparator />
              <Input
                inputRef={addressInputRef}
                type='text'
                name='toAddress'
                label={`${networksById[values.toNetwork].name} address`.toUpperCase()}
              />
            </Form>
            <Spacing size='24' />
            {!switchIsDeposit(addressL1, addressL2)
              ? (
                <Button fullWidth onClick={() => dispatch(toggleModal(
                  switchIsDeposit(MODALS.CONNECT_WALLET_L1, MODALS.CONNECT_WALLET_L2)))}>
                Connect {switchIsDeposit('L1', 'L2')} wallet
                </Button>
              )
              : tokenAllowance === 0
                ? (
                  <Button fullWidth onClick={() => dispatch(approveToken({
                    layer: switchIsDeposit(Layers.L1, Layers.L2),
                    token: values.token,
                    address: switchIsDeposit(addressL1, addressL2)
                  }))}>
                    {'Approve'}
                  </Button>
                )
                : (
                  <Button
                    fullWidth
                    onClick={
                      switchIsDeposit(() =>
                        dispatch(deposit({
                          fromAddress: addressL1,
                          toAddress: values.toAddress,
                          amount: values.amount,
                          token: values.token
                        })),
                      () => dispatch(withdraw({
                        toAddress: values.toAddress,
                        amount: values.amount,
                        token: values.token
                      }))
                      )
                    }
                  >
                    {switchIsDeposit('Deposit', 'Withdrawal')}
                  </Button>
                )}
          </>
        )}
      </Formik>
    </CoreCard>
  )
}

export default BridgeFundsWidget

const WidgetSeparator = styled.div`
  background: ${({ theme }) => theme.neutral};
  height: 1px;
  width: 100%;
  margin: 20px 0px;
`
