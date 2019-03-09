import React, { Component } from 'react'
import NotificationLink from './NotificationLink'
import NotificationContent from './NotificationContent'
import If from '../../utils/If'
import { Translate } from 'react-translated'

class NotificationList extends Component {
    state = {
        notifications: []
    }

    componentDidMount = () => {
        this.setState({ ...this.state, notifications: this.props.alerts || [] })
    }

    getReversedNotifications = () => ([...this.state.notifications]).reverse()

    createDismissAllUrl = () => {
        let currentUrlWithoutSearch = window.location.href.replace(window.location.search, '')
        let tempUrl = new URL(currentUrlWithoutSearch)
        this.state.notifications.forEach(alert => {
            tempUrl.searchParams.append('rem', alert.receivedDate)
        })
        return tempUrl.toString()
    }

    render() {
        return (
            <div id="popover-notification-content" >
                <div>
                    <If condition={this.state.notifications.length > 0}>
                        <div className="container">
                            <div className="row">
                                <div className="col-2 offset-9 offset-sm-10">
                                    <a className="btn btn-link text-primary mb-2"
                                        href={this.createDismissAllUrl()} title={window.translate({ text: "notifications-clear-all" })}
                                        data-toggle="tooltip" data-placement="top"
                                    >
                                        <i className="fas fa-times-circle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="list-group">
                            {
                                this.getReversedNotifications().map((n, i) => {
                                    const translatedTitle = window.translate({ text: n.title })
                                    const translatedDescription = window.translate({ text: n.description, data: { userEmail: n.sender } })
                                    return (
                                        <NotificationLink
                                            key={`${translatedTitle}[${i}]`}
                                            href={n.href}
                                            read={n.read}
                                            date={n.receivedDate}>
                                            <NotificationContent
                                                title={translatedTitle}
                                                receivedDate={n.receivedDate}
                                                description={translatedDescription}
                                                sender={n.sender} />
                                        </NotificationLink>
                                    )
                                })
                            }
                        </div>
                    </If>
                    <If condition={this.state.notifications.length === 0}>
                        <p className="text-muted mt-5"><Translate text="notifications-default-label" /></p>
                    </If>
                </div>

            </div>
        )
    }
}

export default NotificationList