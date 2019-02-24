import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshUserNotes, loadingUserNotes } from '../../redux/actions/notesActions'
import { getUserNotesRef } from '../../api/notes'

export class NotesObserver extends Component {

    startUserNotesListener = async uid => {
        getUserNotesRef(uid).on('value', async () => {
            this.props.loadingUserNotes()
            this.props.refreshUserNotes(uid)
        })
    }

    componentDidMount = () => {
        if (this.props.uid) {
            this.startUserNotesListener(this.props.uid)
        }
    }

    render = () => <Fragment />
}

const mapStateToProps = state => ({
    uid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshUserNotes, loadingUserNotes
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotesObserver)
