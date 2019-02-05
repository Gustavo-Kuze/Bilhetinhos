import React, { Component, Fragment } from 'react'

export default class Skeleton extends Component {
    render() {
        return (
            <Fragment>

                <nav className="navbar navbar-expand-md fixed-top bg-primary navbar-dark">
                    <a className="navbar-brand" href="/">NKDJHSJUEHS</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mx-3" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Criar bilhete <span className=""><i className="fas fa-plus"></i></span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Meu quadro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Colegas</a>
                            </li>
                        </ul>
                        {/* far fa-bell é o sino fechado, que deve ficar vibrando em caso de notificação ativa */}
                        <a tabIndex="0" className="nav-link btn btn-primary" href="#" role="button" data-toggle="popover" data-placement="bottom" data-trigger="focus" title="Notificações" ><i className="far fa-bell"></i></a>
                        <a tabIndex="0" className="nav-link btn btn-primary" href="#" role="button" data-toggle="popover" data-placement="bottom" data-trigger="focus" title="[NOME_USUARIO]" ><i className="fas fa-user-alt "></i></a>
                    </div>
                </nav>
                <div id="popover-content" style={{display: 'none'}}>
                    <ul className="list-group" >
                        <a href="#" target="_blank" className="list-group-item">Perfil</a>
                        <a href="#" target="_blank" className="list-group-item">Configurações</a>
                    </ul>
                    <a href="#" className="text-danger">Sair</a>
                </div>
            </Fragment>
        )
    }
}
