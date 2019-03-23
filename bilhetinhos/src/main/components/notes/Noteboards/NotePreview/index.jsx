import '../css/Note.css'
import React, { Component } from 'react'
import If from '../../../utils/If'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setEntireNote } from '../../../../redux/actions/editNoteActions'
import NoteAttachments from '../NoteAttachments/'
import { Translate } from 'react-translated'
import NoteFooter from './NoteFooter'

export class NotePreview extends Component {

  renderMates = () => {
    let noteMates = this.props.noteMates
    if (noteMates) {
      if (noteMates.length > 0) {
        return noteMates.map((m, i) => {
          return <li key={`marked-mate-${m}-${i}`} className="text-muted list-inline-item">
            <small className="text-wrap card-text">{m}</small>
          </li>
        })
      }
    }
    return ''
  }

  callSetEntireNote = () => {
    let note = {
      noteColor: this.props.noteColor,
      fontColor: this.props.fontColor,
      fontSize: this.props.fontSize,
      message: this.props.message,
      title: this.props.title,
      noteMates: this.props.noteMates,
      attachments: this.props.attachments
    }
    this.props.setEntireNote(note)
  }

  openNoteEditor = () => {
    this.callSetEntireNote()
    window.$('#edit-note-modal').modal('show')
  }

  openRemoveDialog = () => {
    this.callSetEntireNote()
    window.$('#remove-note-modal').modal('show')
  }

  refMessageParagraph = (p) => {
    this.messageParagraph = p
  }

  setFontSize = (p) => {
    if (p) {
      let domElement = document.getElementById(p.id)
      if (this.props.fontSize) {
        domElement.style = 'font-size: ' + this.props.fontSize + 'px !important;'
      } else {
        domElement.style = 'font-size: 20px !important;'
      }
    }
  }

  componentDidMount = () => {
    this.setFontSize(this.messageParagraph)
  }

  render() {

    return (
      <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
        <div className="card my-3 w-100 drop-material-shadow" id={`note-${this.props.title.replace(/ /g, '')}`}
          style={{
            backgroundColor: this.props.noteColor || '#fff9c4',
            color: this.props.fontColor || '#424242', borderBottomWidth: '1px',
            border:
              this.props.mark ?
                '3px solid red' :
                ''
          }}>
          <div className="card-header">
            <div className="row">
              <div className="col">
                <small className="card-title"><Translate text="notepreview-created-by" data={{ owner: this.props.owner }} /></small>
              </div>
              <div className="col">
                <div className="float-right">
                  <If condition={this.props.editable}>
                    <button className="btn btn-sm btn-warning mr-1" onClick={this.openNoteEditor}><i className="fas fa-pencil-alt"></i></button>
                    <button className="btn btn-sm btn-danger" onClick={this.openRemoveDialog}><i className="fas fa-trash"></i></button>
                  </If>
                  <If condition={this.props.mark}>
                    <div className="col-1">
                      <img className="" src="/img/pin.png"
                        alt="Nota marcada"
                        style={{ position: 'absolute', right: '-30px', top: '-20px', zIndex: '999' }} />
                    </div>
                  </If>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="h5 card-title" >{this.props.title || ''}</p>
            <p id={`message-p-${this.props.title.replace(new RegExp(' ', 'g'), '-')}`} className="note-message"
              ref={this.refMessageParagraph}>
              {this.props.message || ''}
            </p>
            <ul className="list-inline">
              {this.renderMates()}
            </ul>
          </div>
          <NoteFooter
            label={window.translate({ text: "notepreview-attachments-label" })}
          hideFooter={!this.props.attachments || this.props.attachments.length === 0} 
          >
            <NoteAttachments attachments={this.props.attachments} />
          </NoteFooter>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setEntireNote
}, dispatch)

export default connect(null, mapDispatchToProps)(NotePreview)