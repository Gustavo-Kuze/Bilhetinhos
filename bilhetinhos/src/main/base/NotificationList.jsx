import React, { Component } from 'react'

export default class NotificationList extends Component {
    render() {
        return (
            <div id="popover-notification-content" style={{ display: 'none' }}>
                <ul className="list-group" >
                    <a href="#" target="_blank" className="list-group-item">Notificação 1</a>
                    <a href="#" target="_blank" className="list-group-item">Notificação 2</a>
                </ul>
            </div>
        )
    }
}
