import React from 'react'

const NotificationLink = props => {
    return (
        <a href={props.href} className={`list-group-item list-group-item-action ${props.read ? '' : 'active'}`}>
            {props.children}
        </a>
    )
}

export default NotificationLink
