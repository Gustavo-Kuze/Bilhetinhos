import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Skeleton from '../main/base/Skeleton'

export default props =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Skeleton} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>
