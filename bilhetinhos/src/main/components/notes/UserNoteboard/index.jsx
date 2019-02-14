import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import { getUserNotes, getMateNotes } from '../../../api/notes'
import { getUserEmailByUid, getUsersEmailsByUid } from '../../../api/users'
import Note from '../../base/Note'

class UserNoteboard extends Component {
  state = {
    notes: []
  }

  componentDidMount = async () => {
    let userNotes = []

    getUserNotes(this.props.uid).on('value', async (notesSnapshot) => {
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
        console.log(nts)
        this.setState({ notes: nts })
      })
    })

  }

  renderNotes = () => {
    if (this.state.notes) {
      if (this.state.notes.length > 0) {
        return this.state.notes.map(n => (
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
    console.log('deu ruim')
    return ''
  }

  render() {
    return (
      <Skeleton>
        <section className="container-fluid">
          <div className="row ">
            <div className="col-10 offset-1">
              <h1 className="h3">Meu quadro</h1>
              {/* <ul>
                {this.state.notes.map(n => (
                  <li key={n.title || ""}>{n.title || ''}</li>
                ))}
              </ul> */}
              <div className="notes-container row ">
                {this.renderNotes()}
              </div>
            </div>
          </div>
        </section>
      </Skeleton>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid
})

export default connect(mapStateToProps)(UserNoteboard)
