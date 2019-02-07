import './css/Main.css'
import React, { Component, Fragment } from 'react'
import Header from './Header';
import Footer from './Footer'

export default class Skeleton extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <main className="main-mt">
                    {this.props.children}
                </main>
                <Footer />
            </Fragment>
        )
    }
}
