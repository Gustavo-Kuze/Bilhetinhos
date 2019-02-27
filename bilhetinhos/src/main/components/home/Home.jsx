import './css/Home.css'
import React, { Component } from 'react'
import Skeleton from '../base/Skeleton/Skeleton'
import {Translate} from 'react-translated'
export default class Home extends Component {
    render() {
        return (
            <Skeleton>
                <section id="home-banner" className="container-fluid text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <h1 className="mt-5">Bilhetinhos</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <img className="img-fluid mx-auto w-25" src="/img/logo.png" alt="Logo Bilhetinhos" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <h4 className="mb-4 text-muted"><Translate text="home-welcome"/></h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 offset-md-4">
                                <a href="/user/login" className="btn btn-primary btn-block btn-lg"><Translate text="home-login-button"/></a>
                            </div>
                        </div>
                    </div>
                </section>
                <section style={{ marginTop: '200px' }}>
                    <div className="container-fluid bg-primary text-light diagonal-div">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <h2 className="h1 mt-5 pt-md-3 text-center"><Translate text="home-section-1-title"/></h2>
                                    <p className="lead text-center mt-4"><Translate text="home-section-1-p"/></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section >
                    <div className="container-fluid bg-white-50 border border-primary text-primary diagonal-div">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                <h2 className="h1 mt-5 pt-md-3 text-center"><Translate text="home-section-2-title"/></h2>
                                    <p className="lead text-center mt-4"><Translate text="home-section-2-p"/></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}
