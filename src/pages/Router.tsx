import { FunctionComponent } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import BridgeFunds from './BridgeFunds/BridgeFunds'
import NoMatch from './NoMatch/NoMatch'
import Onboarding from './Onboarding/Onboarding'
import Portfolio from './Portfolio/Portfolio'

const Router: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Onboarding />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/bridge" element={<BridgeFunds />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
