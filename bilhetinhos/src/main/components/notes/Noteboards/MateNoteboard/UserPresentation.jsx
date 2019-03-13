import React, { Fragment } from 'react'

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
                                    <img src={`${props.profilePic || "/img/default_user_profile.png"}`} className="matenoteboard-profile-pic" alt="User profile picture" style={{ position: 'absolute', top: '-70px' }} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h5 className="mt-2">{props.name}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7 offset-sm-1 ml-sm-5 pl-sm-5 ml-lg-1 pl-lg-1 mt-5 py-5 py-sm-1">
                            <p className="text-dark pt-5 pt-sm-1">{window.translate({ text: "profile-bio-placeholder" })}</p>
                            <p className="text-muted">{props.bio}</p>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <p className="text-dark">{window.translate({ text: "userpresentation-contact-info-label" })}</p>
                            <p><span className="text-info">{window.translate({ text: "profile-phone-placeholder" })}</span>: <span>{props.phone}</span></p>
                            <p><span className="text-info">{window.translate({ text: "userpresentation-email-label" })}</span>: <span>{props.email}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UserPresentation
