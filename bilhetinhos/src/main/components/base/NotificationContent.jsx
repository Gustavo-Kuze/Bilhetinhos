import React from 'react'

const NotificationContent = props => {
    return (
        <React.Fragment>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.title}</h5>
                <small>{props.receivedDate}</small>
            </div>
            <p className="mb-1">{props.description}</p>
            <small>{props.sender}</small>
        </React.Fragment>
    )
}

export default NotificationContent
