import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsersRef } from '../../api/users'
import { refreshMates, matesLoading } from '../../redux/actions/matesActions'
import { refreshMatesUids } from '../../redux/actions/userActions'


export class MatesObserver extends Component {

    startMatesListener = uid => {
        if (uid) {
            getUsersRef().child(uid).child('mates').on('value', () => {
                this.props.matesLoading()
                this.props.refreshMates(uid)
                this.props.refreshMatesUids(uid)
            })
        }
    }

    componentDidMount = () => {
        this.startMatesListener(this.props.uid)
    }

    render = () => <></>
}

const mapStateToProps = state => ({
    uid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshMates, matesLoading, refreshMatesUids
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MatesObserver)