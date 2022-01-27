import styled from 'styled-components'
import { Text } from '../../presentation/Text'
import { ReactComponent as ErrorIcon } from '../../../../assets/icons/error.svg'

const InputError = ({ error = '' }) => (
  <InputErrorWrapper>
    <ErrorIcon />
    <Text size='small'>{error}</Text>
  </InputErrorWrapper>
)

export default InputError

const InputErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  text-transform: initial;
  line-height: 20px;
  font-family: ${({ theme }) => theme.mainFont};
  color: ${({ theme }) => theme.neutral100};
  margin-bottom: 10px;

  svg {
    margin-right: 8px;
  }
`
