import React, { Component } from 'react'
import If from '../utils/If'
export default class Modal extends Component {
    render() {
        return (
            <div className="modal fade" id={this.props.modalId} tabindex="-1" role="dialog" aria-labelledby={`${this.props.modalId}-title`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
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
                        <div className="modal-footer">
                            <If condition={this.props.buttonText}>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onOk}>{this.props.buttonText}</button>
                            </If>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
