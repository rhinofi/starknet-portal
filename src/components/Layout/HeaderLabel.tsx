import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

interface HeaderLabelProps {
    tab: string;
}

const HeaderLabel: FunctionComponent<HeaderLabelProps> = ({ tab = '' }) => (
  <Label>
    {tab}
  </Label>
)

export default HeaderLabel

const Label = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 15px;
  line-height: 16px;
  font-weight: normal;
  color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto auto;
  left: 56px;
  font-family: ${({ theme }) => theme.mainFont};
`
