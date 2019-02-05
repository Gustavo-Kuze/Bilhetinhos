import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'

export default class CreateNote extends Component {
    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <h1>Criar uma nota</h1>
                    <h2>Essa aqui é a página de criação de notas</h2>
                </section>
            </Skeleton>
        )
    }
}



