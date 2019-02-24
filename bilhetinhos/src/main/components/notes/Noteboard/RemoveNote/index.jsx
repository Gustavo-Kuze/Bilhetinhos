import React from 'react'
import { removeNote } from '../../../../api/notes'
import { connect } from 'react-redux'
import Modal from '../../../base/Modal'

const RemoveNote = props => {
  function callRemove() {
      let uid = props.uid
      let noteTitle = props.noteTitle
      debugger
      removeNote(props.uid, props.noteTitle)
  }
  return (
    <Modal modalId="remove-note-modal" title="Tem certeza disso!?" onClose={props.onClose}>
      <h4 className="text-danger">ATENÇÃO!</h4>
      <p>Você está prestes a excluir o bilhete {`"${props.noteTitle || 'NOME DO BILHETE'}"`}. Esta ação <span className="text-danger">NÃO PODE</span> ser desfeita. Deseja mesmo prosseguir?</p>
      <button className="btn btn-secondary" onClick={callRemove} data-toggle="modal" data-target="#remove-note-modal">Sim, desejo excluir</button>
      <button className="btn btn-primary" data-toggle="modal" data-target="#remove-note-modal">Cancelar</button>
    </Modal>
  )
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  noteTitle: state.editNote.title
})

export default connect(mapStateToProps)(RemoveNote)

