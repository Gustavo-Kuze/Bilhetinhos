import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNotificationsRef, getUserNotifications, markAsRead, removeUserNotification } from '../../../../api/notifications'
import { refreshNotifications } from '../../../../redux/actions/notificationsActions'

class NotificationsObserver extends Component {

    startNotificationsListener = (uid) => {
        if (uid) {
            getNotificationsRef().child(uid).on('value', () => {
                getUserNotifications(uid).then(notifications => {
                    this.props.refreshNotifications(uid, notifications)
                })
            })
        }
    }

    markQueryAlertAsRead = async () => {
        if (window.location.search.includes('mark')) {
            let alertReceivedDate = window.location.search.replace('?mark=', '')
            await markAsRead(this.props.uid, alertReceivedDate)
        }
    }

    removeQueryAlert = async () => {
        if (window.location.search.includes('rem')) {
            let alertReceivedDate = window.location.search.replace('?rem=', '')
            await removeUserNotification(this.props.uid, alertReceivedDate)
        }
    }

    componentDidMount = () => {
        this.startNotificationsListener(this.props.uid)
        this.markQueryAlertAsRead()
        this.removeQueryAlert()
    }

    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    uid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshNotifications
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsObserver)