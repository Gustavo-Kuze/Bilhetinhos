import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNotesRef } from '../../../../api/notes'
import { getUsersRef } from '../../../../api/users'
import { areMates } from '../../../../api/mates'
import {
    setIsLoaded, setIsLoading,
    refreshMateNoteboardNotes, refreshMateNoteboardUser
} from "../../../../redux/actions/mateNoteboardActions";

export class MateNoteboardObserver extends Component {
    startMateNoteboardListener = async (uid) => {
        getNotesRef().child(uid).on('value', async () => {
            this.props.setIsLoading()
            this.props.refreshMateNoteboardNotes(uid)
        })

        getUsersRef().child(uid).on('value', async () => {
            this.props.setIsLoading()
            this.props.refreshMateNoteboardUser(uid)
        })
    }

    componentDidMount = async () => {
        let locationUrl = new URL(window.location)
        if (locationUrl.searchParams.has('uid')) {
            let mateUid = locationUrl.searchParams.get('uid')
            this.startMateNoteboardListener(mateUid)
            let mateHasUser = await areMates(this.props.currentUserUid, mateUid)
            let userHasMate = await areMates(mateUid, this.props.currentUserUid)
            this.props.sendFriendshipInfoToParent({
                pendingInvite: (userHasMate && !mateHasUser),
                areMates: (mateHasUser && userHasMate)
            })
        }
    }

    render = () => <Fragment />
}

const mapStateToProps = state => ({
    currentUserUid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsLoaded, setIsLoading, refreshMateNoteboardNotes, refreshMateNoteboardUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MateNoteboardObserver)