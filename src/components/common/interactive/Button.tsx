import styled from "styled-components"

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
