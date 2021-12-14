import React, {FunctionComponent} from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Layout from '../components/Layout/Layout'
import Onboarding from './Onboarding/Onboarding';
import NoMatch from './NoMatch/NoMatch'

const Router: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Onboarding />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router
