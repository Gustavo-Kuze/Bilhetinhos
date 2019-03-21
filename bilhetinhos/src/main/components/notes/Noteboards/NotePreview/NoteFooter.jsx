import React, { Component } from 'react'
import If from '../../../utils/If'

export default class NoteFooter extends Component {

    state = {
        visibility: "hide"
    }

    toggleVisibility = () => {
        let visibility = this.state.visibility
        visibility = visibility === "show" ? "hide" : "show"
        this.setState({ ...this.state, visibility })
    }

    render() {
        return (
            <If condition={!this.props.hideFooter}>
                <div className="card-footer">
                    <div className="container">
                        <div className="row">
                            <div className={`col note-footer-${this.state.visibility}`}>
                                <If condition={this.state.visibility === 'show'}>
                                    <div className="p-3">
                                        {this.props.children}
                                    </div>
                                </If>
                            </div>
                            <div className="col-12">
                                <If condition={this.state.visibility === 'hide'}>
                                    <button className="btn btn-block text-muted" onClick={this.toggleVisibility}>
                                        {this.props.label}
                                    </button>
                                </If>
                            </div>
                            <If condition={this.state.visibility === 'show'}>
                                <div className="col">
                                    <button type="button" className="close float-right" data-dismiss="modal" aria-label="Close"
                                        onClick={this.toggleVisibility} >
                                        <i className={this.state.visibility === "show" ? "fas fa-times" : "fas fa-arrow-up"} ></i>
                                    </button>
                                </div>
                            </If>
                        </div>
                    </div>
                </div>
            </If>
        )
    }
}
