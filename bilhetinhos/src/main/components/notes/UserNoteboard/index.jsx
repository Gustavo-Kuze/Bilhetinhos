import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import { getUserNotes, getMateNotes } from '../../../api/notes'
import { getUserEmailByUid, getUserUidByEmail } from '../../../api/users'
import Note from '../../base/Note'

class UserNoteboard extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    // let userNotes = []
    // getUserNotes(this.props.uid).on('value', (snapshot) => {
    //     snapshot.forEach(note => {
    //       userNotes.push(note.val())
    //     })
    //     this.setState({notes: userNotes})
    // })

    // getMateNotes(this.props.uid, 'kDG1kYSQ4eQ48wbJuUqUMxENWzD2').then(notes => {
    //   this.setState({...this.state, notes: notes.map(n => n.val())})
    // })

    // getUserEmailByUid('BZ08IivJf3M9PMBCEY8STJ2k6RE3').then(email => {
    //   console.log(email)
    // })

    getUserUidByEmail('ravenatitann@gmail.com').then(uid => {
      console.log(uid)
    })
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
                {this.state.notes.map(n => (
                  <Note
                    key={n.title}
                    title={n.title}
                    message={n.message}
                    noteMates={n.noteMates}
                    fontColor={n.fontColor}
                    noteColor={n.noteColor}
                  />
                ))}
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
