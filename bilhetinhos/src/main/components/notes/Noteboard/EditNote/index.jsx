import '../css/Note.css'
import '../../../base/css/materialCheckbox.css'
import React, { Component } from "react"
import ColorPicker from "../../../utils/ColorPicker"
import { backgroundColors, fontColors } from '../../../base/js/MaterialColors'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import If from '../../../utils/If'
import { Accordion, AccordionItem } from '../../../base/Accordion.jsx'
import { setNote } from '../../../../api/notes'
import { getUsersEmailsByUid } from '../../../../api/users'
import Modal from '../../../base/Modal'
import {
  handleFontColorChanged, handleFontSizeChanged, handleMessageChanged,
  handleNoteColorChanged, handleTitleChanged, refreshNoteMates, createNote
} from '../../../../redux/actions/noteActions'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr, { toastr } from 'react-redux-toastr'


export class EditNote extends Component {
  state = {
    shouldRenderChildren: false,
    matesEmailsAndUids: []
  }

  extractUsernameFromEmail = email => {
    return email.match(/([^@]+)/)[0]
  }

  getCheckedMateBoxes = () => {
    return Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
  }

  getCheckedMateBoxesValues = () => {
    return this.getCheckedMateBoxes().map(c => c.value)
  }

  callCreate = element => {
    element.preventDefault()

    setNote(this.props.uid, {
      title: this.props.title,
      message: this.props.message,
      noteColor: this.props.noteColor,
      fontColor: this.props.fontColor,
      fontSize: this.props.fontSize,
      noteMates: this.props.noteMates
    }).then(() => {
      toastr.success("Sucesso!", "Seu bilhete foi publicado")
    })

    return false
  }

  componentDidMount = async () => {
    let matesEmailsAndUidsPromise = await getUsersEmailsByUid(this.props.mates)
    let matesEmailsAndUids = await Promise.all(matesEmailsAndUidsPromise)
    this.setState({
      ...this.state, matesEmailsAndUids
    })
  }

  onOpen = () => {
    this.setState({ ...this.state, shouldRenderChildren: true }, () => {
      this.props.onOpen()
    })
  }

  onClose = () => {
    this.setState({ ...this.state, shouldRenderChildren: false }, () => {
      this.props.onClose()
    })
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          modalId="edit-note-modal"
          title="Personalize seu bilhete"
          onClose={this.onClose}
          onOpen={this.onOpen}
        >

          <If condition={this.state.shouldRenderChildren}>

            <form onSubmit={this.callCreate}>
              <div className="form-group ">
                <Accordion accordionId="note-options-accordion">
                  <AccordionItem itemId="note-color" itemLabel="Cor do bilhete" accordionId="note-options-accordion">
                    <ColorPicker name="note-color" colors={backgroundColors} isNoteColorPicker={true} />
                  </AccordionItem>
                  <AccordionItem itemId="font-color" itemLabel="Cor da fonte" accordionId="note-options-accordion">
                    <ColorPicker name="font-color" colors={fontColors} isNoteColorPicker={false} />
                  </AccordionItem>
                  <AccordionItem itemId="font-size" itemLabel="Tamanho da fonte" accordionId="note-options-accordion">
                    <p>{this.props.fontSize}</p>
                    <input className="custom-range" type="range" min="20" max="40" value={this.props.fontSize} />
                  </AccordionItem>
                  <AccordionItem itemId="mates-list" itemLabel="Colar bilhete no quadro destes colegas" accordionId="note-options-accordion">
                    {this.state.matesEmailsAndUids.map((m, i) => (
                      <div key={this.props.mates[i]} className="form-check paper-toggle">
                        <label className="form-check-label pure-material-checkbox" htmlFor={`chk-${this.props.mates[i]}`}>
                          <input className="form-check-input switch" id={`chk-${this.props.mates[i]}`} type="checkbox" value={this.props.mates[i]} onClick={() => this.props.refreshNoteMates(this.getCheckedMateBoxesValues())} />
                          <span>{m}</span>
                        </label>
                      </div>
                    ))}
                    <If condition={!this.props.mates || this.props.mates.length === 0}>
                      <p className="text-muted">Você não tem nenhum colega</p>
                    </If>
                  </AccordionItem>
                </Accordion>
                <input className="my-3 form-control" type="text" name="note-title" placeholder="O título do bilhete vai aqui" value={this.props.title} onChange={this.props.handleTitleChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor }} />
                <textarea id="ta-note-message" className="form-control note-message" placeholder="Digite sua mensagem aqui!" name="note-message" rows="10" value={this.props.message} onChange={this.props.handleMessageChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor, fontSize: this.props.fontSize }}></textarea>
                <button className="btn btn-primary btn-lg mt-3" data-toggle="modal" data-target="#edit-note-modal">Criar</button>
              </div>
            </form>
          </If>

        </Modal>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  noteColor: state.note.noteColor,
  fontColor: state.note.fontColor,
  fontSize: state.note.fontSize,
  message: state.note.message,
  title: state.note.title,
  uid: state.user.uid,
  mates: state.user.mates,
  noteMates: state.note.noteMates
})

const mapDispatchToProps = dispatch => bindActionCreators({
  handleFontColorChanged, handleFontSizeChanged, handleMessageChanged,
  handleNoteColorChanged, handleTitleChanged, refreshNoteMates, createNote
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)
