import React from 'react'

const NotificationContent = props => {
    return (
        <div>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.title}</h5>
                <small>{new Date(props.receivedDate).toLocaleString("pt-br")}</small>
            </div>
            <p className="mb-1">{props.description}</p>
            <small>{props.sender}</small>
        </div>
    )
}

export default NotificationContent
