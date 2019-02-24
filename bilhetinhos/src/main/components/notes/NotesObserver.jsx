import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    refreshUserNotes, loadingUserNotes,
    refreshMatesNotes, loadingMatesNotes
} from '../../redux/actions/notesActions'
import { getUserNotesRef, getNotesRef } from '../../api/notes'

export class NotesObserver extends Component {

    startUserNotesListener = async uid => {
        getUserNotesRef(uid).on('value', async () => {
            this.props.loadingUserNotes()
            this.props.refreshUserNotes(uid)
        })
    }

    startMatesNotesListener = async (uid, matesUids) => {
        matesUids.forEach(mUid => {
            getNotesRef().child(mUid).on('value', async () => {
                this.props.loadingMatesNotes()      
                this.props.refreshMatesNotes(uid, matesUids)
            })
        })
    }

    componentDidMount = () => {
        if (this.props.uid) {
            this.startUserNotesListener(this.props.uid)
        }
        if (this.props.uid && this.props.matesUids) {
            
            this.startMatesNotesListener(this.props.uid, this.props.matesUids)
        }
    }

    render = () => <Fragment />
}

const mapStateToProps = state => ({
    uid: state.user.uid,
    matesUids: state.user.matesUids
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshUserNotes, loadingUserNotes, refreshMatesNotes, loadingMatesNotes
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotesObserver)