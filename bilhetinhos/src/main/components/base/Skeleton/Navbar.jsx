import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PopoverButton from '../PopoverButton'
import UserMenu from './UserMenu'
import NotificationList from './NotificationList'
import { refreshNotifications } from '../../../redux/actions/notificationsActions'

const Navbar = props => {

    return (
        <nav className="navbar navbar-expand-md fixed-top bg-primary navbar-dark">
            <a className="navbar-brand" href="/">Bilhetes</a>
            <PopoverButton
                // fas fa-bell é o sino fechado
                /*
                    Criar uma função anyUnreadNotifications
                    no notifications.js para pegar se existe alguma 
                    notificação não lida, caso sim, o ícone abaixo fica com o 
                    sino fechado, senão sino aberto

                    
                */
                iconClassName="far fa-bell" popoverTitle={"Notificações"}
                buttonContent={
                    <span className="badge badge-primary badge-pill">
                        {props.alerts ? props.alerts.length : ''}
                    </span>
                }
                extraStyle={{ height: "300px", overflow: "auto" }}>
                <NotificationList
                    alerts={props.alerts}
                />
            </PopoverButton>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mx-3" id="navbarCollapse">
                <ul className="navbar-nav mr-auto text-center">
                    <li className="nav-itema">
                        <a className="nav-link btn btn-lg btn-primary" href="/quadro?novo=bilhete">Criar bilhete <span className=""><i className="fas fa-plus"></i></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link btn btn-lg btn-primary" href="/quadro">Meu quadro</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link btn btn-lg btn-primary" href="/colegas">Colegas</a>
                    </li>
                </ul>
                <PopoverButton
                    iconClassName="fas fa-user-alt" popoverTitle={props.email || "Menu do Usuário"}
                    imgSrc={props.profilePictureSrc}
                >
                    <UserMenu />
                </PopoverButton>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    displayName: state.user.displayName,
    email: state.user.email,
    uid: state.user.uid,
    accessToken: state.user.accessToken,
    providerData: state.user.providerData,
    profilePictureSrc: state.cached.profilePictureDownloadUrl,
    alerts: state.notifications.alerts
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshNotifications
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
