import React, { Component } from 'react'
import NotificationLink from './NotificationLink'
import NotificationContent from './NotificationContent'
import If from '../../../utils/If'
import {Translate} from 'react-translated'

class NotificationList extends Component {
    state = {
        notifications: []
    }

    componentDidMount = () => {
        this.setState({ ...this.state, notifications: this.props.alerts || [] })
    }

    getReversedNotifications = () => ([...this.state.notifications]).reverse()

    render() {
        return (
            <div id="popover-notification-content" >
                <div >
                    <If condition={this.state.notifications.length > 0}>
                        <div className="list-group">
                            {
                                this.getReversedNotifications().map((n, i) => {
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
                        <p className="text-muted mt-5"><Translate text="notifications-default-label"/></p>
                    </If>
                </div>

            </div>
        )
    }
}

export default NotificationList