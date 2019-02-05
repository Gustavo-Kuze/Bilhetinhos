import React, { Component } from 'react'

export default class UserMenu extends Component {
    render() {
        return (
            <div id="popover-user-content" style={{ display: 'none' }}>
                <ul className="list-group" >
                    <a href="#" target="_blank" className="list-group-item">Perfil</a>
                    <a href="#" target="_blank" className="list-group-item">Configurações</a>
                </ul>
                <a href="#" className="text-danger">Sair</a>
            </div>
        )
    }
}
