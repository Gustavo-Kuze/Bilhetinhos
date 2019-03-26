import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshNotifications } from '../../../redux/actions/notificationsActions'
import { addMateIfExists } from '../../../api/mates'
import { getUserEmailByUid } from '../../../api/users'
import ReduxToastr, { toastr } from 'react-redux-toastr'
import {
    getNotificationsRef, getUserNotifications, markAsRead, removeUserNotifications, sendUserNotification
} from '../../../api/notifications'
import firebase from '../../../api/firebase'

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

    startMaintenanceWarningListener = () => {
        firebase.database().ref().child('maintenance').on('value', snapshot => {
            if (snapshot.val() === true)
                toastr.message(window.translate({ text: 'toastr-maintenance-title' }), window.translate({ text: 'toastr-maintenance-message' }))
        })
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
            await addMateIfExists(this.props.uid, this.props.email, mateEmail, async (msg) => {
                await sendUserNotification(queryMateUid, {
                    title: 'mates-accept-invitation-title',
                    receivedDate: Date.now(),
                    description: 'mates-accept-invitation-description',
                    sender: `${this.props.email}`,
                    read: false,
                    href: `/mates`
                })
            }).catch(err => {
                console.log(err.message)
            })
        }
    }

    componentDidMount = () => {
        this.startNotificationsListener(this.props.uid)
        this.startMaintenanceWarningListener()
        this.markQueryAlertAsRead()
        this.removeQueryAlerts()
        this.addQueryMate()
    }

    render() {
        return <>
            <ReduxToastr
                newestOnTop={false}
                preventDuplicates
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut" />
        </>
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