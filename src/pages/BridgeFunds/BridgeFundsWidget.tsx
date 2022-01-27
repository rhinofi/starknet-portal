import { Form, Formik, FormikProps } from 'formik'
import filter from 'lodash/filter'
import get from 'lodash/get'
import { useRef, useState } from 'react'
import { deposit, depositEth, initiateWithdraw } from '../../api/bridge'
import { allowance, approve } from '../../api/erc20'
import { LargeButton } from '../../components/common/interactive/Button'
import AddressInput from '../../components/common/interactive/Input/AddressInput'
import InputSelect, {
  SelectItemProps
} from '../../components/common/interactive/Input/InputSelect'
import TokenAmount from '../../components/common/interactive/Input/TokenAmount'
import Widget, {
  WidgetFormWrapper,
  WidgetSeparator
} from '../../components/common/presentation/Widget/Widget'
import { L1Tokens } from '../../config/addresses/tokens/tokens.l1'
import { L2Tokens } from '../../config/addresses/tokens/tokens.l2'
import config from '../../config/config'
import { useAppSelector } from '../../redux/hooks'
import {
  selectAddressL1,
  selectAddressL2,
  selectBalancesL1,
  selectBalancesL2
} from '../../redux/slices/userSlice'
import {
  BridgeValidationSchema,
  dynamicSchemaCreator
} from '../../services/validation/formValidation'
import { l1_getContract, l2_getContract } from '../../utils/contract'

const starknetERC20BridgeABI = require('../../abis/l1/StarknetERC20Bridge.json')
const starknetEthBridgeABI = require('../../abis/l1/StarknetEthBridge.json')
const L2BridgeABI = require('../../abis/l2/token_bridge.json')
const ERC20ABIL1 = require('../../abis/l1/ERC20.json')
const ERC20ABIL2 = require('../../abis/l2/ERC20.json')

const networks = [
  { id: 'starknet', title: 'Starknet' },
  { id: 'ethereum', title: 'Ethereum' }
]
const MAX_ALLOWED_VALUE = 2 ** 256 - 1

const chainId = config.networkId

type FormValues = {
  token: SelectItemProps
  amount: string
  fromNetwork: SelectItemProps
  toNetwork: SelectItemProps
  toAddress: string
}

const BridgeFundsWidget = () => {
  const addressL1 = useAppSelector(selectAddressL1)
  const addressL2 = useAppSelector(selectAddressL2)
  const l1Balances = useAppSelector(selectBalancesL1)
  const l2Balances = useAppSelector(selectBalancesL2)

  const [isDeposit, setIsDeposit] = useState(true)
  const [allowanceAmount, setAllowanceAmount] = useState(0)
  const formRef = useRef<FormikProps<FormValues>>(null)

  const switchIsDeposit = (l1Option: any, l2Option: any) =>
    isDeposit ? l1Option : l2Option

  const getTokenDetails = (token: SelectItemProps) =>
    switchIsDeposit(L1Tokens, L2Tokens).filter(
      (item: any) => item.symbol === token.id
    )[0]

  const fetchAllowance = async (token: SelectItemProps) => {
    if (token.id === 'ETH' || !isDeposit) {
      setAllowanceAmount(MAX_ALLOWED_VALUE)
    } else {
      try {
        const tokenDetails = getTokenDetails(token)
        if (tokenDetails && tokenDetails.tokenAddress) {
          const contract = switchIsDeposit(l1_getContract, l2_getContract)(
            tokenDetails.tokenAddress[chainId],
            switchIsDeposit(ERC20ABIL1, ERC20ABIL2)
          )
          const allowanceRes = await allowance({
            owner: switchIsDeposit(addressL1, addressL2),
            spender: tokenDetails.bridgeAddress[chainId],
            decimals: tokenDetails.decimals,
            contract
          })
          setAllowanceAmount(allowanceRes)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleTokenSelect = async (
    token: SelectItemProps,
    setFieldValue: (field: string, value: SelectItemProps) => void
  ) => {
    setFieldValue('token', token)
    fetchAllowance(token)
  }

  const handleApproval = async (token: SelectItemProps) => {
    const tokenDetails = getTokenDetails(token)
    if (tokenDetails && tokenDetails.tokenAddress) {
      const contract = switchIsDeposit(l1_getContract, l2_getContract)(
        tokenDetails.tokenAddress[chainId],
        switchIsDeposit(ERC20ABIL1, ERC20ABIL2)
      )

      await approve({
        spender: tokenDetails.bridgeAddress[chainId],
        value: MAX_ALLOWED_VALUE.toString(16),
        contract,
        options: {
          from: switchIsDeposit(addressL1, addressL2)
        }
      })

      await fetchAllowance(token)
    }
  }

  const handleNetworkSelect = (
    value: SelectItemProps,
    isFrom: boolean = true,
    setFieldValue: (field: string, value: SelectItemProps) => void
  ) => {
    const otherNetwork = networks.filter(item => item !== value)[0]
    setFieldValue('fromNetwork', isFrom ? value : otherNetwork)
    setFieldValue('toNetwork', isFrom ? otherNetwork : value)
    setIsDeposit(
      (isFrom && value.id === 'ethereum') ||
        (!isFrom && value.id === 'starknet')
    )
    if (formRef?.current) {
      fetchAllowance(formRef?.current?.values.token)
    }
  }

  const handleDeposit = async (values: {
    toAddress: string
    amount: string
    token: SelectItemProps
  }) => {
    const { toAddress, amount, token } = values
    const tokenDetails = getTokenDetails(token)
    const tokenBridgeAddress = tokenDetails.bridgeAddress[chainId]

    if (token.id === 'ETH') {
      const contract = l1_getContract(tokenBridgeAddress, starknetEthBridgeABI)
      await depositEth({
        recipient: toAddress,
        amount: amount.toString(),
        contract,
        options: {
          from: addressL1
        },
        emitter: (error: any, transactionHash: string) => {
          if (!error) {
            console.log('Tx hash received', { transactionHash })
          }
        }
      })
    } else {
      const contract = l1_getContract(
        tokenBridgeAddress,
        starknetERC20BridgeABI
      )

      await deposit({
        recipient: toAddress,
        amount: amount.toString(),
        decimals: tokenDetails.decimals,
        contract,
        options: {
          from: addressL1
        },
        emitter: (error: any, transactionHash: string) => {
          if (!error) {
            console.log('Tx hash received', { transactionHash })
          }
        }
      })
    }
  }

  const handleWithdrawal = async (values: {
    toAddress: string
    amount: string
    token: SelectItemProps
  }) => {
    const { toAddress, amount, token } = values
    const tokenDetails = getTokenDetails(token)
    const tokenBridgeAddress = tokenDetails.bridgeAddress[chainId]

    const contract = l2_getContract(tokenBridgeAddress, L2BridgeABI)

    await initiateWithdraw({
      recipient: toAddress,
      amount: amount.toString(),
      decimals: tokenDetails.decimals,
      contract
    })
  }

  return (
    <Widget width={500} isWhiteBg={false}>
      <Formik
        initialValues={{
          amount: '',
          token: {} as SelectItemProps,
          fromNetwork: {} as SelectItemProps,
          toNetwork: {} as SelectItemProps,
          toAddress: ''
        }}
        validate={value =>
          dynamicSchemaCreator(value, BridgeValidationSchema, {
            balance: get(
              filter(
                switchIsDeposit(l1Balances, l2Balances),
                (balance: any) =>
                  balance.symbol === formRef?.current?.values?.token?.id
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
            <WidgetFormWrapper>
              <Form>
                <TokenAmount
                  selectProps={{
                    selectLabel: 'TOKEN',
                    selectName: 'token',
                    selectValue: values.token,
                    onSelect: value => handleTokenSelect(value, setFieldValue),
                    isL1: values.fromNetwork.id === 'ethereum'
                  }}
                  inputProps={{
                    inputId: 'amount',
                    inputLabel: '',
                    inputName: 'amount',
                    placeholder: '',
                    inputValue: Number(values.amount),
                    onInputChange: (value: number) =>
                      setFieldValue('amount', value.toString()),
                    autoFocus: true
                  }}
                />
                <WidgetSeparator />
                <InputSelect
                  label='FROM'
                  selectedItem={values.fromNetwork}
                  options={networks}
                  onSelect={item =>
                    handleNetworkSelect(item, true, setFieldValue)
                  }
                  showIcons
                />
                <InputSelect
                  label='TO'
                  selectedItem={values.toNetwork}
                  options={networks}
                  onSelect={item =>
                    handleNetworkSelect(item, false, setFieldValue)
                  }
                  showIcons
                />
                <WidgetSeparator />
                <AddressInput
                  name='toAddress'
                  onInputChange={value => setFieldValue('toAddress', value)}
                  inputValue={values.toAddress}
                  label={`${values.toNetwork.title} address`}
                />
              </Form>
            </WidgetFormWrapper>
            {!switchIsDeposit(addressL1, addressL2) ? (
              <LargeButton disabled={true}>
                Connect {switchIsDeposit('L1', 'L2')} wallet first
              </LargeButton>
            ) : allowanceAmount === 0 ? (
              <LargeButton onClick={() => handleApproval(values.token)}>
                Approve
              </LargeButton>
            ) : (
              <LargeButton
                onClick={() =>
                  switchIsDeposit(handleDeposit, handleWithdrawal)(values)
                }
              >
                {switchIsDeposit('Deposit', 'Withdrawal')}
              </LargeButton>
            )}
          </>
        )}
      </Formik>
    </Widget>
  )
}

export default BridgeFundsWidget
