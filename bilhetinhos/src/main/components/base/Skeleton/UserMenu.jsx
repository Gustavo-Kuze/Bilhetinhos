import React from 'react'
import {Translate}from 'react-translated'

export default function UserMenu() {
    return (
        <div id="popover-user-content">
            <ul className="list-group" >
                <a href="/user/profile" className="list-group-item"><Translate text="user-menu-btn-profile"/></a>
                {/* <a href="/user/config" className="list-group-item">Configurações</a> */}
            </ul>
            <a href="/user/signout" className="text-danger"><Translate text="user-menu-signout"/></a>
        </div>
    )
}
