import { NonExistingToken, Token } from './TokenIcon.helpers'
import tokens from '../../../../assets/tokens'
import styled from 'styled-components'
import { Container } from '../../presentation/Container'

type TokenIconProps = {
  token: string
  small?: boolean
}

const TokenIcon = ({ token = '', small = false }: TokenIconProps) => {
  const icon = tokens[token] || null

  return (
    <Wrapper alignItems='center' justifyContent='center'>
      {icon ? (
        <Token src={icon} alt='' small={small} />
      ) : (
        <NonExistingToken small={small}>
          {token ? token.substring(0, 1) : '?'}
        </NonExistingToken>
      )}
    </Wrapper>
  )
}

export default TokenIcon

const Wrapper = styled(Container)`
  margin-right: 10px;
`
