import React from 'react'
import { connect } from 'react-redux'
import PopoverButton from '../PopoverButton'
import UserMenu from './UserMenu'
import NotificationList from './notifications/NotificationList'
import LanguageSelector from './LanguageSelector'
import { Translate, Translator } from 'react-translated'

class Navbar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-md fixed-top bg-primary navbar-dark">
                <a className="navbar-brand" href="/">Bilhetinhos</a>
                <Translator>
                    {
                        ({ translate }) => (
                            <PopoverButton
                                iconClassName={`${this.props.anyUnreadAlerts ? 'fas' : 'far'} fa-bell`} popoverTitle={translate({ text: 'navbar-notifications-default-label' })}
                                buttonContent={
                                    <span className="badge badge-primary badge-pill">
                                        {this.props.unreadAlertsCount}
                                    </span>
                                }
                                extraStyle={{ height: "300px", overflow: "auto" }}>
                                <NotificationList alerts={this.props.alerts} />
                            </PopoverButton>
                        )
                    }
                </Translator>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mx-3" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto text-center">
                        <li className="nav-item">
                            <a className="nav-link btn btn-lg btn-primary" href="/quadro"><Translate text="navbar-btn-noteboard" /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn btn-lg btn-primary" href="/colegas"><Translate text="navbar-btn-mates" /></a>
                        </li>
                        <li>
                            <LanguageSelector />
                        </li>
                    </ul>
                    <Translator>
                        {
                            ({ translate }) => (
                                <PopoverButton
                                    iconClassName="fas fa-user-alt" popoverTitle={this.props.email || translate({ text: 'navbar-usermenu-default-label' })}
                                    imgSrc={this.props.profilePictureSrc}>
                                    <UserMenu />
                                </PopoverButton>
                            )
                        }
                    </Translator>
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

export default connect(mapStateToProps)(Navbar)
