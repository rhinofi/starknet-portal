import { Field } from 'formik'
import get from 'lodash/get'
import styled from 'styled-components'
import { L1Tokens } from '../../../../config/addresses/tokens/tokens.l1'
import { L2Tokens } from '../../../../config/addresses/tokens/tokens.l2'
import { useAppSelector } from '../../../../redux/hooks'
import {
  selectBalancesL1,
  selectBalancesL2
} from '../../../../redux/slices/userSlice'
import { formatBalance } from '../../../../utils'
import { Text } from '../../presentation/Text'
import Input from './Input'
import { InputLabel } from './InputLabel'
import TokenSelect from './TokenSelect'

type Props = {
  selectProps: SelectProps
  inputProps: InputProps
}

type SelectProps = {
  selectLabel: string
  selectName: string
  selectValue: any
  onSelect: (item: any) => void
  isL1: boolean
}

type InputProps = {
  inputId: string
  inputLabel: string
  inputName: string
  placeholder: string
  maxValue?: number
  inputValue: number
  onInputChange: (value: any) => void
  autoFocus: boolean
}

const TokenAmount = ({ selectProps, inputProps }: Props) => {
  const {
    selectLabel = '',
    selectName = '',
    selectValue = '',
    onSelect = () => {},
    isL1 = true
  } = selectProps

  const {
    inputId = '',
    inputLabel = '',
    inputName = '',
    placeholder = '',
    maxValue,
    inputValue = '',
    onInputChange = () => {},
    autoFocus = false
  } = inputProps

  const balancesL1 = useAppSelector(selectBalancesL1)
  const balancesL2 = useAppSelector(selectBalancesL2)

  const getSelectedTokenBalance = () => {
    return (
      get(
        (isL1 ? balancesL1 : balancesL2).filter(
          balance => balance.symbol === selectValue.id
        ),
        [0, 'balance']
      ) || 0
    )
  }

  const options = (isL1 ? L1Tokens : L2Tokens).map(token => ({
    id: token.symbol,
    title: token.symbol
  }))

  return (
    <div>
      <Selection>
        <InputLabel htmlFor={inputId}>{inputLabel}</InputLabel>
        <Field
          name={selectName}
          component={TokenSelect}
          list={options}
          onSelect={onSelect}
          selectedValue={selectValue}
          selectLabel={selectLabel}
        />
      </Selection>
      <Input
        type='number'
        name={inputName}
        onInputChange={onInputChange}
        placeholder={placeholder}
        maxValue={maxValue}
        value={inputValue}
        autoFocus={autoFocus}
      />
      <Text>
        Available: {formatBalance(getSelectedTokenBalance())} {selectValue.id}
      </Text>
    </div>
  )
}

export default TokenAmount

const Selection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  z-index: 16;
`
