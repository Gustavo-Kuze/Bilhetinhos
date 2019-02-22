import './css/Mates.css'
import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
import Modal from '../base/Modal'
import firebase from '../../api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshMates } from '../../redux/actions/userActions'
import { getUserByUid, getUsersRef } from '../../api/users'
import { removeMate, addMateIfExists } from '../../api/mates'
import ReduxToastr, { toastr } from 'react-redux-toastr'
import MatePreview from './MatePreview'
import RemoveMate from './RemoveMate/'
import Spinner from '../utils/Spinner'
import If from '../utils/If'


class Mates extends Component {

    state = {
        mateEmail: '',
        matePreviews: [],
        mate: {
            name: '',
            email: '',
            uid: ''
        },
        isLoadingMates: false
    }

    handleEmailChange = element => {
        this.setState({ mateEmail: element.target.value })
    }

    callAddMateIfExists = async () => {
        try {
            let mates = await addMateIfExists(this.props.currentUserUid, this.props.currentUserEmail, this.state.mateEmail, (msg) => {
                toastr.success('Sucesso!', msg)
            })
            this.props.refreshMates(mates)
        } catch (err) {
            toastr.error('Erro!', err.message)
        }
    }

    renderMates = async () => {
        let matePreviews = await Promise.all(this.props.mates.map(async mateUid => {
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
                toastr.error('Erro', 'Ocorreu um erro ao tentar carregar algum colega')
                console.log(err)
                return ''
            }
        }))
        console.log(matePreviews)
        return matePreviews
    }

    createMatePreview = mate => (
        <MatePreview
            key={mate.uid}
            uid={mate.uid}
            email={mate.email}
            profilePic={mate.profilePic}
            name={mate.name}
            setMateOnState={this.setMateOnState}
        />
    )

    loadMatePreviews = () => {
        this.setState({ ...this.state, isLoadingMates: true })
        getUsersRef().once('value', async usersSnapshot => {
            let matesAsync = []
            let usersSnapshotEntries = Object.entries(usersSnapshot.val())
            if (usersSnapshotEntries && this.props.mates) {
                matesAsync = await Promise.all(usersSnapshotEntries
                    .filter(user => this.props.mates.includes(user[0]))
                    .map(async user => {
                        let mate = {
                            uid: user[0],
                            email: user[1].email,
                            name: user[1].name,
                            profilePic: user[1].profilePic
                        }

                        if (mate.profilePic)
                            mate.profilePic = await firebase.storage().ref(mate.profilePic).getDownloadURL()

                        return mate
                    }))

                let mates = await Promise.all(matesAsync)
                this.setState({
                    ...this.state,
                    matePreviews: mates.map(mate => this.createMatePreview(mate)),
                    isLoadingMates: false
                })
            } else {
                toastr.error('Erro!', 'Não foi possível carregar os colegas, por favor saia e faça login novamente.')
                this.setState({ ...this.state, isLoadingMates: false })
            }
        })
    }

    setMateOnState = (mate) => {
        this.setState({ ...this.state, mate })
    }

    startMatesListener = () => {
        getUsersRef().child(this.props.currentUserUid).child('mates').on('value', () => {
            this.loadMatePreviews()
        })
    }

    removeMateAndRefresh = async (uid, mateUid) => {
        let newMates = await removeMate(uid, mateUid)
        this.props.refreshMates(newMates)
    }

    componentDidMount = () => {
        this.loadMatePreviews()
        this.startMatesListener()
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                            <h1 className="h3">Colegas</h1>
                            <Modal
                                modalId="add-mate-modal"
                                title="Adicionar um colega" >
                                <div className="form-group">
                                    <input tabIndex="0" type="email" className="form-control" placeholder="Digite o email de um colega aqui" value={this.state.mateEmail} onChange={this.handleEmailChange}
                                        onKeyUp={e => { if (e.key === 'Enter') this.callAddMateIfExists(); }} />
                                </div>
                                <button className="btn btn-primary" onClick={this.callAddMateIfExists}>Adicionar</button>
                            </Modal>
                            <RemoveMate
                                name={this.state.mate.name}
                                email={this.state.mate.email}
                                uid={this.props.currentUserUid}
                                mateUid={this.state.mate.uid}
                                onClose={() => { }}
                                removeMate={this.removeMateAndRefresh}
                            />
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add-mate-modal">
                                Adicionar um colega
                            </button>
                            <hr />
                            <If condition={this.state.isLoadingMates}>
                                <div className="row">
                                    <div className="col offset-5">
                                        <Spinner extraClasses="py-5 pl-3" />
                                    </div>
                                </div>
                            </If>
                            <ul className="list-unstyled">
                                {this.state.matePreviews}
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
    mates: state.user.mates,
    currentUserUid: state.user.uid,
    currentUserEmail: state.user.email
})

const mapDispatchToProps = dispatch => bindActionCreators({ refreshMates }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Mates)