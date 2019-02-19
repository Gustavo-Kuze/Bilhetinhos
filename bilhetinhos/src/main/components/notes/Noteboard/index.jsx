import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { getUserNotesRef, getMateNotesByUid } from '../../../api/notes'
import { getUsersEmailsByUid, getUserEmailByUid } from '../../../api/users'
import NotePreview from './NotePreview/'
import { Accordion, AccordionItem } from '../../base/Accordion'
import EditNote from './EditNote'
import RemoveNote from './RemoveNote'
import { setEntireNote } from '../../../redux/actions/noteActions'

class Noteboard extends Component {
  state = {
    userNotes: [],
    matesNotes: []
  }

  getNoteWithMatesEmails = async (note) => {
    if (note.noteMates) {
      let noteMatesEmails = await getUsersEmailsByUid(note.noteMates)
      note.noteMates = noteMatesEmails
    }
    return note
  }

  generateMateNotesWithOwnerEmail = async (mate, mateNotes) => {
    return Promise.all(mateNotes.map(async mateNote => {
      let mateEmail = await getUserEmailByUid(mate)
      let note = await this.getNoteWithMatesEmails(mateNote)
      note = { ...note, owner: mateEmail }
      return note
    }))
  }

  generateMatesNotes = async () => {
    let matesNotes = []
    return Promise.all(this.props.mates.map(async mate => {
      let mateNotes = await getMateNotesByUid(this.props.uid, mate)
      mateNotes = await this.generateMateNotesWithOwnerEmail(mate, mateNotes)
      return matesNotes.concat(mateNotes)
    }))
  }

  loadUserNotes = async () => {
    getUserNotesRef(this.props.uid).on('value', async (notesSnapshot) => {
      let notes = []
      notesSnapshot.forEach(note => {
        notes.push(note.val())
      })
      notes = await notes.map(async userNote => await this.getNoteWithMatesEmails(userNote))
      Promise.all(notes).then((userNotes) => {
        this.setState({ userNotes })
      })
    })
  }

  loadMatesNotes = async () => {
    let matesNotes = await this.generateMatesNotes()
    matesNotes = matesNotes.filter(note => note.length > 0)
    if (matesNotes.length > 0) {
      matesNotes = matesNotes.reduce((prev, cur) => prev.concat(cur))
      this.setState({ ...this.state, matesNotes })
    }
    return matesNotes
  }

  renderNotes = (notes, areEditable = false) => {
    if (notes.length > 0) {
      return notes.map(note => (
        <NotePreview key={note.title} title={note.title} message={note.message}
          noteMates={note.noteMates} fontColor={note.fontColor} noteColor={note.noteColor}
          owner={note.owner || 'mim'} editable={areEditable} fontSize={note.fontSize} />
      ))
    }
    return ''
  }

  componentDidUpdate = async () => {
    if (!this.state.userNotes) {
      debugger
      await this.loadUserNotes()
    }
  }

  componentDidMount = async () => {
    this.loadUserNotes()
    this.loadMatesNotes()
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
 
  onModalOpen = () => {
    // this.props.setEntireNote({
    //   noteColor: "#fff9c4",
    //   fontColor: "#424242",
    //   fontSize: 20,
    //   message: "",
    //   title: '',
    //   noteMates: []
    // })
  }

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
              <RemoveNote onClose={this.onModalClose} />
              <Accordion accordionId="notes-accordion">
                <AccordionItem itemId="user-notes" itemLabel="Minhas notas" accordionId="notes-accordion" open>
                  <div className="notes-container row ">
                    {this.state.userNotes ? this.renderNotes(this.state.userNotes, true) : ''}
                  </div>
                </AccordionItem>
                <AccordionItem itemId="mates-notes" itemLabel="Notas dos colegas" accordionId="notes-accordion" open>
                  <div className="notes-container row ">
                    {this.state.matesNotes ? this.renderNotes(this.state.matesNotes) : ''}
                  </div>
                </AccordionItem>
              </Accordion>
              <EditNote onClose={this.onModalClose} onOpen={this.onModalOpen} loadUserNotes={() => { this.setState({ userNotes: false }) }} />
            </div>
          </div>
        </section>
      </Skeleton>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  mates: state.user.mates
})
const mapDispatchToProps = dispatch => bindActionCreators({
  setEntireNote
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Noteboard)
