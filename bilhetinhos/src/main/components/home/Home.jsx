import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
export default class Home extends Component {
    render() {
        return (
            <Skeleton>
                <section id="home-banner" className="container-fluid text-center">
                    <h1>Início</h1>
                    <h2>Seja bem-vindo</h2>
                    <a href="/user/signup" className="btn btn-primary">Sign Up</a>
                    <a href="/user/login" className="btn btn-primary">Login</a>
                </section>
            </Skeleton>
        )
    }
}
