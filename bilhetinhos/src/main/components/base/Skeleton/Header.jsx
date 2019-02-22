import React, { Component } from 'react'
import Navbar from './Navbar'
import NotificationsReloader from './Notifications/NotificationsReloader'
export default class Header extends Component {
    render() {
        return (
            <header>
                <NotificationsReloader />
                <Navbar />
            </header>
        )
    }
}
