import React, { Component } from 'react'
import Modal from '../../../base/Modal'

export default class AttachmentsViewer extends Component {

    getFileNameFromSrc = () => {
        return ''
    }

    render() {
        return (
            <Modal
                modalId="attachment-viewer-modal"
                title={window.translate({ text: 'attachment-viewer-title' })}
                extraClasses="modal-lg modal-dialog-centered"
            >
                <div className="row">
                    <div className="col-5 offset-1">
                        <small className="text-secondary">{window.translate({ text: 'attachment-viewer-filename-label' })}:</small>
                        <p>{this.getFileNameFromSrc()}</p>
                    </div>
                    <div className="col-5 offset-1">
                        <small className="text-secondary">{window.translate({ text: 'attachment-viewer-date-label' })}:</small>
                        <p>{this.props.date}</p>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col d-flex justify-content-center align-items-center">
                        <img className="img-fluid" src={this.props.src} alt={this.props.alt} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 offset-1">
                        <small className="text-secondary">{window.translate({ text: 'attachment-viewer-description-label' })}:</small>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </Modal>
        )
    }
}
