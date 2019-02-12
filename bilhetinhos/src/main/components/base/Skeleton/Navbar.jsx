import React from 'react'
import { connect } from 'react-redux'
import PopoverButton from '../PopoverButton'
import UserMenu from './UserMenu'
import NotificationList from './NotificationList'

const Navbar = props => {

    return (
        <nav className="navbar navbar-expand-md fixed-top bg-primary navbar-dark">
            <a className="navbar-brand" href="/">NKDJHSJUEHS</a>
            <PopoverButton
                iconClassName="far fa-bell" popoverTitle={"Notificações"}
                buttonContent={<span className="badge badge-primary badge-pill">2</span>} 
                extraStyle={{height: "300px", overflow: "auto"}}>
                <NotificationList />
            </PopoverButton>
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
                {/* <a id="popover-notification" tabIndex="0" className="nav-link btn btn-lg btn-primary" href="javascript:;" role="button" data-toggle="popover" data-placement="left" data-trigger="focus" title="Notificações" ><i className="far fa-bell"><span className="badge badge-primary badge-pill">2</span></i></a> */}
                {/* <a id="popover-user" tabIndex="0" className="nav-link btn btn-lg btn-primary" href="javascript:;" role="button" data-toggle="popover" data-placement="bottom" data-trigger="focus" title={props.email} ><i className="fas fa-user-alt "></i></a> */}

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
    profilePictureSrc: state.user.profilePic
})

export default connect(mapStateToProps)(Navbar)
