import React from 'react'
import { Translate } from 'react-translated'

export default function UserMenu() {
    return (
        <div id="popover-user-content" className="p-3">
            <ul className="list-group" >
                <a href="/user/profile" className="list-group-item list-group-item-action"><Translate text="user-menu-btn-profile" /></a>
            </ul>
            <hr/>
            <a href="/user/signout" className="text-primary"><Translate text="user-menu-signout" /></a>
        </div>
    )
}