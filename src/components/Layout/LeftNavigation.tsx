import React, {FunctionComponent} from 'react'
import {mainLinks} from './headerLinks'
import styled from 'styled-components'
import LinkItem from './LinkItem'
import starkNetLogo from '../../assets/icons/starknet.svg'

const MainHeader: FunctionComponent = () => {
    return (
        <Header>
            <HeaderContent>
                <div>
                    <img src={starkNetLogo} alt="StarkNet Logo" />
                    <HeaderSection>
                        {mainLinks.map((link) => (
                            <LinkItem
                                {...link}
                                key={link.tab}
                            />
                        ))}
                    </HeaderSection>
                </div>
            </HeaderContent>
        </Header>
    )
}

export default MainHeader

const Header = styled.div`
  min-width: 188px;
  height: calc(100vh - 56px);
`

const HeaderContent = styled.div`
  position: fixed;
  z-index: 1000;
  height: calc(100vh - 56px);
  border-right: 1px solid #15212F;
  background: #000000;
  backdrop-filter: blur(30px);
  padding-top: 20px;
  box-sizing: border-box;
  width: 188px;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .dvf-logo {
    width: 0;
    opacity: 0;
    animation: appear-in 0.3s linear forwards;
  }

  @keyframes appear-in {
    0% {
      opacity: 0;
      width: 0;
    }
    100% {
      opacity: 1;
      width: 82px;
    }
  }
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: 12px;
  padding-bottom: 12px;
  padding-top: 20px;
`
