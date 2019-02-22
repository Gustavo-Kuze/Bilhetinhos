import './css/Main.css'
import React, { Component, Fragment } from 'react'
import Header from './Header';
import Footer from './Footer'
import NotificationsObserver from './Notifications/NotificationsObserver'
export default class Skeleton extends Component {

    render() {
        return (
            <Fragment>
                <NotificationsObserver />
                <Header />
                <main className="main-mt">
                    {this.props.children}
                </main>
                <Footer />
            </Fragment>
        )
    }
}
