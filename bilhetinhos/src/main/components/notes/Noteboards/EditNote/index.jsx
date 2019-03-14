import '../css/Note.css'
import '../../../base/css/materialCheckbox2.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import React, { Component } from "react"
import ColorPicker from "../ColorPicker/"
import { backgroundColors, fontColors } from '../../../base/js/MaterialColors'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import If from '../../../utils/If'
import { Accordion, AccordionItem } from '../../../base/Accordion.jsx'
import { setNote } from '../../../../api/notes'
import { getUsersEmailsByUid, getUserEmailByUid } from '../../../../api/users'
import Modal from '../../../base/Modal'
import ReduxToastr, { toastr } from 'react-redux-toastr'
import { sendUserNotification } from '../../../../api/notifications'
import { areMates } from '../../../../api/mates'
import {
  handleFontColorChanged, handleFontSizeChanged, handleMessageChanged,
  handleNoteColorChanged, handleTitleChanged, refreshNoteMates, createNote
} from '../../../../redux/actions/editNoteActions'

var defaultChecked = []
var shouldVerifyForDefaultChecked = true

export class EditNote extends Component {
  state = {
    shouldRenderChildren: false,
    matesEmailsAndUids: [],
    matesCheckboxes: []
  }

  getCheckedMateBoxes = () => {
    return Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
  }

  getCheckedMateBoxesValues = () => {
    return this.getCheckedMateBoxes().map(c => c.value)
  }

  notifyMates = async (mates) => {
    if (mates) {
      let userEmail = await getUserEmailByUid(this.props.uid)
      mates.forEach(async mateUid => {
        await sendUserNotification(mateUid, {
          title: 'editnote-notify-users-title',
          receivedDate: Date.now(),
          description: 'editnote-notify-users-description',
          sender: `${userEmail}`,
          read: false,
          href: `/noteboard?note=${encodeURIComponent(this.props.title)}`
        })
      })
    } else {
      console.log('there were no mates to be notified')
    }
    return
  }

  callCreate = element => {
    element.preventDefault()
    if (this.props.uid && this.props.title && this.props.message) {
      setNote(this.props.uid, {
        title: this.props.title,
        message: this.props.message,
        noteColor: this.props.noteColor,
        fontColor: this.props.fontColor,
        fontSize: this.props.fontSize,
        noteMates: this.props.noteMates
      }).then(async () => {
        toastr.success(window.translate({ text: 'toastr-success-title' }), window.translate({ text: 'editnote-published' }))
        await this.notifyMates(this.props.noteMates)
      })
    } else {
      toastr.warning(window.translate({ text: 'toastr-attention-title' }), window.translate({ text: 'editnote-error-empty-inputs' }))
    }
    return false
  }

  onOpen = () => {
    this.setState({ ...this.state, shouldRenderChildren: true, matesCheckboxes: [] }, () => {
      this.props.onOpen()
    })
  }

  onClose = () => {
    this.setState({ ...this.state, shouldRenderChildren: false }, () => {
      this.props.onClose()
    })
    shouldVerifyForDefaultChecked = true
    defaultChecked = []
    this.props.refreshNoteMates(defaultChecked)
  }

  pushToDefaultChecked = mateUid => {
    defaultChecked.push(mateUid)
    return ''
  }

  pushToDefaultCheckedIfIncluded = (mateEmail, mateUid) => {
    if (typeof this.props.noteMates === typeof []) {
      let includes = this.props.noteMates.includes(mateEmail)
      if (includes)
        return this.pushToDefaultChecked(mateUid)
    }
    return ''
  }

  componentDidUpdate = async () => {
    if (this.state.matesCheckboxes.length === 0 && this.state.matesEmailsAndUids.length > 0) {
      await this.renderMatesCheckboxes()
      await this.props.refreshNoteMates(defaultChecked)
    }
    if (shouldVerifyForDefaultChecked) {
      this.visuallyCheckDefault()
    }
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

  visuallyCheckDefault = () => {
    let didCheckOnOpen = false
    if (this.props.noteMates) {
      this.props.noteMates.map((m, i) => {
        let elem = document.getElementById(`chk-${m}`)
        if (elem) {
          elem.setAttribute('checked', true)
          didCheckOnOpen = true
        }
      })
      if (didCheckOnOpen)
        shouldVerifyForDefaultChecked = false
    }
  }

  renderMatesCheckboxes = async () => {
    let checkboxes = await Promise.all(this.state.matesEmailsAndUids.map(async (m, i) => {
      let areUsersMates = await areMates(this.props.uid, this.props.matesUids[i])
      if (areUsersMates) {
        return <div key={this.props.matesUids[i]} className="form-check paper-toggle">
          <label className="form-check-label pure-material-checkbox d-flex align-items-center" htmlFor={`chk-${this.props.matesUids[i]}`}>
            <input className="form-check-input switch material-checkbox"
              id={`chk-${this.props.matesUids[i]}`}
              type="checkbox"
              value={this.props.matesUids[i]}
              onClick={() => this.props.refreshNoteMates(this.getCheckedMateBoxesValues())}
            />
            <span className="">{m}</span>
          </label>
          {this.pushToDefaultCheckedIfIncluded(m, this.props.matesUids[i])}
        </div>
      }
    }))
    checkboxes = checkboxes.filter(chk => chk)
    this.setState({ ...this.state, matesCheckboxes: checkboxes })
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          modalId="edit-note-modal"
          title={window.translate({ text: 'editnote-title' })}
          onClose={this.onClose}
          onOpen={this.onOpen}
          open={this.props.open}
        >
          <If condition={this.state.shouldRenderChildren}>
            <form onSubmit={this.callCreate}>
              <div className="form-group ">
                <Accordion accordionId="note-options-accordion">
                  <AccordionItem itemId="note-color" itemLabel={window.translate({ text: 'editnote-accordion-item-notecolor-label' })} accordionId="note-options-accordion">
                    <ColorPicker name="note-color" colors={backgroundColors} isNoteColorPicker={true} />
                  </AccordionItem>
                  <AccordionItem itemId="font-color" itemLabel={window.translate({ text: 'editnote-accordion-item-fontcolor-label' })} accordionId="note-options-accordion">
                    <ColorPicker name="font-color" colors={fontColors} isNoteColorPicker={false} />
                  </AccordionItem>
                  <AccordionItem itemId="font-size" itemLabel={window.translate({ text: 'editnote-accordion-item-fontsize-label' })} accordionId="note-options-accordion">
                    <p>{this.props.fontSize}</p>
                    <input className="custom-range" type="range" min="20" max="40" value={this.props.fontSize} onChange={this.props.handleFontSizeChanged} />
                  </AccordionItem>
                  <AccordionItem itemId="mates-list" itemLabel={window.translate({ text: 'editnote-accordion-item-mates-label' })} accordionId="note-options-accordion">
                    {this.state.matesCheckboxes.length > 0 ? this.state.matesCheckboxes : window.translate({ text: 'editnote-you-have-no-mates' })}
                  </AccordionItem>
                </Accordion>
                <input className="my-3 form-control" type="text" name="note-title" placeholder={window.translate({ text: 'editnote-notetitle-placeholder' })} value={this.props.title} onChange={this.props.handleTitleChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor }} />
                <textarea id="ta-note-message" className="form-control note-message" placeholder={window.translate({ text: 'editnote-message-placeholder' })} name="note-message" rows="10" value={this.props.message} onChange={this.props.handleMessageChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor, fontSize: this.props.fontSize }}></textarea>
                <button className="btn btn-primary btn-lg mt-3" >{window.translate({ text: 'editnote-btn-create' })}</button>
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