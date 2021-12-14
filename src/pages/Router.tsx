import React, {FunctionComponent} from "react";
import {ThemeProvider} from "styled-components";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Layout from '../components/Layout/Layout'
import Onboarding from './Onboarding/Onboarding';
import NoMatch from './NoMatch/NoMatch'
import theme from '../theme'

const Router: FunctionComponent = () => {
    return (
        <ThemeProvider theme={theme['dark']}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Onboarding />} />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default Router
