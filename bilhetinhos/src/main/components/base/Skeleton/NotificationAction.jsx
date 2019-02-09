import React from 'react'

const NotificationButton = props => {
    return (
        <button onClick={props.onClick} className={`btn btn-link list-group-item list-group-item-action ${props.read ? '' : 'active'}`}>
            {props.children}
        </button>
    )
}

const NotificationLink = props => {
    return (
        <a href={props.href} className={`list-group-item list-group-item-action ${props.read ? '' : 'active'}`}>
            {props.children}
        </a>
    )
}

export {NotificationButton, NotificationLink}
