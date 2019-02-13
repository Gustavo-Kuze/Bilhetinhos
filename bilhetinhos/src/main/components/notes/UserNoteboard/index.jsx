import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import { getUserNotes, getMateNotes } from '../../../api/notes'


class UserNoteboard extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    // getUserNotes(this.props.uid).on('value', (snapshot) => {
    //     snapshot.forEach(c => console.log(c.val()))
    // })
    // getMateNotes(this.props.uid, 'kDG1kYSQ4eQ48wbJuUqUMxENWzD2').then(notes => {
    //   this.setState({...this.state, notes: notes.map(n => n.val())})
    // })
  }

  render() {
    return (
      <Skeleton>
        <section className="container-fluid">
          <div className="row ">
            <div className="col-10 offset-1">
              <h1 className="h3">Meu quadro</h1>
              <ul>
                {this.state.notes.map(n => (
                  <li key={n.title || ""}>{n.title || ''}</li>
                ))}
              </ul>
              <div className="card">
                <div className="card-body">
                  <p className="h5 card-title">Teste de nota</p>
                  <p className="note-message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dicta, veritatis cum dolore commodi reprehenderit, officia laudantium eaque, suscipit optio facilis quo consectetur? Illum, saepe? Odio omnis amet pariatur nisi.</p>
                  <ul className="list-inline">
                    <li className="text-muted list-inline-item"><small>cachorro@gmail.com</small></li>
                    <li className="text-muted list-inline-item"><small>gato@gmail.com</small></li>
                    <li className="text-muted list-inline-item"><small>teste@gmail.com</small></li>
                  </ul>
                </div>
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
