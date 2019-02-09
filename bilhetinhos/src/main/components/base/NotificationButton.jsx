import React from 'react'

const NotificationButton = props => {
    return (
        <button onClick={props.onClick} className={`btn btn-link list-group-item list-group-item-action ${props.read ? '' : 'active'}`}>
            {props.children}
        </button>
    )
}

export default NotificationButton
