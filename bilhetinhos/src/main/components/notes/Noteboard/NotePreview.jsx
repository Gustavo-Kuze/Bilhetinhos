import './css/Note.css'
import React, { Component } from 'react'
import If from '../../utils/If'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setEntireNote } from '../../../redux/actions/noteActions'

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
      noteColor: this.props.noteColor || "#fff9c4",
      fontColor: this.props.fontColor || "#424242",
      fontSize: this.props.fontSize || 20,
      message: this.props.message || "",
      title: this.props.title || '',
      noteMates: this.props.mates || []
    }
    this.props.setEntireNote(note)
  }

  render() {
    return (
      <div className="col-md-4 d-flex align-items-stretch">
        <div className="card my-3 w-100" style={{ backgroundColor: this.props.noteColor || '#fff9c4', color: this.props.fontColor || '#424242', borderBottomWidth: '1px' }}>
          <div className="card-header">
            <div className="row">
              <div className="col">
                <small className="card-title">Criada por {this.props.owner || 'mim'}</small>
              </div>
              <div className="col">
                <div className="float-right">
                  <If condition={this.props.editable}>
                    <button className="btn btn-sm btn-warning mr-1" onClick={this.callSetEntireNote} data-toggle="modal" data-target="#edit-note-modal"><i className="fas fa-pencil-alt"></i></button>
                    <button className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></button>
                  </If>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="h5 card-title" >{this.props.title || 'Algo de errado não está certo...'}</p>
            <p className="note-message" style={{fontSize: `${this.props.fontSize || '20px'}`}}>{this.props.message || 'Algum erro deve ter ocorrido para você estar vendo isso'}</p>
            <ul className="list-inline">
              {this.renderMates()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  note: state.note
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setEntireNote
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotePreview)