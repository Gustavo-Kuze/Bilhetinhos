import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'

export default class SignUp extends Component {

    signUp = (e) => {
        e.preventDefault()

        

        return false
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3">Você está a poucos clique de se juntar a nós!</h1>
                            <form className="mt-3" onSubmit={this.signUp}>
                                <div className="form-group">
                                    <label htmlFor="signup-email">E-mail</label>
                                    <input id="signup-email" className="form-control" type="email" name="email" placeholder="Digite seu melhor E-mail aqui" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-password">Senha</label>
                                    <input id="signup-password" className="form-control" type="password" name="password" placeholder="Escolha uma senha forte" required />
                                </div>
                                <button className="btn btn-primary">Criar</button>
                            </form>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}
