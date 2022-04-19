import { CoreCard, Input, Select, Spacing, TokenInput } from '@deversifi/dvf-shared-ui'
import { Form, Formik, FormikProps } from 'formik'
import filter from 'lodash/filter'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import keyBy from 'lodash/keyBy'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { tokens } from '../../assets/tokens'
import { L1Tokens as L1TokensConfig } from '../../config/addresses/tokens/tokens.l1'
import { L2Tokens as L2TokensConfig } from '../../config/addresses/tokens/tokens.l2'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectPrices } from '../../redux/slices/pricesSlice'
import {
  fetchAllowance,
  selectAddress,
  selectBalances
} from '../../redux/slices/walletSlice'
import {
  BridgeValidationSchema,
  dynamicSchemaCreator
} from '../../services/validation/formValidation'
import { Layers, layerSwitch } from '../../utils/layer'
import { BridgeFundsWidgetCTA } from './BridgeFundsWidgetCTA'

const L1Tokens = L1TokensConfig.map(token => token.symbol)
const L2Tokens = L2TokensConfig.map(token => token.symbol)

enum Networks {
  Starknet = 'starknet',
  Ethereum = 'ethereum'
}

const networks = [
  { id: Networks.Starknet, name: 'Starknet', icon: <img src={tokens.starknet} alt='starknet' /> },
  { id: Networks.Ethereum, name: 'Ethereum', icon: <img src={tokens.ethereum} alt='starknet' /> }
]
const networksById = keyBy(networks, 'id')

export type FormValues = {
  token: string
  amount: string
  fromNetwork: Networks
  toNetwork: Networks
  toAddress: string
}

export const BridgeFundsWidget = () => {
  const dispatch = useAppDispatch()

  const addressL1 = useAppSelector(selectAddress(Layers.L1))
  const addressL2 = useAppSelector(selectAddress(Layers.L2))
  const l1Balances = useAppSelector(selectBalances(Layers.L1))
  const l2Balances = useAppSelector(selectBalances(Layers.L2))
  const prices = useAppSelector(selectPrices)

  const formRef = useRef<FormikProps<FormValues>>(null)
  const addressInputRef = useRef() as MutableRefObject<HTMLInputElement>

  const [isDeposit, setIsDeposit] = useState(true)

  useEffect(() => {
    if (isDeposit && addressL2) {
      const currentValue = formRef?.current?.values?.toAddress
      formRef?.current?.setFieldValue('toAddress', (currentValue === addressL1 || !currentValue) ? addressL2 : currentValue)
    }
  }, [addressL2, isDeposit])

  useEffect(() => {
    if (!isDeposit && addressL1) {
      const currentValue = formRef?.current?.values?.toAddress
      formRef?.current?.setFieldValue('toAddress', (currentValue === addressL2 || !currentValue) ? addressL1 : currentValue)
    }
  }, [addressL1, isDeposit])

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
    // TODO:
    // if (formRef?.current) {
    //   fetchAllowance(formRef?.current?.values.token)
    // }
  }

  const layer = useMemo(() => isDeposit ? Layers.L1 : Layers.L2, [isDeposit])

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
                layerSwitch(layer, l1Balances, l2Balances),
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
        {({ values, setFieldValue, isValid, touched }) => (
          <>
            <Form>
              <TokenInput
                type='number'
                label='TOKEN'
                inputName='amount'
                selectName='token'
                selectLabel='Token'
                list={layerSwitch(layer, L1Tokens, L2Tokens)}
                // @ts-ignore
                onSelect={(value: any) => handleTokenSelect(value, setFieldValue)}
                // @ts-ignore
                onInputChange={(value: number) =>
                  setFieldValue('amount', value.toString())}
                maxValue={layerSwitch(layer, l1Balances?.[values.token]?.balance, l2Balances?.[values.token]?.balance) || 0}
                isExchangeBalance={false}
                blockchainBalance={layerSwitch(layer, l1Balances, l2Balances)}
                tokenPrices={prices}
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
            <BridgeFundsWidgetCTA
              layer={layer}
              isDeposit={isDeposit}
              addressL1={addressL1}
              addressL2={addressL2}
              formValues={values}
              isFormValid={isValid && !isEmpty(touched)}
            />
          </>
        )}
      </Formik>
    </CoreCard>
  )
}

const WidgetSeparator = styled.div`
  background: ${({ theme }) => theme.neutral};
  height: 1px;
  width: 100%;
  margin: 20px 0px;
`
