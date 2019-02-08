import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from '../components/home/Home'
import CreateNote from '../components/note/CreateNote'
import UserNoteboard from '../components/noteboard/UserNoteboard'
import Profile from '../components/user/Profile'
import Login from '../components/user/Login'
import SignUp from '../components/user/SignUp'
import SignOut from '../components/user/SignOut'
import ProtectedRoute from './ProtectedRoute'

export default () =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/user/login' component={Login} />
            <Route exact path='/user/signup' component={SignUp} />
            <ProtectedRoute exact path='/user/signout' component={SignOut} />
            <ProtectedRoute exact path='/user/profile' component={Profile} />
            <ProtectedRoute exact path='/bilhetes/novo' component={CreateNote} />
            <ProtectedRoute exact path='/quadro' component={UserNoteboard} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>
