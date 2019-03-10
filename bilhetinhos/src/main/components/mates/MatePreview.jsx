import React from 'react'
import If from '../utils/If'

const MatePreview = props => {
    return (
        <li key={props.uid} className="media border p-3 border-muted my-3">
            <div className="media-body">
                <div className="row">
                    <div className="col-md-3 px-md-3 col-12 d-flex flex-column flex-md-row justify-content-center align-items-center">
                        <img src={props.profilePic || "/img/default_user_profile.png"} className="mate-profile-pic" alt="Imagem de perfil do colega" />
                    </div>
                    <div className="col-md-9 px-md-3 col-12 d-flex d-md-inline-block flex-column flex-md-row justify-content-center align-items-center">
                        <div className="row">
                            <div className="col-12 col-md-9 d-flex d-md-inline-block flex-column flex-md-row justify-content-center align-items-center">
                                <h5 className="mt-3 mb-1 text-center text-break">{props.name || props.email}</h5>
                                <p className="text-center text-break">
                                    {props.email || props.uid}
                                </p>
                            </div>
                            <div className="col-md-3  d-flex flex-column flex-md-row justify-content-center align-items-center">
                                <button className="btn btn-sm btn-danger mt-3" data-toggle="modal" data-target="#remove-mate-modal"
                                    onClick={() => {
                                        props.setMateOnState({
                                            name: props.name,
                                            email: props.email,
                                            uid: props.uid
                                        })
                                    }}><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 px-md-3 col-12 d-flex flex-column flex-md-row justify-content-center align-items-center">
                        <If condition={props.pendingInvite}>
                            <span className="badge badge-info mt-3">{window.translate({text: 'mates-pending-invite'})}</span>
                        </If>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default MatePreview