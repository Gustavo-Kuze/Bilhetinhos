import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from '../components/home/Home'
import Noteboard from '../components/notes/Noteboard'
import Profile from '../components/user/Profile'
import Login from '../components/user/Login'
import SignUp from '../components/user/SignUp'
import SignOut from '../components/user/SignOut'
import ProtectedRoute from './ProtectedRoute'
import Mates from '../components/mates/Mates'

export default () =>
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/user/login' component={Login} />
            <Route exact path='/user/signup' component={SignUp} />
            <ProtectedRoute exact path='/user/signout' component={SignOut} />
            <ProtectedRoute exact path='/user/profile' component={Profile} />
            <ProtectedRoute exact path='/colegas' component={Mates} />
            <ProtectedRoute exact path='/quadro' component={Noteboard} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>
