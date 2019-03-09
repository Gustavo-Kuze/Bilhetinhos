import React, { Component } from 'react'
import { removeNote } from '../../../../api/notes'
import { connect } from 'react-redux'
import Modal from '../../../base/Modal'
import { Translate } from 'react-translated'

var noteTitle = ''

class RemoveNote extends Component {

  state = {
    uid: '',
    noteTitle: ''
  }

  callRemoveNote = () => {
    removeNote(this.state.uid, this.state.noteTitle)
  }

  componentDidUpdate = () => {
    if (noteTitle && noteTitle !== this.state.noteTitle) {
      this.setState({ ...this.state, noteTitle: noteTitle })
    }
  }

  static getDerivedStateFromProps(props){
    noteTitle = props.noteTitle
    return props.noteTitle
  }

  componentDidMount = () => {
    this.setState({ ...this.state, uid: this.props.uid })
  }
  
  render() {
    return (
      <Modal modalId="remove-note-modal"  title={<Translate text="warning-modal-title"/>} onClose={this.props.onClose}>
        <h4 className="text-danger"><Translate text="warning-modal-subtitle"/></h4>
        <p><Translate text="remove-note-modal-question" data={{noteTitle: `"${this.props.noteTitle || 'NOME DO BILHETE'}"`}}/></p>
        <button className="btn btn-secondary mr-1" onClick={() => this.callRemoveNote()} data-toggle="modal" data-target="#remove-note-modal"><Translate text="warning-modal-btn-yes"/></button>
        <button className="btn btn-primary" data-toggle="modal" data-target="#remove-note-modal"><Translate text="warning-modal-btn-cancel"/></button>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  noteTitle: state.editNote.title
})

export default connect(mapStateToProps)(RemoveNote)