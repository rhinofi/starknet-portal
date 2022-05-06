import styled from 'styled-components'

interface LabelProps {
  $active?: boolean
}

const Label = styled.label<LabelProps>`
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.defaultFontColor};
  font-family: ${({ theme }) => theme.mainFont};
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
  cursor: ${({ $active }) => ($active ? 'pointer' : 'regular')};
`

export const InputLabel = styled(Label)`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.neutral100};
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-transform: uppercase;
  margin-bottom: 4px;
`
