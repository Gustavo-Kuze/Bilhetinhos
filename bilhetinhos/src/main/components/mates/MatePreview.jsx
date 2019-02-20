import React from 'react'

const MatePreview = props => {
    return (
        <li className="media border p-3 border-muted my-3">
            <div className="media-body">
                <div className="row">
                    <div className="col-3 px-3">
                        <img src={props.profilePic || "/img/default_user_profile.png"} className="mate-profile-pic" alt="Imagem de perfil do colega" />
                    </div>
                    <div className="col-7 px-3">
                        <h5 className="mt-3 mb-1 text-center">{props.name || props.email}</h5>
                        <p className="text-center">
                            {props.email || props.uid}
                        </p>
                    </div>
                    <div className="col-2 px-3">
                        <button className="btn btn-sm btn-danger mt-3"><i className="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default MatePreview
