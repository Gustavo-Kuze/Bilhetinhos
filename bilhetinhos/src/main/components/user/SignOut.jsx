import React, { Component } from "react";
import firebase from '../../api/firebase'
import { changeUserLogState } from "../../redux/actions/userActions"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Spinner from '../utils/Spinner'

class SignOut extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.changeUserLogState({
          email: '',
          uid: '',
          name: '',
          profilePic: '',
          bio: '',
          phone: '',
          mates: []
        })
        window.location.pathname = "/user/login";
      });
  }

  render() {
    return (
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <p className="mt-3 mr-3">Saindo...</p>
        <Spinner sr="Saindo..." />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ changeUserLogState }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(SignOut)