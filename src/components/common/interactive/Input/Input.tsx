import { FieldHookConfig, useField } from 'formik'
import { ChangeEvent, HTMLInputTypeAttribute, useEffect, useRef } from 'react'
import styled from 'styled-components'
import InputError from './InputError'
import { InputLabel } from './InputLabel'

type Props = {
  type?: HTMLInputTypeAttribute
  maxValue?: number
  value: any
  onInputChange: (value: ValueType) => void
  label?: string
}

type ValueType = string | number

const Input = ({
  type = 'number',
  maxValue,
  value,
  onInputChange = () => {},
  label,
  ...props
}: Props & FieldHookConfig<string>) => {
  const inputRef = useRef(null)
  const [field, meta, helpers] = useField(props)
  const { setValue } = helpers

  const onMaxClick = () => {
    if (maxValue) {
      onInputChange(maxValue)
      setValue(maxValue.toString())
    }
  }

  const handleChange = (value: ValueType) => {
    onInputChange(value)
    setValue(value.toString())
  }

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setValue(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const defaultInputRef = /*props?.inputRef ||*/ inputRef

  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <InputWrapper /*onClick={() => defaultInputRef?.current?.focus()}*/>
        {maxValue && !isNaN(maxValue) && (
          <CustomMax /*type='button'*/ onClick={onMaxClick}>Max</CustomMax>
        )}
        <InputField
          ref={defaultInputRef}
          $invalid={meta.touched && meta.error}
          {...field}
          {...props}
          {...(type === 'number' && {
            pattern: '[0-9.]*',
            step: 'any'
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target.value)
          }
        />
      </InputWrapper>
      {meta.touched && meta.error ? <InputError error={meta.error} /> : null}
    </>
  )
}

export default Input

const InputField = styled.input`
  font-family: ${({ theme }) => theme.secondaryFont};
  height: 44px;
  width: 100%;
  outline: none;
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  padding-left: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.neutral700};
  border: none;

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${props => props.theme.neutral200};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${props => props.theme.neutral200};
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${props => props.theme.neutral200};
    opacity: 1; /* Firefox */
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:disabled {
    color: ${props => props.theme.neutral300};
    -webkit-text-fill-color: ${props => props.theme.neutral300};
    opacity: 1; /* required on iOS */
  }

  &:focus {
    border: 1px solid transparent;
    border-radius: 4px;
    background-image: linear-gradient(
        ${({ theme }) => theme.neutral600},
        ${({ theme }) => theme.neutral600}
      ),
      conic-gradient(
        from 43.98deg at 46.18% 51.15%,
        #faee87 -54.94deg,
        #e84545 28.29deg,
        #e870fb 157.82deg,
        #b3fbf7 220.83deg,
        #faee87 305.06deg,
        #e84545 388.29deg
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
`

const InputWrapper = styled.div<{ $invalid?: boolean }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  min-height: 48px;
  border: ${p => (p.$invalid ? `1px solid ${p.theme.negative500}` : 'none')};
  background: ${({ theme }) => theme.neutral600};
  color: #fff;
  font-size: 20px;
  line-height: 24px;
`

const CustomMax = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 14px;
  margin: auto;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.defaultFontColor};
  font-family: ${({ theme }) => theme.mainFont};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.secondary500};
  }

  &:active {
    color: ${({ theme }) => theme.secondary600};
  }
`
