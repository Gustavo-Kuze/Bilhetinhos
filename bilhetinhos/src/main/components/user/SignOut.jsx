import React, { Component } from "react";
import firebase from '../../api/firebase'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Spinner from '../utils/Spinner'
import { resetUserState } from "../../redux/actions/userActions"
import { resetCacheState } from "../../redux/actions/cachedActions"
import { resetNotificationsState } from "../../redux/actions/notificationsActions"
import {resetMates} from '../../redux/actions/matesActions'
import {resetNotes} from '../../redux/actions/notesActions'
import {Translate} from 'react-translated'

class SignOut extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.resetUserState()
        this.props.resetCacheState()
        this.props.resetNotificationsState()
        this.props.resetMates()
        this.props.resetNotes()
      });
  }

  render() {
    return (
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <p className="mt-3 mr-3"><Translate text="signout-label"/></p>
        <Spinner sr="Saindo..." />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  resetUserState, resetCacheState, resetNotificationsState, resetMates, resetNotes
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(SignOut)