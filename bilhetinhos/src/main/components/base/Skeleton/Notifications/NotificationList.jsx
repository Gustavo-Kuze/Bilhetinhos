import React, { Component } from 'react'
import NotificationLink from './NotificationLink'
import NotificationContent from './NotificationContent'
import If from '../../../utils/If'

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
                    <If condition={this.state.notifications.length > 0}>
                        <div className="list-group">
                            {
                                this.state.notifications.map((n, i) => {
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
                                })
                            }
                        </div>
                    </If>
                    <If condition={this.state.notifications.length === 0}>
                        <p className="text-muted mt-5">Tudo atualizado por aqui!</p>
                    </If>
                </div>

            </div>
        )
    }
}

export default NotificationList