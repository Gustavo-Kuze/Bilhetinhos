import React from 'react'

export default function UserMenu() {
    return (
        <div id="popover-user-content" style={{ display: 'none' }}>
            <ul className="list-group" >
                <a href="#" target="_blank" className="list-group-item">Perfil</a>
                <a href="#" target="_blank" className="list-group-item">Configurações</a>
            </ul>
            <a href="/user/signout" className="text-danger">Sair</a>
        </div>
    )
}
