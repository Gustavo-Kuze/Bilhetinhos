import './css/Note.css'
import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import ColorPicker from "../../utils/ColorPicker"
import { backgroundColors, fontColors } from '../../base/js/MaterialColors'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import If from '../../utils/If'
import { Accordion, AccordionItem } from '../../base/Accordion.jsx'

import {
    handleFontColorChanged, handleFontSizeChanged,
    handleMessageChanged, handleNoteColorChanged, handleTitleChanged,
    create
} from '../../../redux/actions/createNoteActions'



class CreateNote extends Component {

    extractUsernameFromEmail = email => {
        return email.match(/([^@]+)/)[0]
    }

    callCreate = element => {
        element.preventDefault()
        this.props.create(this.props.uid, {
            title: this.props.title,
            message: this.props.message,
            noteColor: this.props.noteColor,
            fontColor: this.props.fontColor,
            fontSize: this.props.fontSize
        })
        return false
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3 ">
                            <h1 className="h3">Criar novo bilhete</h1>
                            <form onSubmit={this.callCreate}>
                                <div className="form-group ">
                                    <Accordion accordionId="note-options-accordion">
                                        <AccordionItem itemId="note-color" itemLabel="Cor do bilhete" accordionId="note-options-accordion">
                                            <ColorPicker name="note-color" colors={backgroundColors} colorChanged={this.props.handleNoteColorChanged} />
                                        </AccordionItem>
                                        <AccordionItem itemId="font-color" itemLabel="Cor da fonte" accordionId="note-options-accordion">
                                            <ColorPicker name="font-color" colors={fontColors} colorChanged={this.props.handleFontColorChanged} />
                                        </AccordionItem>
                                        <AccordionItem itemId="font-size" itemLabel="Tamanho da fonte" accordionId="note-options-accordion">
                                            <p>{this.props.fontSize}</p>
                                            <input className="custom-range" type="range" min="20" max="40" value={this.props.fontSize} onChange={this.props.handleFontSizeChanged} />
                                        </AccordionItem>
                                        <AccordionItem itemId="mates-list" itemLabel="Colar bilhete no quadro destes colegas" accordionId="note-options-accordion">
                                            {this.props.mates.map(m => (
                                                <div key={this.extractUsernameFromEmail(m)} className="form-check">
                                                    <input className="form-check-input" id={`chk-${this.extractUsernameFromEmail(m)}`} type="checkbox" value={m} />
                                                    <label className="form-check-label" htmlFor={`chk-${this.extractUsernameFromEmail(m)}`}>{m}</label>
                                                </div>
                                            ))}
                                            <If condition={!this.props.mates || this.props.mates.length === 0}>
                                                <p className="text-muted">Você não tem nenhum colega</p>
                                            </If>
                                        </AccordionItem>
                                    </Accordion>
                                    <input className="my-3 form-control" type="text" name="note-title" placeholder="O título do bilhete vai aqui" value={this.props.title} onChange={this.props.handleTitleChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor }} />
                                    <textarea id="ta-note-message" className="form-control note-message" placeholder="Digite sua mensagem aqui!" name="note-message" rows="10" value={this.props.message} onChange={this.props.handleMessageChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor, fontSize: this.props.fontSize }}></textarea>
                                    <button className="btn btn-primary btn-lg mt-3">Criar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

const mapStateToProps = state => ({
    noteColor: state.createNote.noteColor,
    fontColor: state.createNote.fontColor,
    fontSize: state.createNote.fontSize,
    message: state.createNote.message,
    title: state.createNote.title,
    uid: state.user.uid,
    mates: state.user.mates
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        handleFontColorChanged, handleFontSizeChanged, handleMessageChanged,
        handleNoteColorChanged, handleTitleChanged, create
    }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CreateNote)
