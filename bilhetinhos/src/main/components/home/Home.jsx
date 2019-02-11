import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
// import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
// import ReduxToastr, {toastr} from 'react-redux-toastr'
export default class Home extends Component {
    render() {
        return (
            <Skeleton>
                <section id="home-banner" className="container-fluid text-center">
                    <h1>Início</h1>
                    <h2>Seja bem-vindo</h2>
                    <a href="/user/signup" className="btn btn-primary">Sign Up</a>
                    <a href="/user/login" className="btn btn-primary">Login</a>
                    {/* <button className="btn btn-primary" onClick={() => toastr.success('The title', 'The message') }>Launch toastr</button>
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-left"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar
                        closeOnToastrClick /> */}
                </section>
            </Skeleton>
        )
    }
}
