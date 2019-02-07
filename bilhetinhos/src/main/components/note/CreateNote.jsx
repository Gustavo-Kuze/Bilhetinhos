import './css/Note.css'
import React, { Component } from "react"
import Skeleton from "../base/Skeleton"
import ColorPicker from "../utils/ColorPicker"
import { backgroundColors, fontColors } from '../base/js/MaterialColors'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    handleFontColorChanged, handleFontSizeChanged,
    handleMessageChanged, handleNoteColorChanged
} from './createNoteActions'


class CreateNote extends Component {

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 offset-sm-1 offset-md-3">
                            <h1>Criar novo bilhete</h1>
                            <form>
                                <div className="form-group ">
                                    <div className="accordion" id="note-options-accordion">
                                        <div className="card">
                                            <div className="card-header" id="accordion-heading-note-color">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse-note-color" aria-expanded="false" aria-controls="collapse-note-color">
                                                        Cor do bilhete
                                             </button>
                                                </h2>
                                            </div>

                                            <div id="collapse-note-color" className="collapse" aria-labelledby="accordion-heading-note-color" data-parent="#note-options-accordion">
                                                <div className="card-body">
                                                    <ColorPicker name="note-color" colors={backgroundColors} colorChanged={this.props.handleNoteColorChanged} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="accordion-heading-font-color">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse-font-color" aria-expanded="false" aria-controls="collapse-font-color">
                                                        Cor da fonte
                                            </button>
                                                </h2>
                                            </div>
                                            <div id="collapse-font-color" className="collapse" aria-labelledby="accordion-heading-font-color" data-parent="#note-options-accordion">
                                                <div className="card-body">
                                                    <ColorPicker name="font-color" colors={fontColors} colorChanged={this.props.handleFontColorChanged} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="accordion-heading-font-size">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse-font-size" aria-expanded="false" aria-controls="collapse-font-size">
                                                        Tamanho da fonte
                                                    </button>
                                                </h2>
                                            </div>
                                            <div id="collapse-font-size" className="collapse" aria-labelledby="accordion-heading-font-size" data-parent="#note-options-accordion">
                                                <div className="card-body">
                                                    <p>{this.props.fontSize}</p>
                                                    <input className="custom-range" type="range" min="20" max="40" value={this.props.fontSize} onChange={this.props.handleFontSizeChanged} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3">Digite sua mensagem aqui:</p>
                                    <textarea id="ta-note-message" className="form-control note-message" name="note-message" rows="10" value={this.props.message} onChange={this.props.handleMessageChanged} style={{ backgroundColor: this.props.noteColor, color: this.props.fontColor, fontSize: this.props.fontSize }}></textarea>
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
    message: state.createNote.message
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ handleFontColorChanged, handleFontSizeChanged, handleMessageChanged, handleNoteColorChanged }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CreateNote)
