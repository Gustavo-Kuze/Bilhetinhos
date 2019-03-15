import React, { Fragment } from 'react'
import If from '../../../utils/If'

const UserPresentation = props => {
    return (
        <Fragment>
            <div className="row" >
                <div className="col bg-secondary" style={{
                    height: '300px',
                    // background: 'url(https://images.pexels.com/photos/68147/waterfall-thac-dray-nur-buon-me-thuot-daklak-68147.jpeg?cs=srgb&dl=hd-wallpaper-landscape-long-exposure-68147.jpg&fm=jpg)'
                }}></div>
            </div>
            <div className="row py-3" >
                <div className="col-10 offset-1 p-3">
                    <div className="row">
                        <div className="col col-sm-3">
                            <div className="row">
                                <div className="col">
                                    <img src={`${props.profilePic || "/img/default_user_profile.png"}`} className="matenoteboard-profile-pic bg-light border border-secondary" alt="User profile picture" style={{ position: 'absolute', top: '-70px', width: '180px', height: '180px' }} />
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col mt-5">
                                    <h5 className="mt-5">{props.name}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7 offset-sm-1 ml-sm-5 pl-sm-5 ml-lg-1 pl-lg-1 mt-5">
                            <If condition={props.email && !props.isLoggedUser && !props.areMates}>
                                <If condition={props.pendingInvite}>
                                    <span className="badge badge-info mb-5">{window.translate({ text: 'mates-pending-invite' })}</span>
                                </If>
                                <If condition={!props.pendingInvite}>
                                    <button className="btn btn-success mb-5" onClick={props.callAddMateIfExists}>{window.translate({ text: "mates-add-mate" })}</button>
                                </If>
                            </If>
                            <p className="text-dark ">{window.translate({ text: "profile-bio-placeholder" })}</p>
                            <p className="text-muted">{props.bio}</p>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <p className="text-dark">{window.translate({ text: "userpresentation-contact-info-label" })}</p>
                            <If condition={props.phone}>
                                <p><span className="text-info">{window.translate({ text: "profile-phone-placeholder" })}</span>: <span>{props.phone}</span></p>
                            </If>
                            <If condition={props.email}>
                                <p><span className="text-info">{window.translate({ text: "userpresentation-email-label" })}</span>: <span>{props.email}</span></p>
                            </If>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UserPresentation
