import './css/MateNoteboard.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../../../base/Skeleton/Skeleton'
import { setIsLoaded, setIsLoading, refreshMateNoteboardNotes, refreshMateNoteboardUser } from '../../../../redux/actions/mateNoteboardActions'
import NoteboardContainer from '../Noteboard/NoteboardContainer'
import NoteboardSection from '../Noteboard/NoteboardSection'
import MateNoteboardObserver from './MateNoteboardObserver'
import UserPresentation from './UserPresentation'
import If from '../../../utils/If'
import Spinner from '../../../utils/Spinner'
import { addMateIfExists, areMates } from '../../../../api/mates'
import { getUserBoardPrivacy } from '../../../../api/users'
import { refreshMatesUids } from '../../../../redux/actions/userActions'
import { sendUserNotification } from '../../../../api/notifications'
import ReduxToastr, { toastr } from 'react-redux-toastr'

export class MateNoteboard extends Component {

    state = {
        pendingInvite: false,
        areMates: false,
        isUserAllowedByPrivacy: true,
        boardPrivacy: '',
        isLoading: true
    }

    notifyAddedMate = async () => {
        let mateUid = new URL(window.location).searchParams.get('uid')
        if (mateUid) {
            await sendUserNotification(mateUid, {
                title: 'mates-alert-title',
                receivedDate: Date.now(),
                description: 'mates-alert-description',
                sender: `${this.props.currentUserEmail}`,
                read: false,
                href: `/mates?addm=${this.props.currentUserUid}`
            })
            toastr.success(window.translate({ text: "toastr-success-title" }), window.translate({ text: "toastr-notification-sent" }))
            window.location.reload()
        }
    }

    callAddMateIfExists = async () => {
        try {
            let mates = await addMateIfExists(this.props.currentUserUid, this.props.currentUserEmail, this.props.user.email, (msg) => {
                toastr.success(window.translate({ text: "toastr-success-title" }), msg)
            })
            this.props.refreshMatesUids(this.props.currentUserUid)
            this.notifyAddedMate()
        } catch (err) {
            toastr.error(window.translate({ text: "toastr-error-title" }), err.message)
        }
    }

    friendshiptInfoFromObserver = (friendshipInfo) => {
        const { pendingInvite, areMates } = friendshipInfo
        this.setState({ ...this.state, pendingInvite, areMates })
    }

    callGetUserBoardPrivacy = async () => {
        let boardPrivacy = await getUserBoardPrivacy(new URL(window.location).searchParams.get('uid'))
        this.setState({ ...this.state, boardPrivacy })
    }

    componentDidMount = async () => {
        let url = new URL(window.location)
        if (url.searchParams.has('uid')) {
            await this.callGetUserBoardPrivacy()
            let isUserAllowedByPrivacy = await this.checkIfUserIsAllowedByPrivacy()
            this.setState({ ...this.state, isUserAllowedByPrivacy, isLoading: false })
        } else {
            window.location.pathname = 'mates'
        }
    }

    checkIfUserIsAllowedByPrivacy = async () => {
        let uid = this.props.currentUserUid
        let urlUid = new URL(window.location).searchParams.get('uid')
        if (this.state.boardPrivacy && uid !== urlUid) {
            if (this.state.boardPrivacy === 'public') return true
            if (this.state.boardPrivacy === 'private') return false
            if (this.state.boardPrivacy === 'mates') {
                return await areMates(uid, urlUid)
            }
        }
        return true
    }

    render() {
        return (
            <Skeleton noMarginTop={true}>
                <MateNoteboardObserver sendFriendshipInfoToParent={this.friendshiptInfoFromObserver} />
                <If condition={!this.props.user.email && (this.props.isLoading || this.state.isLoading)}>
                    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                        <div className="row">
                            <div className="col-2 offset-4">
                                <Spinner />
                            </div>
                        </div>
                    </div>
                </If>
                <If condition={!this.props.isLoading && !this.state.isLoading}>
                    <section className="container-fluid">
                        <UserPresentation
                            name={this.props.user.name}
                            email={this.props.user.email}
                            bio={this.props.user.bio}
                            phone={this.props.user.phone}
                            profilePic={this.props.user.profilePic}
                            coverPic={this.props.user.coverPic}
                            callAddMateIfExists={this.callAddMateIfExists}
                            pendingInvite={this.state.pendingInvite}
                            areMates={this.state.areMates}
                        />
                        <hr className="mb-5" />
                        <If condition={!this.state.isUserAllowedByPrivacy}>
                            <div className="row">
                                <div className="col offset-sm-4">
                                    <h5 className="text-primary">{window.translate({ text: "matenoteboard-user-not-allowed" })}</h5>
                                </div>
                            </div>
                        </If>
                        <If condition={this.state.isUserAllowedByPrivacy}>
                            <div className="row ">
                                <div className="col-10 offset-1">
                                    <NoteboardContainer containerId="matenoteboard-notes-accordion" notAccordionContainer={true}>
                                        <NoteboardSection
                                            notAccordionItem={true}
                                            isLoading={this.props.isLoading}
                                            notes={this.props.notes}
                                            areNotesEditable={false}
                                            emptyLabel={window.translate({ text: "matenoteboard-notes-no-note" })}
                                            boardPrivacy={this.state.boardPrivacy}
                                        />
                                    </NoteboardContainer>
                                </div>
                            </div>
                        </If>
                    </section>
                </If>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar />
            </Skeleton>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.mateNoteboard.user,
    notes: state.mateNoteboard.notes,
    isLoading: state.mateNoteboard.isLoading,
    currentUserUid: state.user.uid,
    currentUserEmail: state.user.email,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsLoaded, setIsLoading, refreshMateNoteboardNotes,
    refreshMateNoteboardUser, addMateIfExists, refreshMatesUids
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MateNoteboard)