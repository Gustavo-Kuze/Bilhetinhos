import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshNotifications } from '../../../../redux/actions/notificationsActions'
import {
    getNotificationsRef, getUserNotifications, markAsRead, removeUserNotification
}
    from '../../../../api/notifications'
import { addMateIfExists } from '../../../../api/mates'
import { getUserEmailByUid } from '../../../../api/users'

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

    removeQueryAlert = async () => {
        let params = new URLSearchParams(window.location.search)
        if (params.has('rem')) {
            let alertReceivedDate = params.get('rem')
            await removeUserNotification(this.props.uid, alertReceivedDate)
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
        this.removeQueryAlert()
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