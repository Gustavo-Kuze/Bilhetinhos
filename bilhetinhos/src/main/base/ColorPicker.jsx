import './css/ColorButton.css'
import React, { Component } from 'react'
import materialColors from './js/NoteColors'


export default class ColorPicker extends Component {
    state = {
        buttonsCheckState: []
    }

    handleChange = e => {
        this.props.colorChanged(e.target.value)
    }

    colorButtons = Object.entries(materialColors).map(c => (
        <div key={c[0]} className='col-2-xs color-button-container' >
            <input className="color-button-radio" id={`color-button-${c[0]}`} type="radio" value={c[1]} name="color" onChange={this.handleChange}/>
            <label className=" color-button-label" htmlFor={`color-button-${c[0]}`}>
                <span className="color-button-span d-flex justify-content-center align-items-center" style={{ backgroundColor: c[1] }}>
                    {/* <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" /> */}
                    <i className="fas fa-check text-success"></i>
                </span>
            </label>
        </div>
    ))


    render() {
        return (
            <div className='container'>
                <div className='row'>
                    {this.colorButtons}
                </div>
            </div>
        )
    }
}
