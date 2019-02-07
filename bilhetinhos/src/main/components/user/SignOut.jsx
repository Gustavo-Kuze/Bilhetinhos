import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/auth";

export default class SignOut extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.pathname = "/user/login";
      });
  }

  render() {
    return (
      <div>
        <p>Saindo...</p>
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Saindo...</span>
        </div>
      </div>
    );
  }
}
