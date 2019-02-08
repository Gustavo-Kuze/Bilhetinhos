import firebase from "firebase/app"
import 'firebase/auth'
import React, { Component } from "react"
import Skeleton from "../base/Skeleton"

import { login } from "../../redux/actions/userActions"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

class SignUp extends Component {
  
  state = {
    email: "",
    password: ""
  }

  signUp = e => {
    e.preventDefault()

    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          user.getIdToken().then(accessToken => {
            this.props.login({
              email: user.email,
              uid: user.uid,
              accessToken
            })
          })
        }
      },
      error => {
        console.log(error)
      }
    )

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        window.location.pathname = "/"
      })
      .catch(error => {
        let errorCode = error.code
        let errorMessage = error.message
        console.log("Ocorreu um erro ao tentar criar um usuário: ")
        console.log(errorCode)
        console.log(errorMessage)
      })

    return false
  }

  handleEmailChanged = e => {
    this.setState({ ...this.state, email: e.target.value })
  }

  handlePasswordChanged = e => {
    this.setState({ ...this.state, password: e.target.value })
  }

  render() {
    return (
      <Skeleton>
        <section className="container-fluid">
          <div className="row ">
            <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
              <h1 className="h3">
                Você está a poucos clique de se juntar a nós!
              </h1>
              <form className="mt-3" onSubmit={this.signUp}>
                <div className="form-group">
                  <label htmlFor="signup-email">E-mail</label>
                  <input
                    id="signup-email"
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Digite seu melhor E-mail aqui"
                    required
                    onChange={this.handleEmailChanged}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-password">Senha</label>
                  <input
                    id="signup-password"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Escolha uma senha forte"
                    required
                    onChange={this.handlePasswordChanged}
                  />
                </div>
                <button className="btn btn-primary">Criar</button>
              </form>
            </div>
          </div>
        </section>
      </Skeleton>
    )
  }
}

// const mapStateToProps = state => ({
//   email: state.email,
//   uid: state.uid,
//   accessToken: state.accessToken
// })

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(SignUp)
