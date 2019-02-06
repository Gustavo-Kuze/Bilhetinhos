import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'
import {getDinos} from '../../api/dinos'


export default class Home extends Component {

    componentDidMount() {
        getDinos()
    }

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
