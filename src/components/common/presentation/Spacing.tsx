import React, {FunctionComponent} from 'react'
import styled, {css} from 'styled-components'

interface SpacingProps {
  vertical?: number
  horizontal?: number
}

const Spacing: FunctionComponent<SpacingProps> = ({vertical, horizontal, children}) => (
  <Spacer $horizontal={horizontal} $vertical={vertical}>
    {children}
  </Spacer>
)

export default Spacing

interface StyledSpacingProps {
  $vertical?: number
  $horizontal?: number
}

const Spacer = styled.div<StyledSpacingProps>`
  ${({$vertical, $horizontal}) => $vertical
          ? css`
            height: ${$vertical}px;
          `
          : css`
            display: inline-block;
            width: ${$horizontal}px;
          `}
`