import './css/Main.css'
import React, { Component, Fragment } from 'react'
import Header from './Header';
import Footer from './Footer'
import NotificationsObserver from './notifications/NotificationsObserver'
import MatesObserver from '../../mates/MatesObserver'
import NotesObserver from '../../notes/NotesObserver'
import FloatingActionButton from '../../utils/FAB/FloatingActionButton'
import {Translate} from 'react-translated'
export default class Skeleton extends Component {

    render() {
        return (
            <Fragment>
                <NotificationsObserver />
                <MatesObserver />
                <NotesObserver />
                <Header />
                <main className="main-mt">
                <p><Translate text="Hi, World!"/></p>
                    {this.props.children}
                </main>
                <FloatingActionButton />
                <Footer />
            </Fragment>
        )
    }
}
