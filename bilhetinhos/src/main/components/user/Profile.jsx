import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../base/Skeleton/Skeleton'
import { updateUserProfile, updateUserPicture, updateCoverPicture } from '../../redux/actions/userActions'
import { changeProfilePictureDownloadUrl, changeCoverPictureDownloadUrl, resetCacheState } from '../../redux/actions/cachedActions'
import firebase from '../../api/firebase'
import If from '../utils/If'
import Spinner from '../utils/Spinner'
import { registerUser } from '../../api/users'
import ReduxToastr, { toastr } from 'react-redux-toastr'
import ImgPicker from '../utils/ImgPicker/'
import { Translate } from 'react-translated'

class Profile extends Component {

    state = {
        isLoadingProfilePic: false,
        isLoadingCoverPic: false,
        user: {
            email: this.props.email,
            uid: this.props.uid,
            name: this.props.name,
            profilePic: this.props.profilePic,
            coverPic: this.props.coverPic,
            bio: this.props.bio,
            phone: this.props.phone,
            mates: this.props.mates
        },
        profilePicInputUrl: '',
        coverPicInputUrl: ''
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

    loadPic = (imgDownloadUrl, isCover = false) => {
        let isLoadingProfilePic = isCover ? this.state.isLoadingProfilePic : true
        let isLoadingCoverPic = isCover ? true : this.state.isLoadingCoverPic

        // this.props.resetCacheState()
        this.setState({
            ...this.state,
            isLoadingProfilePic,
            isLoadingCoverPic
        })

        try {
            if (isCover) {
                this.props.changeCoverPictureDownloadUrl(imgDownloadUrl)
                this.setState({ ...this.state, isLoadingProfilePic: false })
            } else {
                this.props.changeProfilePictureDownloadUrl(imgDownloadUrl)
                this.setState({ ...this.state, isLoadingCoverPic: false })
            }
        } catch (err) {
            toastr.error(window.translate({ text: 'toastr-error-title' }), window.translate({ text: 'profile-image-loading-error' }))
            console.log(err)
            this.setState({ ...this.state, isLoadingProfilePic: false, isLoadingCoverPic: false })
        }
    }

    handlePicChange = (element, isCoverImg) => {
        let imageDatabasePath = isCoverImg ? `${this.state.user.uid}/cover` : `${this.state.user.uid}/profile`
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
                        .then(pictureDownloadUrl => {
                            this.setState({
                                ...this.state,
                                user: {
                                    ...this.state.user,
                                    profilePic: isCoverImg ? this.state.user.profilePic : pictureDownloadUrl,
                                    coverPic: !isCoverImg ? this.state.user.coverPic : pictureDownloadUrl,
                                }
                            }, () => {
                                this.saveImgChanges(pictureDownloadUrl, isCoverImg)
                            })
                        })
                })
        } else {
            toastr.warning(window.translate({ text: 'toastr-attention-title' }), window.translate({ text: 'profile-image-error-size-or-type' }))
        }
    }

    saveImgChanges = (downloadUrl, isCoverImg) => {
        this.saveProfileChanges()
        this.loadPic(downloadUrl, isCoverImg)
        toastr.success(window.translate({ text: 'toastr-success-title' }), window.translate({ text: isCoverImg ? 'profile-cover-image-updated' : 'profile-image-updated' }))
    }

    handleInputChange = (element, isPictureInput) => {
        if (isPictureInput) {
            this.setState({
                ...this.state, [`${element.target.name}`]: element.target.value
            })
        } else {
            this.setState({
                ...this.state, user: {
                    ...this.state.user, [`${element.target.name}`]: element.target.value
                }
            })
        }
    }

    handleInputKeyUp = (e, isCoverImg) => {
        let value = e.target.value
        if (e.key === 'Enter') {
            this.setUserPicturesOnStateAndSave(value, isCoverImg)
        }
    }

    setUserPicturesOnStateAndSave = (value, isCoverImg) => {
        let key = isCoverImg ? 'coverPic' : 'profilePic'
        this.setState({ ...this.state, user: { ...this.state.user, [`${key}`]: value } }, () => {
            this.saveImgChanges(value, isCoverImg)
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
                            <p className="text-muted mt-5">{window.translate({ text: 'profile-picture-label' })}</p>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input name="profilePicInputUrl"
                                            id="input-text-profile-pic"
                                            className="form-control"
                                            value={this.state.profilePicInputUrl}
                                            onChange={e => this.handleInputChange(e, true)}
                                            onKeyUp={(e) => this.handleInputKeyUp(e)}
                                            placeholder={window.translate({ text: 'profile-pic-input-placeholder' })} />
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col">
                                    <small className="text-muted">{window.translate({text: 'profile-picture-upload-tip'})}</small>
                                </div>
                            </div>
                            <ImgPicker
                                id="profile-pic"
                                imgClassName="profile-picture"
                                src={`${this.props.profilePictureDownloadUrl || "/img/default_user_profile.png"}`}
                                imgAlt="Profile"
                                onChange={this.handlePicChange}
                            />
                            <If condition={this.state.isLoadingCoverPic}>
                                <Spinner extraClasses="py-5" />
                            </If>
                            <p className="text-muted">{window.translate({ text: 'profile-cover-image-label' })}</p>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input name="coverPicInputUrl"
                                            id="input-text-cover-pic"
                                            className="form-control"
                                            value={this.state.coverPicInputUrl}
                                            onChange={e => this.handleInputChange(e, true)}
                                            onKeyUp={(e) => this.handleInputKeyUp(e, true)}
                                            placeholder={window.translate({ text: 'profile-pic-input-placeholder' })} />
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col">
                                    <small className="text-muted">{window.translate({text: 'profile-picture-upload-tip'})}</small>
                                </div>
                            </div>
                            <ImgPicker
                                id="cover-pic"
                                imgClassName="cover-picture img-fluid"
                                src={`${this.props.coverPictureDownloadUrl || "/img/default_cover.png"}`}
                                imgAlt="Cover"
                                onChange={(e) => this.handlePicChange(e, true)}
                            />
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
    coverPic: state.user.coverPic,
    bio: state.user.bio,
    phone: state.user.phone,
    mates: state.user.matesUids,
    profilePictureDownloadUrl: state.cached.profilePictureDownloadUrl,
    coverPictureDownloadUrl: state.cached.coverPictureDownloadUrl
})

const mapDispatchToProps = dispatch => bindActionCreators({
    updateUserProfile, updateUserPicture, updateCoverPicture,
    changeProfilePictureDownloadUrl, changeCoverPictureDownloadUrl, resetCacheState
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)