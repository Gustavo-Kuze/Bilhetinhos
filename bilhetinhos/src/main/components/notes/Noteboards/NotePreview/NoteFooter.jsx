import React, { Component } from 'react'

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
            <div className="card-footer">
                <div className="container">
                    <div className="row">
                        <div className={`col note-footer-${this.state.visibility}`}>
                            <div className="p-3">
                                {this.props.children}
                            </div>
                        </div>
                        <div className="col">
                            <button type="button" className="close float-right" data-dismiss="modal" aria-label="Close"
                                onClick={this.toggleVisibility} >
                                <i className={this.state.visibility === "show" ? "fas fa-times" : "fas fa-arrow-up"} ></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
