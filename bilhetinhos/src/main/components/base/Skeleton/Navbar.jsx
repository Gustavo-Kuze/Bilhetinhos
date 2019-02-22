import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PopoverButton from '../PopoverButton'
import UserMenu from './UserMenu'
import NotificationList from './Notifications/NotificationList'
import { refreshNotifications } from '../../../redux/actions/notificationsActions'
import { getUnreadNotifications } from '../../../api/notifications'

class Navbar extends React.Component {
   
    render() {
        return (
            <nav className="navbar navbar-expand-md fixed-top bg-primary navbar-dark">
                <a className="navbar-brand" href="/">Bilhetes</a>
                <PopoverButton
                    iconClassName={`${this.props.anyUnreadAlerts ? 'fas' : 'far'} fa-bell`}popoverTitle={"Notificações"}
                    buttonContent={
                        <span className="badge badge-primary badge-pill">
                            {this.props.unreadAlertsCount}
                        </span>
                    }
                    extraStyle={{ height: "300px", overflow: "auto" }}>
                    <NotificationList
                        alerts={this.props.alerts}
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
                        iconClassName="fas fa-user-alt" popoverTitle={this.props.email || "Menu do Usuário"}
                        imgSrc={this.props.profilePictureSrc}
                    >
                        <UserMenu />
                    </PopoverButton>
                </div>
            </nav>
        )
    }

}

const mapStateToProps = state => ({
    displayName: state.user.displayName,
    email: state.user.email,
    uid: state.user.uid,
    accessToken: state.user.accessToken,
    providerData: state.user.providerData,
    profilePictureSrc: state.cached.profilePictureDownloadUrl,
    alerts: state.notifications.alerts,
    anyUnreadAlerts: state.notifications.anyUnreadAlerts,
    unreadAlertsCount: state.notifications.unreadAlertsCount
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshNotifications
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
