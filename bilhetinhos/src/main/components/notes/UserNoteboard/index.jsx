import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import { getUserNotesRef, getMateNotesByUid } from '../../../api/notes'
import { getUsersEmailsByUid, getMates } from '../../../api/users'
import Note from '../../base/Note'
import { Accordion, AccordionItem } from '../../base/Accordion'

class UserNoteboard extends Component {
  state = {
    userNotes: []
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
        this.setState({ userNotes: nts })
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
    return allMatesNotes
  }

  componentDidMount = async () => {
    // this.loadUserNotes()
    this.loadMatesNotes()
  }

  renderNotes = () => {
    if (this.state.userNotes) {
      if (this.state.userNotes.length > 0) {
        return this.state.userNotes.map(n => (
          <Note
            key={n.title}
            title={n.title}
            message={n.message}
            noteMates={n.noteMates}
            fontColor={n.fontColor}
            noteColor={n.noteColor}
          />
        ))
      }
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
                    {this.renderNotes()}
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
