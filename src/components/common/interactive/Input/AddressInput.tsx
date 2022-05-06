import Input from './Input'
import Copy from '../CopyButton'
import styled from 'styled-components'

type Props = {
  name: string
  inputValue: string
  onInputChange: (value: any) => void
  label: string
}

const AddressInput = ({ name, inputValue, onInputChange, label }: Props) => {
  return (
    <Wrapper>
      <Input
        type='text'
        name={name}
        onInputChange={onInputChange}
        value={inputValue}
        label={label}
      />
      <CopyWrapper>
        <Copy text={inputValue} successPosition='bottom' />
      </CopyWrapper>
    </Wrapper>
  )
}

export default AddressInput

const Wrapper = styled.div`
  position: relative;
`

const CopyWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 42px;
`
