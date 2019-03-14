import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserNotesRef, getNotesRef } from '../../api/notes'
import {
    refreshUserNotes, loadingUserNotes,
    refreshMatesNotes, loadingMatesNotes
} from '../../redux/actions/notesActions'
import {
    setIsLoaded, setIsLoading,
    refreshMateNoteboardNotes
} from "../../redux/actions/mateNoteboardActions";

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

    startMateNoteboardListener = async (uid) => {
        getNotesRef().child(uid).on('value', async () => {
            this.props.setIsLoading()
            this.props.refreshMateNoteboardNotes(uid)
            this.props.setIsLoaded()
        })
    }

    componentDidUpdate(props, state, snapshot) { }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.matesUids.length !== this.props.matesUids.length) {
            this.props.loadingMatesNotes()
            this.props.refreshMatesNotes(this.props.uid, this.props.matesUids)
        }
        return null
    }

    componentDidMount = () => {
        if (this.props.uid) {
            this.startUserNotesListener(this.props.uid)
        }
        if (this.props.uid && this.props.matesUids) {

            this.startMatesNotesListener(this.props.uid, this.props.matesUids)
        }
        if (this.props.mateNoteboardUid) {
            this.startMateNoteboardListener(this.props.mateNoteboardUid)
        }
    }

    render = () => <Fragment />
}

const mapStateToProps = state => ({
    uid: state.user.uid,
    matesUids: state.user.matesUids,
    mateNoteboardUid: state.mateNoteboard.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshUserNotes, loadingUserNotes, refreshMatesNotes, loadingMatesNotes,
    setIsLoaded, setIsLoading, refreshMateNoteboardNotes
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotesObserver)