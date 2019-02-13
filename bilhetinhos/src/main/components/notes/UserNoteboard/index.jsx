import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import {getUserNotes, getMateNotes} from '../../../api/notes'


class UserNoteboard extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    // getUserNotes(this.props.uid).on('value', (snapshot) => {
    //     snapshot.forEach(c => console.log(c.val()))
    // })
    getMateNotes(this.props.uid, 'kDG1kYSQ4eQ48wbJuUqUMxENWzD2').then(notes => {
      console.log(notes)
    })
  }

  render() {
    return (
      <Skeleton>
        <section className="container-fluid">
          <div className="row ">
            <div className="col-10 offset-1">
              <h1>Meu quadro</h1>
              <ul>
                {this.state.notes.map(n => (
                  <li key={n.title || ""}>n.title || ''</li>
                ))}
              </ul>
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
