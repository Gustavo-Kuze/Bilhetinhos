import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNotificationsRef, getUserNotifications } from '../../../../api/notifications'
import { refreshNotifications } from '../../../../redux/actions/notificationsActions'

class NotificationsReloader extends Component {

    startNotificationsListener = (uid) => {
        getNotificationsRef().child(uid).on('value', () => {
            getUserNotifications(uid).then(notifications => {
                this.props.refreshNotifications(notifications)
            })
        })
    }

    componentDidMount = () => {
        this.startNotificationsListener(this.props.uid)
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsReloader)