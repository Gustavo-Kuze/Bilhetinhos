import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../base/Skeleton/Skeleton'
import { updateUserProfile, updateUserPicture } from '../../redux/actions/userActions'
import firebase from '../../api/firebase'
import If from '../utils/If'
import Spinner from '../utils/Spinner'
import { setUser } from '../../api/users'
import ReduxToastr, { toastr } from 'react-redux-toastr'

class Profile extends Component {

    state = {
        isLoadingProfilePic: true,
        user: {
            email: this.props.email,
            uid: this.props.uid,
            name: this.props.name,
            profilePic: this.props.profilePic,
            bio: this.props.bio,
            phone: this.props.phone,
            mates: this.props.mates
        }
    }

    callUpdateUserProfile = element => {
        element.preventDefault()
        setUser({
            ...this.state.user
        }).then(() => {
            this.props.updateUserProfile({
                ...this.state.user
            })
            toastr.success('Sucesso!', 'Os dados do perfil foram salvos.')
        })

        return false
    }

    isValidImage = img => {
        return (img.size / 1024 < 500 && (img.name.includes('.jpg') || img.name.includes('.png') || img.name.includes('.jpeg')))
    }

    handlePicChange = element => {
        if (this.isValidImage(element.target.files[0])) {
            firebase.storage().ref().child(`${this.state.user.uid}/profile`).put(element.target.files[0]).then(() => {
                firebase.database().ref(`users/${this.state.user.uid}`)
                    .update({ profilePic: `${this.state.user.uid}/profile` })
                    .then(() => {
                        this.props.updateUserPicture(`${this.state.user.uid}/profile`)
                        this.setState({ ...this.state.user, profilePic: `${this.state.user.uid}/profile` }, () => {
                            this.loadProfilePic(`${this.state.user.uid}/profile`)
                            toastr.success('Sucesso!', 'Sua imagem de perfil foi atualizada com êxito!')
                        })
                    })
            })
        } else {
            toastr.warning('Atenção!', 'O tamanho máximo dos arquivos de imagem deve ser de 500 KB. Somente arquivos nos formatos jpg, jpeg e png são aceitos.')
        }
    }

    handleNameChange = element => {
        this.setState({
            ...this.state, user: {
                ...this.state.user, name: element.target.value
            }
        })
    }

    handleBioChange = element => {
        this.setState({
            ...this.state, user: {
                ...this.state.user, bio: element.target.value
            }
        })
    }

    handlePhoneChange = element => {
        this.setState({
            ...this.state, user: {
                ...this.state.user, phone: element.target.value
            }
        })
    }

    loadProfilePic = (imgPath = this.state.user.profilePic || 'profile') => {
        
        this.setState({ ...this.state, isLoadingProfilePic: true })
        firebase.storage().ref(imgPath)//.child(`${this.state.user.uid}/profile`)
            .getDownloadURL()
            .then((url) => {
                const picPreview = document.getElementById('profile-pic-preview')
                picPreview.setAttribute('src', url)
                this.setState({ ...this.state.user, profilePic: url, isLoadingProfilePic: false })
            }).catch(err => {
                toastr.error('Erro!', 'Não foi possível carregar sua imagem de perfil')
                this.setState({ ...this.state.user, isLoadingProfilePic: false })
            })
    }

    componentDidMount() {
        this.loadProfilePic()
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
                            <input name="user-pic" id="inp-user-pic" className="form-control invisible" onChange={this.handlePicChange} type="file" accept=".png, .jpg, .jpeg" />
                            <If condition={this.state.isLoadingProfilePic}>
                                <br />
                                <Spinner />
                            </If>
                            <form onSubmit={this.callUpdateUserProfile}>
                                <div className="form-group">
                                    <input name="user-name" id="inp-user-name" className="form-control" value={this.state.user.name} onChange={this.handleNameChange} placeholder="Seu nome completo ou apelido" />
                                </div>
                                <div className="form-group">
                                    <textarea name="user-bio" id="ta-user-bio" className="form-control" cols="30" rows="10" value={this.state.user.bio} onChange={this.handleBioChange} placeholder="Biografia"></textarea>
                                </div>
                                <div className="form-group">
                                    <input name="user-phone" id="inp-user-phone" className="form-control phone-mask" value={this.state.user.phone} onChange={this.handlePhoneChange} placeholder="Telefone" />
                                </div>
                                <button className="btn btn-primary">Salvar</button>
                            </form>
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