import './css/Note.css'
import React, { Component } from "react"
import Skeleton from "../../base/Skeleton/Skeleton"
import ColorPicker from "../../utils/ColorPicker"
import { backgroundColors, fontColors } from '../../base/js/MaterialColors'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    handleFontColorChanged, handleFontSizeChanged,
    handleMessageChanged, handleNoteColorChanged, handleTitleChanged,
    create
} from '../../../redux/actions/createNoteActions'


class CreateNote extends Component {

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
                                        <div className="card">
                                            <div className="card-header" id="accordion-heading-mates-list">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link btn-lg btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse-mates-list" aria-expanded="false" aria-controls="collapse-mates-list">
                                                        Colar bilhete no quadro destes colegas
                                                    </button>
                                                </h2>
                                            </div>
                                            <div id="collapse-mates-list" className="collapse" aria-labelledby="accordion-heading-mates-list" data-parent="#note-options-accordion">
                                                <div className="card-body">
                                                    <div class="form-check">
                                                        <input className="form-check-input" id="chk-zezinho" type="checkbox" value="Zezinho" />
                                                        <label className="form-check-label" htmlFor="chk-zezinho">Zezinho</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input className="form-check-input" id="chk-cris" type="checkbox" value="Cristina" />
                                                        <label className="form-check-label" htmlFor="chk-cris">Cristina</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input className="form-check-input" id="chk-rod" type="checkbox" value="Rodolfo" />
                                                        <label className="form-check-label" htmlFor="chk-rod">Rodolfo</label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input className="form-check-input" id="chk-am" type="checkbox" value="Amélia" />
                                                        <label className="form-check-label" htmlFor="chk-am">Amélia</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
    uid: state.user.uid
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        handleFontColorChanged, handleFontSizeChanged, handleMessageChanged,
        handleNoteColorChanged, handleTitleChanged, create
    }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CreateNote)
