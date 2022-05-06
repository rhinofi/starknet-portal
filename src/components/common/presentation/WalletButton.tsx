import styled from 'styled-components'

export const WalletButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const WalletButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 83px;
  margin-bottom: 10px;
  background: ${props => props.disabled ? props.theme.neutral : 'transparent'};
  border-radius: 4px;
  font-weight: 500;
  font-size: ${props => props.disabled ? '12px' : '16px'};
  line-height: 26px;
  border: 1px solid ${props => props.theme.neutral};
  font-family: ${props => props.theme.defaultFont};
  color: #FFFFFF;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: border-color 0.2s linear;
  outline: none;
  min-width: 414px;

  span {
    margin-left: 8.5px;
  }

  img {
    max-height: 54px;
  }

  & > div:first-child {
    display: flex;
    align-items: center;
    height: 24px;
  }

  &:hover {
    border: 1px solid transparent;
    background-image: linear-gradient(0deg, #000 0%, #000 100%),
    ${(p) => p.theme.radiant};
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
  
  @media all and (max-width: 600px) {
    min-width: 100%;
    
    img {
      max-height: 32px;
    }
  }
`

export const WalletButtonDescription = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 12px;
`
