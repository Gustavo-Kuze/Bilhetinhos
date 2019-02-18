import './css/ColorButtons.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class ColorPicker extends Component {

    handleChange = element => {
        this.props.colorChanged(element.target.value)
    }

    checkIfCurrentColor = (color) => {
        let shouldCheck = false
        if (this.props.isNoteColorPicker) {
            if (this.props.currentNoteColor === color)
                shouldCheck = true
        }else{
            if (this.props.currentFontColor === color)
                shouldCheck = true
        }
        return shouldCheck
    }

    colorButtons = Object.entries(this.props.colors).map(color => (
        <div key={color[0]} className='col-2-xs color-button-container' >
            <input id={`color-button-${this.props.name}-${color[0]}`}
                className={`color-button-radio`}
                type="radio"
                value={color[1]}
                name={this.props.name}
                onChange={this.handleChange}
                checked={this.checkIfCurrentColor(color[1])}
            />
            <label className=" color-button-label" htmlFor={`color-button-${this.props.name}-${color[0]}`}>
                <span className="color-button-span d-flex justify-content-center align-items-center" style={{ backgroundColor: color[1] }}>
                    <i className="fas fa-check text-success"></i>
                </span>
            </label>
        </div>
    ))

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-lg-6">
                        <div className="row">
                            {this.colorButtons}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentNoteColor: state.note.noteColor,
    currentFontColor: state.note.fontColor
})

export default connect(mapStateToProps)(ColorPicker)