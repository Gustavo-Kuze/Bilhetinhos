import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/auth";
import { login } from "../../redux/actions/loginActions"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

class SignOut extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.login({
          email: '',
          uid: '',
          accessToken: ''
        })
        window.location.pathname = "/user/login";
      });
  }

  render() {
    return (
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <p>Saindo...</p>
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Saindo...</span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(SignOut)