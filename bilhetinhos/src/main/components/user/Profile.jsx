import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../base/Skeleton/Skeleton'
import { updateUserProfile, updateUserPicture } from '../../redux/actions/userActions'
import firebase from '../../api/firebase'
import If from '../utils/If'
import Spinner from '../utils/Spinner'
import { setUser } from '../../api/users'

class Profile extends Component {
    state = {
        email: this.props.email,
        uid: this.props.uid,
        name: this.props.name,
        profilePic: this.props.profilePic,
        bio: this.props.bio,
        phone: this.props.phone,
        mates: this.props.mates
    }

    callUpdateUserProfile = e => {
        e.preventDefault()
        setUser({
            ...this.state
        }).then(() => {
            this.props.updateUserProfile({
                ...this.state
            })
        })

        return false
    }

    handleNameChange = e => {
        this.setState({ ...this.state, name: e.target.value })
    }

    handlePicChange = e => {
        var storageRef = firebase.storage().ref();
        storageRef.child(`${this.state.uid}/profile`).put(e.target.files[0])
        this.setState({ ...this.state, profilePic: e.target.value })
        this.props.updateUserPicture(e.target.value)
    }

    handleBioChange = e => {
        this.setState({ ...this.state, bio: e.target.value })
    }

    handlePhoneChange = e => {
        this.setState({ ...this.state, phone: e.target.value })
    }

    componentDidMount() {
        firebase.storage().ref().child(`${this.state.uid}/profile`)
            .getDownloadURL()
            .then((url) => {
                const picPreview = document.getElementById('profile-pic-preview')
                picPreview.setAttribute('src', url)
                this.setState({ ...this.state, profilePic: url })
            }).catch(err => console.log(err))
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3">Perfil</h1>
                            <label htmlFor="inp-user-pic">
                                <img className="thumbnail" id="profile-pic-preview" style={{ height: '100px' }} src="https://profiles.utdallas.edu/img/default.png" alt="Perfil" />
                            </label>
                            <input name="user-pic" id="inp-user-pic" className="form-control invisible" value={this.state.profilePic} onChange={this.handlePicChange} type="file" />
                            <If condition={this.state.profilePic === ''}>
                                <br />
                                <Spinner />
                            </If>
                            <form onSubmit={this.callUpdateUserProfile}>
                                <div className="form-group">
                                    <input name="user-name" id="inp-user-name" className="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Seu nome completo ou apelido" />
                                </div>
                                <div className="form-group">
                                    <textarea name="user-bio" id="ta-user-bio" className="form-control" cols="30" rows="10" value={this.state.bio} onChange={this.handleBioChange} placeholder="Biografia"></textarea>
                                </div>
                                <div className="form-group">
                                    <input name="user-phone" id="inp-user-phone" className="form-control phone-mask" value={this.state.phone} onChange={this.handlePhoneChange} placeholder="Telefone" />
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

const mapStateToProps = state => ({
    email: state.user.email,
    uid: state.user.uid,
    name: state.user.name,
    profilePic: state.user.profilePic,
    bio: state.user.bio,
    phone: state.user.phone,
    mates: state.user.mates
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateUserProfile, updateUserPicture }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)