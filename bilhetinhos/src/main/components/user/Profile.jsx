import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../base/Skeleton'
import { updateUserProfile } from '../../redux/actions/userActions'
import firebase from 'firebase/app'
import 'firebase/storage'


class Profile extends Component {
    state = {
        name: '',
        profilePic: '',
        bio: '',
        phone: ''
    }

    callUpdateUserProfile = e => {
        e.preventDefault()


        this.props.updateUserProfile({
            ...this.state
        })

        return false
    }

    handleNameChange = e => {
        this.setState({...this.state, name: e.target.value})
    }

    handlePicChange = e => {
        
        var storageRef = firebase.storage().ref();
        storageRef.child('/imagens/').put(e.target.files[0])

        this.setState({...this.state, profilePic: e.target.value})
    }

    handleBioChange = e => {
        this.setState({...this.state, bio: e.target.value})
    }
    
    handlePhoneChange = e => {
        this.setState({...this.state, phone: e.target.value})
    }
    
    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3">Perfil</h1>
                            <form onSubmit={this.callUpdateUserProfile}>
                                <div className="form-group">
                                    <input name="user-name" id="inp-user-name" className="form-control"  value={this.props.name} onChange={this.handleNameChange} placeholder="Seu nome completo ou apelido"/>
                                </div>
                                <div className="form-group">
                                    <textarea name="user-bio" id="ta-user-bio" className="form-control" cols="30" rows="10" value={this.props.bio} onChange={this.handleBioChange} placeholder="Biografia"></textarea>
                                </div>
                                <div className="form-group">
                                    <input name="user-pic" id="inp-user-pic" className="form-control" value={this.props.profilePic} onChange={this.handlePicChange} type="file"/>
                                </div>
                                <div className="form-group">
                                    <input name="user-phone" id="inp-user-phone" className="form-control" value={this.props.phone} onChange={this.handlePhoneChange} placeholder="Telefone" />
                                </div>
                                <button className="btn btn-primary">Salvar</button>
                            </form>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ updateUserProfile }, dispatch)

export default connect(null, mapDispatchToProps)(Profile)