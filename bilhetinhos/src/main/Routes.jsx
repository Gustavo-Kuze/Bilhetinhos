import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from './home/Home'
import CreateNote from './note/CreateNote'

export default props =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/bilhetes/novo' component={CreateNote} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>
