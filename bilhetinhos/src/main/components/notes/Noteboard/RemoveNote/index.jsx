import React, { Component } from 'react'
import { removeNote } from '../../../../api/notes'
import { connect } from 'react-redux'
import Modal from '../../../base/Modal'

class RemoveNote extends Component {

  state = {
    uid: '',
    noteTitle: ''
  }

  callRemoveNote = () => {
    removeNote(this.state.uid, this.state.noteTitle)
  }

  componentDidUpdate = () => {
    if (this.props.noteTitle && !this.state.noteTitle) {
      this.setState({ ...this.state, noteTitle: this.props.noteTitle })
    }
  }

  componentDidMount = () => {
    this.setState({ ...this.state, uid: this.props.uid })
  }

  render() {
    return (
      <Modal modalId="remove-note-modal" title="Tem certeza disso!?" onClose={this.props.onClose}>
        <h4 className="text-danger">ATENÇÃO!</h4>
        <p>Você está prestes a excluir o bilhete {`"${this.state.noteTitle || 'NOME DO BILHETE'}"`}. Esta ação <span className="text-danger">NÃO PODE</span> ser desfeita. Deseja mesmo prosseguir?</p>
        <button className="btn btn-secondary" onClick={() => this.callRemoveNote()} data-toggle="modal" data-target="#remove-note-modal">Sim, desejo excluir</button>
        <button className="btn btn-primary" data-toggle="modal" data-target="#remove-note-modal">Cancelar</button>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  noteTitle: state.editNote.title
})

export default connect(mapStateToProps)(RemoveNote)

