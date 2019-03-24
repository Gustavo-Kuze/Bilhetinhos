import React, { Component } from 'react'
import Modal from '../../../base/Modal'
import { connect } from 'react-redux'

class AttachmentsViewer extends Component {

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
                        <p style={{ wordWrap: 'break-word' }}>{this.props.src}</p>
                    </div>
                    <div className="col-5 offset-1">
                        <small className="text-secondary">{window.translate({ text: 'attachment-viewer-date-label' })}:</small>
                        <p>{new Date(this.props.date).toLocaleString("pt-br")}</p>
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

const mapStateToProps = state => ({
    src: state.attachmentView.src,
    date: state.attachmentView.date,
    description: state.attachmentView.description
})

export default connect(mapStateToProps)(AttachmentsViewer)