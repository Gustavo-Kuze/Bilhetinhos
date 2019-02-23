import React from 'react'

const NotificationButton = props => {
    return (
        <button onClick={props.onClick} className={`btn btn-link list-group-item list-group-item-action ${props.read ? '' : 'active'}`}>
            {props.children}
        </button>
    )
}

const NotificationLink = props => {
    const createMarkUrl = () => {
        let hrefUrl = new URL(`${window.location.protocol}${window.location.host}${props.href}`)
        let params = hrefUrl.searchParams
        params.append('mark', props.date)
        return hrefUrl.toString()
    }
    return (
        <a href={props.read ? props.href : `${createMarkUrl()}`} 
        className={`border border-dark list-group-item list-group-item-action ${props.read ? 'bg-light text-dark' : 'bg-primary text-light'}`}>
            {props.children}
        </a>
    )
}

export {NotificationButton, NotificationLink}
