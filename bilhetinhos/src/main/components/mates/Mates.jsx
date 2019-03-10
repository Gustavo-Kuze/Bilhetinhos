import './css/Mates.css'
import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
import Modal from '../base/Modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshMatesUids } from '../../redux/actions/userActions'
import { getUserByUid, getUsersRef, getUserUidByEmail } from '../../api/users'
import { removeMate, addMateIfExists, areMates } from '../../api/mates'
import { sendUserNotification } from '../../api/notifications'
import ReduxToastr, { toastr } from 'react-redux-toastr'
import MatePreview from './MatePreview'
import RemoveMate from './RemoveMate/'
import Spinner from '../utils/Spinner'
import If from '../utils/If'
import { refreshMates, matesLoading } from '../../redux/actions/matesActions'
import { Translate } from 'react-translated'

class Mates extends Component {

    state = {
        mateEmail: '',
        matePreviews: [],
        mate: {
            name: '',
            email: '',
            uid: ''
        }
    }

    handleEmailChange = element => {
        this.setState({ mateEmail: element.target.value })
    }

    notifyAddedMate = async () => {
        let mateUid = await getUserUidByEmail(this.state.mateEmail)
        if (mateUid) {
            await sendUserNotification(mateUid, {
                title: 'mates-alert-title',
                receivedDate: Date.now(),
                description: 'mates-alert-description',
                sender: `${this.props.currentUserEmail}`,
                read: false,
                href: `/colegas?addm=${this.props.currentUserUid}`
            })
            toastr.success(window.translate({ text: "toastr-success-title" }), window.translate({ text: "toastr-notification-sent" }))
        }
    }

    callAddMateIfExists = async () => {
        try {
            let mates = await addMateIfExists(this.props.currentUserUid, this.props.currentUserEmail, this.state.mateEmail, (msg) => {
                toastr.success(window.translate({ text: "toastr-success-title" }), msg)
            })
            this.props.refreshMatesUids(this.props.currentUserUid)
            this.notifyAddedMate()
        } catch (err) {
            toastr.error(window.translate({ text: "toastr-error-title" }), err.message)
        }
    }

    renderMates = async () => {
        let matePreviews = await Promise.all(this.props.matesUids.map(async mateUid => {
            try {
                let mate = await getUserByUid(mateUid)
                return (
                    <MatePreview
                        uid={mateUid}
                        email={mate.email}
                        profilePic={mate.profilePic}
                        name={mate.name}
                    />
                )
            } catch (err) {
                toastr.error(window.translate({ text: "toastr-error-title" }), window.translate({ text: "toastr-error-trying-load-mates" }))
                return ''
            }
        }))
        return matePreviews
    }

    createMatePreview = async mate => {
        let areMatesResult = await areMates(this.props.currentUserUid, mate.uid)
        let isPendingInvite = !areMatesResult
        return (
            <MatePreview
                key={mate.uid}
                uid={mate.uid}
                email={mate.email}
                profilePic={mate.profilePic}
                name={mate.name}
                setMateOnState={this.setMateOnState}
                pendingInvite={isPendingInvite}
            />
        )
    }

    loadMatePreviews = async () => {
        if (this.props.mates) {
            this.setState({
                ...this.state,
                matePreviews: await Promise.all(this.props.mates.map(async mate => await this.createMatePreview(mate)))
            })
        } else {
            toastr.error(window.translate({ text: "toastr-error-title" }), window.translate({ text: "toastr-error-trying-load-mates" }))
        }
    }

    setMateOnState = (mate) => {
        this.setState({ ...this.state, mate })
    }

    startMatesListener = () => {
        getUsersRef().child(this.props.currentUserUid).child('mates').on('value', () => {
            this.props.matesLoading()
            this.props.refreshMates(this.props.currentUserUid, () => {
                this.loadMatePreviews()
            })
        })
    }

    removeMateAndRefresh = async (uid, mateUid) => {
        let removedMateListOfMates = await removeMate(uid, mateUid)
        let removedUserListOfMates = await removeMate(mateUid, uid) //remove user from mate's list
        this.props.refreshMatesUids(uid)
    }

    componentDidMount = () => {
        this.startMatesListener()
        this.props.matesLoading()
        this.props.refreshMates(this.props.currentUserUid, () => {
            this.loadMatePreviews()
        })
    }

    shouldOpenEditorForNewMate = () => window.location.search.includes('novo=colega')

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                            <h1 className="h3 mt-xs-5 mt-sm-1"><Translate text="mates-list-header-label" /></h1>
                            <Modal
                                open={this.shouldOpenEditorForNewMate()}
                                modalId="add-mate-modal"
                                title={window.translate({ text: "mates-add-mate" })} >
                                <div className="form-group">
                                    <input tabIndex="0" type="email" className="form-control" placeholder={window.translate({ text: "mates-new-mate-email-placeholder" })} value={this.state.mateEmail} onChange={this.handleEmailChange}
                                        onKeyUp={e => { if (e.key === 'Enter') this.callAddMateIfExists(); }} />
                                </div>
                                <button className="btn btn-primary" onClick={this.callAddMateIfExists}><Translate text="mates-add-mate" /></button>
                            </Modal>
                            <RemoveMate
                                name={this.state.mate.name}
                                email={this.state.mate.email}
                                uid={this.props.currentUserUid}
                                mateUid={this.state.mate.uid}
                                onClose={() => { }}
                                removeMate={this.removeMateAndRefresh}
                            />
                            <div className="row">
                                <div className="col offset-2 offset-sm-0">
                                    <button type="button" className="btn btn-link text-decoration-none btn-lg" data-toggle="modal" data-target="#add-mate-modal">
                                        <Translate text="mates-add-mate" />
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <If condition={this.props.isLoadingMates}>
                                <div className="row">
                                    <div className="col offset-5">
                                        <Spinner extraClasses="py-5 pl-3" />
                                    </div>
                                </div>
                            </If>
                            <ul className="list-unstyled">
                                {
                                    this.state.matePreviews.length === 0 && !this.props.isLoadingMates ?
                                        <li>
                                            <p className="lead">{window.translate({ text: "mates-no-mates-label" })}</p>
                                        </li> :
                                        this.state.matePreviews
                                }
                            </ul>
                        </div>
                    </div>
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar />
                </section>
            </Skeleton>
        )
    }
}

const mapStateToProps = state => ({
    matesUids: state.user.matesUids,
    currentUserUid: state.user.uid,
    currentUserEmail: state.user.email,
    isLoadingMates: state.mates.loading,
    mates: state.mates.users
})

const mapDispatchToProps = dispatch => bindActionCreators({
    refreshMatesUids,
    refreshMates,
    matesLoading
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Mates)