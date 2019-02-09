import React from 'react'

export default function UserMenu() {
    return (
        <div id="popover-user-content">
            <ul className="list-group" >
                <a href="/user/profile" className="list-group-item">Perfil</a>
                <a href="#" className="list-group-item">Configurações</a>
            </ul>
            <a href="/user/signout" className="text-danger">Sair</a>
        </div>
    )
}
