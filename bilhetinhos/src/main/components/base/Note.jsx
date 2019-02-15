import './css/Note.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Note extends Component {

  renderMates = () => {
    let noteMates = this.props.noteMates
    if (noteMates) {
      if (noteMates.length > 0) {
        return noteMates.map((m, i) => {
          return <li key={`marked-mate-${m}-${i}`}
            className="text-muted list-inline-item">
            <small className="text-wrap card-text">{m}</small>
          </li>
        })
      }
    }
    return ''
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card my-3" style={{ backgroundColor: this.props.noteColor || '#fff9c4', color: this.props.fontColor || '#424242', borderBottomWidth: '1px' }}>
          <div className="card-header">
            <button type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body">
            <p className="h5 card-title" >{this.props.title || 'Algo de errado não está certo...'}</p>
            <p className="note-message" >{this.props.message || 'Algum erro deve ter ocorrido para você estar vendo isso'}</p>
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
