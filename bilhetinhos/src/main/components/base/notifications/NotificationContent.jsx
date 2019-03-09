import React from 'react'

const NotificationContent = props => {

    const createDismissUrl = () => {
        let currentUrlWithoutSearch = window.location.href.replace(window.location.search, '')
        return `${currentUrlWithoutSearch}?rem=${props.receivedDate}`
    }

    return (
        <div>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.title}</h5>
                <small>{new Date(props.receivedDate).toLocaleString("pt-br")}</small>
            </div>
            <p className="mb-1">{props.description}</p>
            <div className="d-flex justify-content-between">
                <small>{props.sender}</small>
                <object>
                    <a href={`${createDismissUrl()}`}><i className="fas fa-trash"></i></a>
                </object>
            </div>

        </div>
    )
}

export default NotificationContent