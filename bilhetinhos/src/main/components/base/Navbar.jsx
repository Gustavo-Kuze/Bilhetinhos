import React from 'react'
import {connect} from 'react-redux'


const Navbar = props => {
    
    return (
        <nav className="navbar navbar-expand-md fixed-top bg-primary navbar-dark">
            <a className="navbar-brand" href="/">NKDJHSJUEHS</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mx-3" id="navbarCollapse">
                <ul className="navbar-nav mr-auto text-center">
                    <li className="nav-itema">
                        <a className="nav-link btn btn-lg btn-primary" href="/bilhetes/novo">Criar bilhete <span className=""><i className="fas fa-plus"></i></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link btn btn-lg btn-primary" href="/quadro">Meu quadro</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link btn btn-lg btn-primary" href="/colegas">Colegas</a>
                    </li>
                </ul>
                {/* far fa-bell é o sino fechado, que deve ficar vibrando em caso de notificação ativa */}
                <a id="popover-notification" tabIndex="0" className="nav-link btn btn-lg btn-primary" href="javascript:;" role="button" data-toggle="popover" data-placement="left" data-trigger="focus" title="Notificações" ><i className="far fa-bell"><span className="badge badge-primary badge-pill">2</span></i></a>
                <a id="popover-user" tabIndex="0" className="nav-link btn btn-lg btn-primary" href="javascript:;" role="button" data-toggle="popover" data-placement="bottom" data-trigger="focus" title={props.email} ><i className="fas fa-user-alt "></i></a>
            </div>
        </nav>
    )
}


const mapStateToProps = state => ({
    displayName: state.login.displayName,
    email: state.login.email,
    uid: state.login.uid,
    accessToken: state.login.accessToken,
    providerData: state.login.providerData
})

export default connect(mapStateToProps)(Navbar)
