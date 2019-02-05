import React, { Component } from 'react'
import Navbar from './Navbar'
import NotificationList from './NotificationList'
import UserMenu from './UserMenu'

export default class Header extends Component {
    render() {
        return (
            <header>
                <Navbar />
                <NotificationList />
                <UserMenu />
            </header>
        )
    }
}
