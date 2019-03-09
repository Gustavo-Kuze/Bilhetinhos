import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshNotifications } from '../../../redux/actions/notificationsActions'
import { addMateIfExists } from '../../../api/mates'
import { getUserEmailByUid } from '../../../api/users'
import {
    getNotificationsRef, getUserNotifications, markAsRead, removeUserNotifications
} from '../../../api/notifications'

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
        let params = new URLSearchParams(window.location.search)
        if (params.has('mark')) {
            let alertReceivedDate = params.get('mark')
            await markAsRead(this.props.uid, alertReceivedDate)
        }
    }

    removeQueryAlerts = async () => {
        let params = new URLSearchParams(window.location.search)
        if (params.has('rem')) {
            let alertsReceivedDates = params.getAll('rem')
            await removeUserNotifications(this.props.uid, alertsReceivedDates)
        }
    }

    addQueryMate = async () => {
        let params = new URLSearchParams(window.location.search)
        if (params.has('addm')) {
            let queryMateUid = params.get('addm')
            let mateEmail = await getUserEmailByUid(queryMateUid)
            await addMateIfExists(this.props.uid, this.props.email, mateEmail, (msg) => {
                window.location.search = ''
            }).catch(err => {
                console.log(err.message)
            })
        }
    }

    componentDidMount = () => {
        this.startNotificationsListener(this.props.uid)
        this.markQueryAlertAsRead()
        this.removeQueryAlerts()
        this.addQueryMate()
    }

    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    uid: state.user.uid,
    email: state.user.email
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshNotifications
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsObserver)