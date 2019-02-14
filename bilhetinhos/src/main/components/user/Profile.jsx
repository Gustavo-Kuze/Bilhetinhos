import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../base/Skeleton/Skeleton'
import { updateUserProfile, updateUserPicture } from '../../redux/actions/userActions'
import { changePictureDownloadUrl, resetCacheState } from '../../redux/actions/cachedActions'
import firebase from '../../api/firebase'
import If from '../utils/If'
import Spinner from '../utils/Spinner'
import { registerUser } from '../../api/users'
import ReduxToastr, { toastr } from 'react-redux-toastr'

class Profile extends Component {

    state = {
        isLoadingProfilePic: false,
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

    saveProfileChanges = element => {
        element.preventDefault()
        registerUser({
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

    loadProfilePic = (imgPath = this.state.user.profilePic || 'profile') => {
        this.props.resetCacheState()
        this.setState({ ...this.state, isLoadingProfilePic: true })
        firebase.storage().ref(imgPath)
            .getDownloadURL()
            .then((url) => {
                this.props.changePictureDownloadUrl(url)
                // this.setState({ ...this.state.user, profilePic: url, isLoadingProfilePic: false })
                this.setState({ ...this.state, isLoadingProfilePic: false })
            }).catch(err => {
                toastr.error('Erro!', 'Não foi possível carregar sua imagem de perfil')
                console.log(err)
                this.setState({ ...this.state, isLoadingProfilePic: false })
            })
    }

    handlePicChange = element => {
        let imageFile = element.target.files[0]
        if (this.isValidImage(imageFile)) {
            firebase.storage().ref().child(this.state.user.profilePic).put(imageFile)
                .then(() => {
                    // firebase.database().ref(`users/${this.state.user.uid}`)
                    //     .update({ profilePic: `${this.state.user.uid}/profile` })
                    //     .then(() => {
                    this.loadProfilePic(this.state.user.profilePic)
                    //         this.props.updateUserPicture(`${this.state.user.uid}/profile`)
                    //         this.setState({ ...this.state.user, profilePic: `${this.state.user.uid}/profile` }, () => {
                    toastr.success('Sucesso!', 'Sua imagem de perfil foi atualizada com êxito!')
                    //             })
                    //         })
                })
        } else {
            toastr.warning('Atenção!', 'O tamanho máximo dos arquivos de imagem deve ser de 500 KB. Somente arquivos nos formatos jpg, jpeg e png são aceitos.')
        }
    }
   
    handleInputChange = element => {
        this.setState({
            ...this.state, user: {
                ...this.state.user, [`${element.target.name}`]: element.target.value
            }
        })
    }

    componentDidMount() {
        // this.loadProfilePic()
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3">Perfil</h1>
                            <If condition={this.state.isLoadingProfilePic}>
                                <Spinner extraClasses="py-5" />
                            </If>
                            <label htmlFor="inp-user-pic" className={`${this.state.isLoadingProfilePic ? 'invisible' : ''}`}>
                                <img className={`thumbnail ${this.state.isLoadingProfilePic ? 'invisible' : ''}`} id="profile-pic-preview" style={{ height: '100px' }}
                                    src={`${this.props.profilePictureDownloadUrl || "https://profiles.utdallas.edu/img/default.png"}`} alt="Perfil" />
                            </label>
                            <input name="user-pic" id="inp-user-pic" className="form-control invisible" onChange={this.handlePicChange} type="file" accept=".png, .jpg, .jpeg" />
                            <form onSubmit={this.saveProfileChanges}>
                                <div className="form-group">
                                    <input name="name" id="inp-user-name" className="form-control" value={this.state.user.name} onChange={this.handleInputChange} placeholder="Seu nome completo ou apelido" />
                                </div>
                                <div className="form-group">
                                    <textarea name="bio" id="ta-user-bio" className="form-control" cols="30" rows="10" value={this.state.user.bio} onChange={this.handleInputChange} placeholder="Biografia"></textarea>
                                </div>
                                <div className="form-group">
                                    <input name="phone" id="inp-user-phone" className="form-control phone-mask" value={this.state.user.phone} onChange={this.handleInputChange} placeholder="Telefone" />
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
    mates: state.user.mates,
    profilePictureDownloadUrl: state.cached.profilePictureDownloadUrl
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateUserProfile, updateUserPicture, changePictureDownloadUrl, resetCacheState }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)