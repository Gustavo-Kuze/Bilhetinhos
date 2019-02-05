import React, { Component, Fragment } from 'react'
import Header from './Header';
import Main from './Main'
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
