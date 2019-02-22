import React, { Component } from 'react'
import { NotificationButton, NotificationLink } from './NotificationAction'
import NotificationContent from './NotificationContent'

class NotificationList extends Component {
    state = {
        notifications: []
    }

    componentDidMount = () => {
        this.setState({ ...this.state, notifications: this.props.alerts || [] })
    }

    render() {
        return (
            <div id="popover-notification-content" >
                <div >
                    <div className="list-group">
                        {this.state.notifications.map((n, i) => {
                            if (n.href) {
                                return (
                                    <NotificationLink
                                        key={`${n.title}[${i}]`}
                                        href={n.href}
                                        read={n.read}
                                        date={n.receivedDate}>
                                        <NotificationContent
                                            title={n.title}
                                            receivedDate={n.receivedDate}
                                            description={n.description}
                                            sender={n.sender} />
                                    </NotificationLink>
                                )
                            } else {
                                return (
                                    <NotificationButton
                                        key={n.title}
                                        onClick={n.onClick}
                                        read={n.read} >

                                        <NotificationContent
                                            title={n.title}
                                            receivedDate={n.receivedDate}
                                            description={n.description}
                                            sender={n.sender} />
                                    </NotificationButton>
                                )
                            }
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default NotificationList