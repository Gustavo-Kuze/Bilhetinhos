import React from 'react'
import Modal from '../../base/Modal'
import { Translate } from 'react-translated'

const RemoveMate = props => {
  const translatedTitle = () => <Translate text="warning-modal-title" />
  return (
    <Modal modalId="remove-mate-modal" title={translatedTitle()} onClose={props.onClose}>
      <h4 className="text-danger"><Translate text="warning-modal-subtitle" /></h4>
      <p><Translate text="remove-mate-modal-question" data={{ mateNameOrEmail: `"${props.name || props.email || 'NOME DO COLEGA'}"` }} /></p>
      <button className="btn btn-secondary mr-1" onClick={() => props.removeMate(props.uid, props.mateUid)} data-toggle="modal" data-target="#remove-mate-modal"><Translate text="warning-modal-btn-yes" /></button>
      <button className="btn btn-primary" data-toggle="modal" data-target="#remove-mate-modal"><Translate text="warning-modal-btn-cancel" /></button>
    </Modal>
  )
}

export default RemoveMate