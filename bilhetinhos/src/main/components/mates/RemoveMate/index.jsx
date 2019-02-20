import React from 'react'
import {removeMate} from '../../../api/users'
import Modal from '../../base/Modal'

const RemoveMate = props => {
  return (
    <Modal modalId="remove-mate-modal" title="Tem certeza disso!?" onClose={props.onClose}>
        <h4 className="text-danger">ATENÇÃO!</h4>
        <p>Você está prestes a excluir o colega {`"${props.name || props.email || 'NOME DO COLEGA'}"`}. Esta ação <span className="text-danger">NÃO PODE</span> ser desfeita. Deseja mesmo prosseguir?</p>
        <button className="btn btn-secondary" onClick={() => {
            removeMate(props.uid, props.mateUid)
        }} data-toggle="modal" data-target="#remove-mate-modal">Sim, desejo remover</button>
        <button className="btn btn-primary" data-toggle="modal" data-target="#remove-mate-modal">Cancelar</button>
    </Modal>
  )
}

export default RemoveMate

