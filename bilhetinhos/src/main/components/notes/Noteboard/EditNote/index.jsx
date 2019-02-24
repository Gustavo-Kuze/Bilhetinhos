import '../css/Note.css'
import '../../../base/css/materialCheckbox2.css'
import React, { Component } from "react"
import ColorPicker from "../ColorPicker/"
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
} from '../../../../redux/actions/editNoteActions'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr, { toastr } from 'react-redux-toastr'
import { sendUserNotification } from '../../../../api/notifications'

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

  notifyMates = async (mates) => {
    if (mates) {
      mates.forEach(async mateUid => {
        await sendUserNotification(mateUid, {
          title: 'Um colega colou uma nota em seu quadro',
          receivedDate: Date.now(),
          description: `Clique para ver`,
          sender: 'Bilhetes',
          read: false,
          href: `/quadro?note=${encodeURIComponent(this.props.title)}`
        })
        console.log(`Colega ${mateUid} notificado`)
      })
    }else{
      console.log('não haviam colegas para serem notificados')
    }
    return
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
    }).then(async () => {
      toastr.success("Sucesso!", "Seu bilhete foi publicado")
      await this.notifyMates(this.props.noteMates)
    })

    return false
  }

  componentDidMount = async () => {
    if (this.props.matesUids) {
      let matesUids = this.props.matesUids
      let matesEmailsAndUidsPromise = await getUsersEmailsByUid(matesUids)
      let matesEmailsAndUids = await Promise.all(matesEmailsAndUidsPromise)
      this.setState({
        ...this.state, matesEmailsAndUids
      })
    }

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
          open={this.props.open}
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
                    <input className="custom-range" type="range" min="20" max="40" value={this.props.fontSize} onChange={this.props.handleFontSizeChanged} />
                  </AccordionItem>
                  <AccordionItem itemId="mates-list" itemLabel="Colar bilhete no quadro destes colegas" accordionId="note-options-accordion">
                    {this.state.matesEmailsAndUids.map((m, i) => (
                      <div key={this.props.matesUids[i]} className="form-check paper-toggle">
                        <label className="form-check-label pure-material-checkbox d-flex align-items-center" htmlFor={`chk-${this.props.matesUids[i]}`}>
                          <input className="form-check-input switch material-checkbox" id={`chk-${this.props.matesUids[i]}`} type="checkbox" value={this.props.matesUids[i]} onClick={() => this.props.refreshNoteMates(this.getCheckedMateBoxesValues())} />
                          <span className="">{m}</span>
                        </label>
                      </div>
                    ))}
                    <If condition={!this.props.matesUids || this.props.matesUids.length === 0}>
                      <p className="text-muted">Você não tem nenhum colega</p>
                    </If>
                  </AccordionItem>
                </Accordion>
                <input className="my-3 form-control" type="text" name="note-title" placeholder="O título do bilhete vai aqui" value={this.props.title} onChange={this.props.handleTitleChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor }} />
                <textarea id="ta-note-message" className="form-control note-message" placeholder="Digite sua mensagem aqui!" name="note-message" rows="10" value={this.props.message} onChange={this.props.handleMessageChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor, fontSize: this.props.fontSize }}></textarea>
                <button className="btn btn-primary btn-lg mt-3" >Criar</button>
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
  noteColor: state.editNote.noteColor,
  fontColor: state.editNote.fontColor,
  fontSize: state.editNote.fontSize,
  message: state.editNote.message,
  title: state.editNote.title,
  noteMates: state.editNote.noteMates,
  uid: state.user.uid,
  matesUids: state.user.matesUids
})

const mapDispatchToProps = dispatch => bindActionCreators({
  handleFontColorChanged, handleFontSizeChanged, handleMessageChanged,
  handleNoteColorChanged, handleTitleChanged, refreshNoteMates, createNote
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)
