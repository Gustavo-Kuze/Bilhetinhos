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
import { Translate } from 'react-translated'

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

    callSaveProfileChanges = element => {
        element.preventDefault()
        this.saveProfileChanges()
        return false
    }

    saveProfileChanges = () => {
        registerUser({
            ...this.state.user
        }).then(() => {
            this.props.updateUserProfile({
                ...this.state.user
            })
            toastr.success(window.translate({ text: 'toastr-success-title' }), window.translate({ text: 'profile-saved' }))
        })
    }

    isValidImage = img => {
        return (img.size / 1024 < 1025 && (img.name.includes('.jpg') || img.name.includes('.png') || img.name.includes('.jpeg')))
    }

    loadProfilePic = (imgDownloadUrl) => {
        this.props.resetCacheState()
        this.setState({ ...this.state, isLoadingProfilePic: true })

        try {
            this.props.changePictureDownloadUrl(imgDownloadUrl)
            this.setState({ ...this.state, isLoadingProfilePic: false })
        } catch (err) {
            toastr.error(window.translate({ text: 'toastr-error-title' }), window.translate({ text: 'profile-image-loading-error' }))
            console.log(err)
            this.setState({ ...this.state, isLoadingProfilePic: false })
        }
    }

    handlePicChange = element => {
        let imageDatabasePath = `${this.state.user.uid}/profile`
        let imageFile = element.target.files[0]
        if (this.isValidImage(imageFile)) {
            let storageRef = firebase.storage().ref()
            storageRef
                .child(imageDatabasePath)
                .put(imageFile)
                .then(() => {
                    storageRef
                    .child(imageDatabasePath)
                    .getDownloadURL()
                    .then(profilePicDownloadUrl => {
                        this.setState({
                            ...this.state,
                            user: {
                                ...this.state.user,
                                profilePic: profilePicDownloadUrl
                            }
                        }, () => {
                            this.saveProfileChanges()
                            this.loadProfilePic(profilePicDownloadUrl)
                            toastr.success(window.translate({ text: 'toastr-success-title' }), window.translate({ text: 'profile-image-updated' }))
                        })
                    })
                })
        } else {
            toastr.warning(window.translate({ text: 'toastr-attention-title' }), window.translate({ text: 'profile-image-error-size-or-type' }))
        }
    }

    handleInputChange = element => {
        this.setState({
            ...this.state, user: {
                ...this.state.user, [`${element.target.name}`]: element.target.value
            }
        })
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3"><Translate text="profile-header-title" /></h1>
                            <If condition={this.state.isLoadingProfilePic}>
                                <Spinner extraClasses="py-5" />
                            </If>
                            <label htmlFor="inp-user-pic" className={`${this.state.isLoadingProfilePic ? 'invisible' : ''}`}>
                                <img className={`thumbnail ${this.state.isLoadingProfilePic ? 'invisible' : ''}`} id="profile-pic-preview" style={{ height: '100px' }}
                                    src={`${this.props.profilePictureDownloadUrl || "/img/default_user_profile.png"}`} alt="Perfil" />
                            </label>
                            <input name="user-pic" id="inp-user-pic" className="form-control invisible" onChange={this.handlePicChange} type="file" accept=".png, .jpg, .jpeg" />
                            <form onSubmit={this.callSaveProfileChanges}>
                                <div className="form-group">
                                    <input name="name" id="inp-user-name" className="form-control" value={this.state.user.name} onChange={this.handleInputChange} placeholder={window.translate({ text: 'profile-name-placeholder' })} />
                                </div>
                                <div className="form-group">
                                    <textarea name="bio" id="ta-user-bio" className="form-control" cols="30" rows="10" value={this.state.user.bio} onChange={this.handleInputChange} placeholder={window.translate({ text: 'profile-bio-placeholder' })}></textarea>
                                </div>
                                <div className="form-group">
                                    <input name="phone" id="inp-user-phone" className="form-control phone-mask" value={this.state.user.phone} onChange={this.handleInputChange} placeholder={window.translate({ text: 'profile-phone-placeholder' })} />
                                </div>
                                <button className="btn btn-primary"><Translate text="profile-btn-save" /></button>
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
    mates: state.user.matesUids,
    profilePictureDownloadUrl: state.cached.profilePictureDownloadUrl
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateUserProfile, updateUserPicture, changePictureDownloadUrl, resetCacheState }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)