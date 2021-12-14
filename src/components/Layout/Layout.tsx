import React, {FunctionComponent} from "react";
import styled from 'styled-components'
import {Outlet} from "react-router-dom";
import TopNavigation from "./TopNavigation";
import LeftNavigation from "./LeftNavigation";

const Layout: FunctionComponent = () => {
    return (
        <main>
            <TopNavigation />
            <BottomLayout>
                <LeftNavigation />
                <div>
                    <Outlet />
                </div>
            </BottomLayout>
        </main>
    )
}

export default Layout

const BottomLayout = styled.div`
  display: flex;

  & > div:last-child {
    width: 100%;
    background-color: #0A1017;
  }
`
