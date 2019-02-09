import React, { Component } from "react"
import Skeleton from "../../base/Skeleton"
import { connect } from "react-redux"
import {getNotes} from '../../../api/notes'


class UserNoteboard extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    getNotes(this.props.uid).on('value', (snapshot) => {
        snapshot.forEach(c => console.log(c.val()))
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
