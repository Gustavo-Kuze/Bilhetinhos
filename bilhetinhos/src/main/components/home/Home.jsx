import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'

export default class Home extends Component {

    render() {
        return (
            <Skeleton>
                <section id="home-banner" className="container-fluid text-center">
                    <h1>Início</h1>
                    <h2>Seja bem-vindo</h2>
                </section>
            </Skeleton>
        )
    }
}
