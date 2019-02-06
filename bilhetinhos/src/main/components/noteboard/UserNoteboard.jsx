import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'

export default class UserNoteboard extends Component {
    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-10 offset-1">
                            <h1>Meu quadro</h1>  
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}



