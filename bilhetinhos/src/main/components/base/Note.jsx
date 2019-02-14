import './css/Note.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Note extends Component {

  render() {
    return (
      <div className="col-md-4">
        <div className="card my-3" style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor }}>
          <div className="card-header">
            <button type="button" className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-body">
            <p className="h5 card-title" >{this.props.title}</p>
            <p className="note-message" >{this.props.message}</p>
            <ul className="list-inline">
              {this.props.noteMates.map((m, i) => {
                return <li key={`marked-mate-${m}-${i}`} className="text-muted list-inline-item"><small className="text-wrap card-text">{m}</small></li>
              })}
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
