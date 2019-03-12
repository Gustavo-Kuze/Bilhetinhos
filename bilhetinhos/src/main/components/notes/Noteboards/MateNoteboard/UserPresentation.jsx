import React from 'react'

const UserPresentation = () => {
    return (
        <div className="row my-5">
            <div className="col-10 offset-1 bg-light p-3">
                <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <div className="col">
                                <img src="/img/default_user_profile.png" className="matenoteboard-profile-pic" alt="User profile picture" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5 className="mt-2 mx-auto">Fulano da Silva</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-7 offset-1">
                        <p className="text-dark">Biografia</p>
                        <p className="text-muted">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga nobis maxime debitis dolore beatae doloribus maiores excepturi soluta omnis, voluptate minus animi neque perferendis! Deserunt consequatur quam minima ipsa consequuntur?</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="text-dark">Informações de contato</p>
                        <p><span className="text-info">Telefone</span>: <span>992983897</span></p>
                        <p><span className="text-info">E-mail</span>: <span>fulano@gmail.com</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPresentation
