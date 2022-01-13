import React, {FunctionComponent} from "react";
import styled from 'styled-components'

const LabelCard: FunctionComponent = ({children}) => (
  <Card>
    {children}
  </Card>
)

export default LabelCard

const Card = styled.div`
  padding: 8px 12px;
  min-height: 36px;
  box-sizing: border-box;
  /* Neutral/700 */

  background: ${({ theme }) => theme.neutral700};
  border-radius: 4px;
  
  display: flex;
  align-items: center;
`
