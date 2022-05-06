import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Layers } from '../../utils/layer'
import { WalletInfo } from '../common/interactive/WalletInfo'

export const TopNavigation: FunctionComponent = () => {
  return (
    <TopHeaderWrapper>
      <TopHeaderBackground>
        <TopHeaderContent>
          <div>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <WalletsWrapper>
            <WalletInfo layer={Layers.L1} />
            <WalletInfo layer={Layers.L2} />
          </WalletsWrapper>
        </TopHeaderContent>
      </TopHeaderBackground>
    </TopHeaderWrapper>
  )
}

const TopHeaderWrapper = styled.div`
  height: 56px;
  width: 100%;
`

const TopHeaderBackground = styled.div`
  position: fixed;
  height: 56px;
  width: 100%;
  z-index: 10000;
`

const TopHeaderContent = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.secondaryBackground};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px;
  box-sizing: border-box;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
    content: ' ';
    display: block;
    height: 100%;
    width: calc(100% - 8px);
    z-index: -1;
    background: conic-gradient(
      from 86.31deg at 46.18% 51.15%,
      #97e1d4 -54.94deg,
      #6284ff 28.29deg,
      #ff72b6 157.82deg,
      #d9afd9 220.83deg,
      #97e1d4 305.06deg,
      #6284ff 388.29deg
    );
    filter: blur(10px);
  }

  & > div:first-child {
    max-height: 22px;
  }

  & > div:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`

const WalletsWrapper = styled.div`
  & > :first-child {
    margin-right: 20px;
  }
`
