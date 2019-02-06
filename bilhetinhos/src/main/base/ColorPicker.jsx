import './css/ColorButton.css'
import React, { Component } from 'react'


export default class ColorPicker extends Component {
    state = {
        buttonsCheckState: []
    }

    handleChange = e => {
        this.props.colorChanged(e.target.value)
    }

    colorButtons = Object.entries(this.props.colors).map(c => (
        <div key={c[0]} className='col-2-xs color-button-container' >
            <input className="color-button-radio" id={`color-button-${this.props.name}-${c[0]}`} type="radio" value={c[1]} name={this.props.name} onChange={this.handleChange} />
            <label className=" color-button-label" htmlFor={`color-button-${this.props.name}-${c[0]}`}>
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
                    <div className="col-md-6">
                        <div className="row">
                            {this.colorButtons}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
