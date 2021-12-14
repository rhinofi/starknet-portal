import React, {FunctionComponent} from 'react'
import styled from 'styled-components'
import {ReactComponent as Logo} from '../../assets/icons/logo.svg'
import {Link} from 'react-router-dom'
import {Button} from "../common/interactive/Button";

const TopNavigation: FunctionComponent = () => {
    return (
        <TopHeaderWrapper>
            <TopHeaderBackground>
                <TopHeaderContent>
                    <div>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <div>
                        <Separator />
                        <Button>
                            Connect wallet
                        </Button>
                    </div>
                </TopHeaderContent>
            </TopHeaderBackground>
        </TopHeaderWrapper>
    )
}

export default TopNavigation

const TopHeaderWrapper = styled.div`
  height: 56px;
  width: 100%;
`

const TopHeaderBackground = styled.div`
  position: fixed;
  height: 56px;
  width: 100%;
  z-index: 1000;
`

const TopHeaderContent = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: ${({theme}) => theme.background};
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
    content: " ";
    display: block;
    height: 100%;
    width: calc(100% - 8px);
    z-index: -1;
    background: conic-gradient(from 86.31deg at 46.18% 51.15%, #97E1D4 -54.94deg, #6284FF 28.29deg, #FF72B6 157.82deg, #D9AFD9 220.83deg, #97E1D4 305.06deg, #6284FF 388.29deg);
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

const Separator = styled.div`
  width: 1px;
  height: 16px;
  margin: 0 14px;
  background-color: ${props => props.theme.neutral200};
`
