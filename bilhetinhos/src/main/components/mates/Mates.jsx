import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
import Modal from '../base/Modal'
import firebase from '../../api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshMates } from '../../redux/actions/userActions'
import { getMates, getUserByEmail } from '../../api/users'
import {getMatesNotes} from '../../api/notes'
import ReduxToastr, { toastr } from 'react-redux-toastr'

class Mates extends Component {

    state = {
        mateEmail: ''
    }

    handleEmailChange = element => {
        this.setState({ mateEmail: element.target.value })
    }

    addMateIfExists = async element => {
        element.preventDefault()
        let emailProviders = await firebase.auth().fetchProvidersForEmail(this.state.mateEmail)
        if (emailProviders.length > 0) {
            // let matesRef = firebase.database().ref(`users/${this.props.currentUserUid}/mates`)
            // matesRef.once('value', (snapshot) => {
            // let mates = snapshot.val() || []
            getMates(this.props.currentUserUid).then((getMatesRes) => {
                if (this.state.mateEmail !== this.props.currentUserEmail) {
                    getUserByEmail(this.state.mateEmail).then(userByEmail => {
                        if (!getMatesRes.mates.includes(userByEmail.uid)) {
                            getMatesRes.mates.push(userByEmail.uid)
                            getMatesRes.matesRef.set(getMatesRes.mates)
                            this.props.refreshMates(getMatesRes.mates)
                        } else {
                            toastr.warning('Atenção!', 'O dono deste E-mail já é seu colega!')
                        }
                    }).catch(err => {
                        console.log('Erro interno: Não foi possível buscar o usuário pelo E-mail')
                        console.log(err)
                    })
                    
                } else {
                    toastr.warning('Atenção!', 'Você não pode se adicionar como colega.')
                }
            })

            // })
        } else {
            toastr.error('Erro!', 'Nenhum colega foi encontrado com este E-mail!')
        }
        return false
    }

    componentDidMount = () => {
        // getMatesNotes(this.props.currentUserUid).then(matesNotes => {
        //     console.log(matesNotes)
        // })
        getUserByEmail('ravenatitan@gmail.com').then(u => {
            
            console.log(u)
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3">Colegas</h1>
                            <Modal
                                modalId="add-mate-modal"
                                title="Adicionar um colega" >
                                <form onSubmit={this.addMateIfExists}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Digite o email de um colega aqui" value={this.state.mateEmail} onChange={this.handleEmailChange} />
                                    </div>
                                    <button className="btn btn-primary">Adicionar</button>
                                </form>
                            </Modal>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add-mate-modal">
                                Adicionar um colega
                            </button>
                            <hr />
                            <div className="list-group">
                                {this.props.mates.map(m => (
                                    <a href="javascript:;" key={m} className="list-group-item list-group-item-action">{m}</a>
                                ))}
                            </div>
                            {/* <ul>
                                {this.props.mates.map(m => (
                                    <li key={m}>{m}</li>
                                ))}
                            </ul> */}
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