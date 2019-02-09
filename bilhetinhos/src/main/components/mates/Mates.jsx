import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
import Modal from '../base/Modal'
import firebase from '../../api/firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addMate } from '../../redux/actions/userActions'

class Mates extends Component {

    state = {
        mateEmail: ''
    }

    handleEmailChange = e => {
        this.setState({ mateEmail: e.target.value })
    }

    verifyAndAddMate = async (e) => {
        e.preventDefault()
        let emailProviders = await firebase.auth().fetchProvidersForEmail(this.state.mateEmail)
        if (emailProviders.length > 0) {
            this.props.addMate(this.state.mateEmail)
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

                                <form onSubmit={this.verifyAndAddMate}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Digite o email de um colega aqui" value={this.state.mateEmail} onChange={this.handleEmailChange} />
                                    </div>
                                    <button className="btn btn-primary">Adicionar</button>
                                </form>
                            </Modal>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add-mate-modal">
                                Adicionar um colega
                            </button>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addMate }, dispatch)
export default connect(null, mapDispatchToProps)(Mates)