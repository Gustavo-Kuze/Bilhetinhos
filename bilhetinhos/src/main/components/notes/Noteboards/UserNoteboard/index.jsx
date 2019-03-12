import React, { Component } from "react"
import Skeleton from "../../../base/Skeleton/Skeleton"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import EditNote from '../EditNote'
import RemoveNote from '../RemoveNote'
import { setEntireNote } from '../../../../redux/actions/editNoteActions'
import { Translate } from 'react-translated'
import NoteboardContainer from '../Noteboard/NoteboardContainer'
import NoteboardSection from '../Noteboard/NoteboardSection'

class Noteboard extends Component {

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
              <h1 className="h3"><Translate text="noteboard-header-label" /></h1>
              <button type="button" className="btn btn-link text-decoration-none btn-lg" data-toggle="modal" data-target="#edit-note-modal">
                <Translate text="noteboard-btn-new-note" />
              </button>
              <hr />
              <RemoveNote onClose={this.onModalClose} />
              <NoteboardContainer containerId="notes-accordion">
                <NoteboardSection
                  sectionId="user-notes"
                  containerId="notes-accordion"
                  sectionTitle={window.translate({ text: "noteboard-accordion-my-notes-label" })}
                  isLoading={this.props.isLoadingUserNotes}
                  notes={this.props.userNotes}
                  areNotesEditable={true}
                  emptyLabel={window.translate({ text: "noteboard-my-notes-no-note" })}
                />
                <NoteboardSection
                  sectionId="mates-notes"
                  containerId="notes-accordion"
                  sectionTitle={window.translate({ text: "noteboard-accordion-mates-notes-label" })}
                  isLoading={this.props.isLoadingMatesNotes}
                  notes={this.props.matesNotes}
                  areNotesEditable={false}
                  emptyLabel={window.translate({ text: "noteboard-mates-notes-no-note" })}
                />
              </NoteboardContainer>
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
  email: state.user.email,
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