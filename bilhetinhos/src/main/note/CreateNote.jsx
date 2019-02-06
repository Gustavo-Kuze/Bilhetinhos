import React, { Component } from 'react'
import Skeleton from '../base/Skeleton'
import ColorPicker from '../base/ColorPicker'

export default class CreateNote extends Component {
    state = {
        color: '#fffde7'
    }
    
    handleColorChange = (e) => {
        this.setState({...this.state, color: e.target.value})
    }

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-10 offset-1">
                            <h1>Criar uma nota</h1>
                            <form>
                                <div className="form-group ">
                                    <p>Selecione uma cor:</p>
                                    <ColorPicker />
                                    <input type="color" name="color" value={this.state.color} onChange={this.handleColorChange} />
                                    <p>Digite sua mensagem aqui:</p>
                                    <textarea id="ta-note-message" className="form-control" name="note-message" rows="10" style={{backgroundColor: this.state.color}}></textarea>
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



