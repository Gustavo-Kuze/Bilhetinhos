import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import { getUserNotesRef, getMateNotesByUid } from '../../../api/notes'
import { getUsersEmailsByUid, getMates } from '../../../api/users'
import Note from '../../base/Note'
import { Accordion, AccordionItem } from '../../base/Accordion'

class UserNoteboard extends Component {
  state = {
    userNotes: [],
    matesNotes: []
  }

  loadUserNotes = async () => {
    let userNotes = []

    getUserNotesRef(this.props.uid).on('value', async (notesSnapshot) => {
      notesSnapshot.forEach(note => {
        userNotes.push(note.val())
      })

      userNotes = await userNotes.map(async userNote => {
        let note = userNote
        if (note.noteMates) {
          let noteMatesEmails = await getUsersEmailsByUid(note.noteMates)
          note.noteMates = noteMatesEmails
        }
        return note
      })

      Promise.all(userNotes).then((nts) => {
        this.setState({ ...this.state, userNotes: nts })
      })
    })

  }

  loadMatesNotes = async () => {
    let allMatesNotes = []
    allMatesNotes = await Promise.all(this.props.mates.map(async mate => {
      let mateNotes = await getMateNotesByUid(this.props.uid, mate)
      return allMatesNotes.concat(mateNotes)
    }))
    allMatesNotes = allMatesNotes.filter(note => note.length > 0)
    allMatesNotes = allMatesNotes.reduce((prev, cur) => prev.concat(cur))
    this.setState({ ...this.state, matesNotes: allMatesNotes })
    return allMatesNotes
  }

  componentDidMount = async () => {
    this.loadUserNotes()
    this.loadMatesNotes()
  }

  renderNotes = (notes) => {
    if (notes.length > 0) {
      
      return notes.map(note => (
        <Note
          key={note.title}
          title={note.title}
          message={note.message}
          noteMates={note.noteMates}
          fontColor={note.fontColor}
          noteColor={note.noteColor}
        />
      ))
    }
    return ''
  }

  render() {
    return (
      <Skeleton>
        <section className="container-fluid">
          <div className="row ">
            <div className="col-10 offset-1">
              <h1 className="h3">Meu quadro</h1>
              <Accordion accordionId="notes-accordion">
                <AccordionItem itemId="user-notes" itemLabel="Minhas notas" accordionId="notes-accordion" open>
                  <div className="notes-container row ">
                    {this.state.userNotes ? this.renderNotes(this.state.userNotes) : ''}
                  </div>
                </AccordionItem>
                <AccordionItem itemId="mates-notes" itemLabel="Notas dos meus colegas" accordionId="notes-accordion">
                  <div className="notes-container row ">
                    {this.state.matesNotes ? this.renderNotes(this.state.matesNotes) : ''}
                  </div>
                </AccordionItem>
              </Accordion>

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

export default connect(mapStateToProps)(UserNoteboard)
