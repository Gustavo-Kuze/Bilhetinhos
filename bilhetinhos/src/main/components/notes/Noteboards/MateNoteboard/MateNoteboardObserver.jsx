import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNotesRef } from '../../../../api/notes'
import { getUsersRef, getUserByUid } from '../../../../api/users'
import { areMates } from '../../../../api/mates'
import {
    setIsLoading,
    refreshMateNoteboardNotes, refreshMateNoteboardUser,
    setMateNoteboardNotes, setMateNoteboardUser
} from "../../../../redux/actions/mateNoteboardActions";

export class MateNoteboardObserver extends Component {
    startMateNoteboardListener = async (uid, mateUids) => {
        getNotesRef().child(uid).on('value', async () => {
            this.props.setIsLoading()
            this.props.refreshMateNoteboardNotes(uid, mateUids)
        })

        getUsersRef().child(uid).on('value', async () => {
            this.props.setIsLoading()
            this.props.refreshMateNoteboardUser(uid)
        })
    }

    componentDidMount = async () => {
        let locationUrl = new URL(window.location)
        if (locationUrl.searchParams.has('uid')) {
            let queryUid = locationUrl.searchParams.get('uid')
            let mateUser = await getUserByUid(queryUid)
            this.startMateNoteboardListener(queryUid, mateUser.mates)
            if (queryUid !== this.props.uid) {
                let mateHasUser = await areMates(this.props.uid, queryUid)
                let userHasMate = await areMates(queryUid, this.props.uid)
                this.props.sendFriendshipInfoToParent({
                    pendingInvite: (userHasMate && !mateHasUser),
                    areMates: (mateHasUser && userHasMate)
                })
            } else {
                this.props.sendFriendshipInfoToParent({
                    pendingInvite: false,
                    areMates: true
                })
            }
        }

        window.onbeforeunload = () => {
            this.props.setMateNoteboardUser({
                email: '',
                uid: '',
                name: '',
                profilePic: '',
                coverPic: '',
                bio: '',
                phone: '',
                matesUids: []
            })
            this.props.setMateNoteboardNotes([])
            this.props.setIsLoading()
        }
    }

    render = () => <></>
}

const mapStateToProps = state => ({
    uid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsLoading, refreshMateNoteboardNotes,
    refreshMateNoteboardUser, setMateNoteboardNotes, setMateNoteboardUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MateNoteboardObserver)