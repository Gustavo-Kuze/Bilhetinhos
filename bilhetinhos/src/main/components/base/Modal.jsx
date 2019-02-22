import React, { Component } from 'react'
import If from '../utils/If'
export default class Modal extends Component {

    componentDidMount = () => {
        if (this.props.onClose) {
            window.$(`#${this.props.modalId}`).on('hide.bs.modal', () => {
                this.props.onClose()
            });
        }

        if (this.props.onOpen) {
            window.$(`#${this.props.modalId}`).on('show.bs.modal', () => {
                this.props.onOpen()
            });
        }

        if (this.props.open) {
            window.$(`#${this.props.modalId}`).modal('show')
        }
    }

    render() {
        return (
            <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby={`${this.props.modalId}-title`} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${this.props.modalId}-title`}>{this.props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <If condition={this.props.buttonText}>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onOk}>{this.props.buttonText}</button>
                            </div>
                        </If>
                    </div>
                </div>
            </div>
        )
    }
}
