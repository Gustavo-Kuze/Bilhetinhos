import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNotesRef } from '../../../../api/notes'
import { getUsersRef } from '../../../../api/users'
import {
    setIsLoaded, setIsLoading,
    refreshMateNoteboardNotes, refreshMateNoteboardUser
} from "../../../../redux/actions/mateNoteboardActions";

export class MateNoteboardObserver extends Component {
    startMateNoteboardListener = async (uid) => {
        getNotesRef().child(uid).on('value', async () => {
            this.props.setIsLoading()
            this.props.refreshMateNoteboardNotes(uid)
            this.props.setIsLoaded()
        })

        getUsersRef().child(uid).on('value', async () => {
            this.props.setIsLoading()
            this.props.refreshMateNoteboardUser(uid)
            this.props.setIsLoaded()
        })
    }

    componentDidMount = () => {
        let locationUrl = new URL(window.location)
        if (locationUrl.searchParams.has('noteboard')) {
            this.startMateNoteboardListener(locationUrl.searchParams.get('noteboard'))
        }
    }

    render = () => <Fragment />
}

// const mapStateToProps = state => ({
//     mateNoteboardUid: state.mateNoteboard.user.uid
// })

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsLoaded, setIsLoading, refreshMateNoteboardNotes, refreshMateNoteboardUser
}, dispatch)

export default connect(null, mapDispatchToProps)(MateNoteboardObserver)