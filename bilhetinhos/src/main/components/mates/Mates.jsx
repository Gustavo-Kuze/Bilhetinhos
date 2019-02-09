import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
import Modal from '../base/Modal'
// import firebase from '../../api/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class Mates extends Component {

    state = {
        mateEmail: ''
    }

    handleEmailChange = e => {
        this.setState({mateEmail: e.target.value})
    }

    addMate = async (e) => {
        e.preventDefault()
        let emailProviders = await firebase.auth().fetchProvidersForEmail(this.state.mateEmail)
        if (emailProviders.length > 0) {
            alert('O email está cadastrado')
        } else {

            alert('O email não está cadastrado')
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

                                <form onSubmit={this.addMate}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Digite o email de um colega aqui" value={this.state.mateEmail} onChange={this.handleEmailChange}/>
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
