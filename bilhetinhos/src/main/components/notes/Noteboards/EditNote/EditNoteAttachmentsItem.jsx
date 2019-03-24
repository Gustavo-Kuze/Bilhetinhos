import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  addAttachments, removeAttachment
} from '../../../../redux/actions/editNoteActions'

export class EditNoteAttachmentsItem extends Component {

  callAddAttachment = () => {
    if (this.attInput.value) {
      if (this.props.attachments) {
        if (this.props.attachments.map(att => att.src).includes(this.attInput.value)) {
          this.props.toastr.warning(
            window.translate({ text: 'toastr-attention-title' }),
            window.translate({ text: 'editnote-attachment-already-added-warning' })
          )
          this.clearUrlInputOnly()
          return
        }
        this.props.addAttachments([{ src: this.attInput.value, date: Date.now(), description: this.attDescInput.value }])
        this.clearInputs()
      }
    } else {
      this.props.toastr.warning(
        window.translate({ text: 'toastr-attention-title' }),
        window.translate({ text: 'editnote-attachment-empty-input-warning' })
      )
      return
    }
  }

  addAttachments = srcs => {
    let atts = [...srcs].map(src => ({ src, date: Date.now(), description: '' }))
    this.props.addAttachments(atts)
  }

  clearUrlInputOnly = () => this.attInput.value =''
  clearInputs = () => this.attInput.value = this.attDescInput.value = ''

  assignAttInputRef = ref => this.attInput = ref
  assignAttDescInputRef = ref => this.attDescInput = ref

  render() {
    return (
      <div className="container">
        <div className="row mb-2">
          <div className="col">
            <small className="text-secondary">{window.translate({ text: 'editnote-accordion-item-attachments-picker-label' })}:</small>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-9">
                <div className="form-group">
                  <input name="attachmentUrlInput"
                    id="attachment-url-input"
                    className="form-control"
                    ref={ref => this.assignAttInputRef(ref)}
                    placeholder={window.translate({ text: 'editnote-add-attachment-url-placeholder' })} />
                  <textarea name="attachmentDescriptionInput" id="attachment-description-input"
                    ref={ref => this.assignAttDescInputRef(ref)}
                    className="form-control mt-1"
                    placeholder={window.translate({ text: 'editnote-add-attachment-description-placeholder' })}></textarea>
                </div>
              </div>
              <div className="col-1">
                <span tabIndex="0"
                  className="btn btn-lg btn-primary"
                  onClick={this.callAddAttachment}><i className="fas fa-plus"></i></span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ul className="list-group list-group-flush">
                  {this.props.attachments ? this.props.attachments.map((att, index) => (
                    <li
                      key={`${att.src}--${index}`}
                      className="list-group-item">
                      <span className="text-danger mr-2" style={{ cursor: 'pointer' }}
                        onClick={() => this.props.removeAttachment(att)}
                      >
                        <i className="fas fa-times"></i>
                      </span><span>{att.src}</span><br /><small className="text-muted">{att.description}</small ></li>
                  )) : ''}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  attachments: state.editNote.attachments,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addAttachments, removeAttachment
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteAttachmentsItem)
