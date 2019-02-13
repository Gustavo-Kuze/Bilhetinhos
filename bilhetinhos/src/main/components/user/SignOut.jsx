import React, { Component } from "react";
import firebase from '../../api/firebase'
import { resetUserState } from "../../redux/actions/userActions"
import { resetCacheState } from "../../redux/actions/cachedActions"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Spinner from '../utils/Spinner'
// import {deleteState} from '../../redux/localStorage'


class SignOut extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.resetUserState()
        this.props.resetCacheState()
        // window.location.pathname = "/user/login";
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

const mapDispatchToProps = dispatch => bindActionCreators({ resetUserState, resetCacheState }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(SignOut)