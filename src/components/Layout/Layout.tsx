import React, { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import LeftNavigation from './LeftNavigation'
import TopNavigation from './TopNavigation'

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
    background-color: #0a1017;
  }
`
