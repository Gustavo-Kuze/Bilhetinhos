import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'
import Popover from '../base/PopoverButton'

export default class Home extends Component {
    render() {
        return (
            <Skeleton>
                <section id="home-banner" className="container-fluid text-center">
                    <h1>Início</h1>
                    <h2>Seja bem-vindo</h2>
                    <a href="/user/signup" className="btn btn-primary">Sign Up</a>
                    <a href="/user/login" className="btn btn-primary">Login</a>
                    <Popover iconClassName="fas fa-user-alt" popoverTitle={"Ta funcionando"}>
                        <div><p>Isso aqui é um teste</p></div>
                    </Popover>
                </section>
            </Skeleton>
        )
    }
}
