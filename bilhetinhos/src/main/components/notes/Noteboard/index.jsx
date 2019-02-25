import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import NotePreview from './NotePreview/'
import { Accordion, AccordionItem } from '../../base/Accordion'
import EditNote from './EditNote'
import RemoveNote from './RemoveNote'
import { setEntireNote } from '../../../redux/actions/editNoteActions'
import Spinner from '../../utils/Spinner'
import If from '../../utils/If'

class Noteboard extends Component {

  markNoteIfQuery = (title) => {
    let params = new URLSearchParams(window.location.search)
    if (params.has('note')) {
      let note = params.get('note')
      let isEqual = title === note
      return isEqual
    }
    return false
  }

  renderNotes = (notes, areEditable = false) => {
    if (notes.length > 0) {
      return notes.map(note => (
        <NotePreview key={note.title} title={note.title} message={note.message}
          noteMates={note.noteMates} fontColor={note.fontColor} noteColor={note.noteColor}
          owner={note.owner || 'mim'} editable={areEditable} fontSize={note.fontSize}
          mark={this.markNoteIfQuery(note.title)} />
      ))
    }
    return ''
  }

  componentDidMount = () => {
    this.markNoteIfQuery()
  }

  onModalClose = () => {
    this.props.setEntireNote({
      noteColor: "#fff9c4",
      fontColor: "#424242",
      fontSize: 20,
      message: "",
      title: '',
      noteMates: []
    })
  }

  shouldOpenEditorForNewNote = () => window.location.search.includes('novo=bilhete')

  render() {
    return (
      <Skeleton>
        <section className="container-fluid">
          <div className="row ">
            <div className="col-10 offset-1">
              <h1 className="h3">Meu quadro</h1>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#edit-note-modal">
                Criar bilhete +
              </button>
              <hr />
              <RemoveNote onClose={this.onModalClose} />
              <Accordion accordionId="notes-accordion">
                <AccordionItem itemId="user-notes" itemLabel="Meus bilhetes" accordionId="notes-accordion" open>

                  <If condition={this.props.isLoadingUserNotes}>
                    <div className="row">
                      <div className="col offset-5">
                        <Spinner extraClasses="py-5 pl-3" />
                      </div>
                    </div>
                  </If>
                  <div className="notes-container row ">
                    {
                      this.props.userNotes.length > 0 ?
                        this.renderNotes(this.props.userNotes, true) :
                        <p className="lead mx-auto">Você não escreveu nenhum bilhete ainda</p>
                    }
                  </div>
                </AccordionItem>
                <AccordionItem itemId="mates-notes" itemLabel="Bilhetes dos colegas" accordionId="notes-accordion" open>
                  <If condition={this.props.isLoadingMatesNotes}>
                    <div className="row">
                      <div className="col offset-5">
                        <Spinner extraClasses="py-5 pl-3" />
                      </div>
                    </div>
                  </If>
                  <div className="notes-container row ">
                    {
                      this.props.matesNotes.length > 0 ?
                        this.renderNotes(this.props.matesNotes) :
                        <p className="lead mx-auto">Nenhum colega colou nada em seu quadro</p>
                    }
                  </div>
                </AccordionItem>
              </Accordion>
              <EditNote onClose={this.onModalClose} onOpen={() => { }} open={this.shouldOpenEditorForNewNote()} />
            </div>
          </div>
        </section>
      </Skeleton>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  mates: state.user.matesUids,
  userNotes: state.notes.userNotes,
  matesNotes: state.notes.matesNotes,
  isLoadingUserNotes: state.notes.isLoadingUserNotes,
  isLoadingMatesNotes: state.notes.isLoadingMatesNotes
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setEntireNote
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Noteboard)
