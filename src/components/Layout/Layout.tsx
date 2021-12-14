import React, {FunctionComponent} from "react";
import styled from 'styled-components'
import {Outlet, Link} from "react-router-dom";

const Layout: FunctionComponent = () => {
    return (
        <main>
            <Header>
                <Link to="/">
                    home
                </Link>
            </Header>
            <Outlet />
        </main>
    )
}

export default Layout

const Header = styled.header`
  background-color: #fff;
`


