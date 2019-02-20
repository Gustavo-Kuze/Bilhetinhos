import React from 'react'

const MatePreview = props => {
    return (
        <li key={props.uid} className="media border p-3 border-muted my-3">
            <div className="media-body">
                <div className="row">
                    <div className="col-md-3 px-md-3 col-sm-12 ">
                        <img src={props.profilePic || "/img/default_user_profile.png"} className="mate-profile-pic" alt="Imagem de perfil do colega" />
                    </div>
                    <div className="col-md-9 px-md-3 col-sm-12">
                        <div className="row">
                            <div className="col-10">
                                <h5 className="mt-3 mb-1 text-md-center text-break">{props.name || props.email}</h5>
                                <p className="text-md-center text-break">
                                    {props.email || props.uid}
                                </p>
                            </div>
                            <div className="col-md-2">
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
            </div>
        </li>
    )
}

export default MatePreview
