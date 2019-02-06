import './css/Note.css'
import React, { Component } from "react"
import Skeleton from "../base/Skeleton"
import ColorPicker from "../base/ColorPicker"
import {backgroundColors, fontColors} from '../base/js/MaterialColors'

export default class CreateNote extends Component {
    state = {
        noteColor: "#fff9c4",
        fontColor: "#424242",
        fontSize: 20,
        message: ''
    }

    handleColorChange = (e) => {
        this.setState({ ...this.state, color: e.target.value })
    }

    handleFontSizeChange = (e) => {
        this.setState({ ...this.state, fontSize: parseInt(e.target.value) })
    }

    handleMessageChange = (e) => {
        this.setState({ ...this.state, message: e.target.value })
    }

    noteColorChanged = noteColor => {
        this.setState({ ...this.state, noteColor })
    }

    fontColorChanged = fontColor => {
        this.setState({ ...this.state, fontColor })
    }

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
                                                    <ColorPicker name="note-color" colors={backgroundColors} colorChanged={this.noteColorChanged} />
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
                                                    <ColorPicker name="font-color" colors={fontColors} colorChanged={this.fontColorChanged} />
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
                                                <p>{this.state.fontSize}</p>
                                                    <input className="custom-range" type="range" min="20" max="40" value={this.state.fontSize} onChange={this.handleFontSizeChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3">Digite sua mensagem aqui:</p>
                                    <textarea id="ta-note-message" className="form-control note-message" name="note-message" rows="10" onChange={this.handleMessageChange} style={{ backgroundColor: this.state.noteColor, color: this.state.fontColor, fontSize: this.state.fontSize }}></textarea>
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



