import styled from 'styled-components'

export const Button = styled.button`
  height: 36px;
  background-color: ${({ theme }) => theme.neutral900};
  color: ${({ theme }) => theme.neutral100};
  padding: 0 33px;
  border: none;
  outline: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.neutral800};
  }

  &:active {
    background: ${({ theme }) => theme.neutral900};
  }
`

export const TextButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: ${({ theme }) => theme.defaultFontColor};
  font-family: ${({ theme }) => theme.secondaryFont};
  font-weight: normal;
  font-size: ${({ theme }) => theme.defaultFontSize};
  line-height: 22px;
`

export const LargeButton = styled.button`
  margin: 40px auto 0px;
  display: block;
  border: none;
  outline: none;
  cursor: pointer;
  background: ${({ theme }) => theme.neutral700};
  border-radius: 4px;
  height: 48px;
  color: ${({ theme }) => theme.defaultFontColor};
  font-family: ${({ theme }) => theme.mainFont};
  min-width: 170px;
`
