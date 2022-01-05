import styled from 'styled-components'

interface ContainerProps {
  direction?: string
  alignItems?: string
  justifyContent?: string
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`
