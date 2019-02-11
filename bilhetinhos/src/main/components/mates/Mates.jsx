import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
import Modal from '../base/Modal'
import firebase from '../../api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { refreshMates } from '../../redux/actions/userActions'

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
            let matesRef = firebase.database().ref(`users/${this.props.currentUid}/mates`)
            matesRef.once('value', (snapshot) => {
                let mates = snapshot.val() || []
                if (!mates.includes(this.state.mateEmail)) {
                    mates.push(this.state.mateEmail)
                    matesRef.set(mates)
                    this.props.refreshMates(mates)
                } else {
                    alert('O dono deste E-mail já é seu colega!')
                }
            })
        } else {
            alert('Nenhum colega foi encontrado com este E-mail!')
        }
        return false
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
                            <ul>
                                {this.props.mates.map(m => (
                                    <li key={m}>{m}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

const mapStateToProps = state => ({
    mates: state.user.mates,
    currentUid: state.user.uid
})

const mapDispatchToProps = dispatch => bindActionCreators({ refreshMates }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Mates)