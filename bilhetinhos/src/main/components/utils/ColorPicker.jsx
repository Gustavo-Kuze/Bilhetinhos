import './css/ColorButtons.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    handleFontColorChanged, handleNoteColorChanged
} from '../../redux/actions/noteActions'

class ColorPicker extends Component {

    state = {
        currentColor: '',
        colorButtons: []
    }

    handleChange = element => {
        // this.props.colorChanged(element.target.value)
        if (this.props.isNoteColorPicker) {
            this.props.handleNoteColorChanged(element.target.value)
        } else {
            this.props.handleFontColorChanged(element.target.value)
        }
    }

    getRightColor = () => {
        return (this.props.isNoteColorPicker) ? this.props.currentNoteColor : this.props.currentFontColor
    }

    checkButtonOnCurrentColor = color => {
        return this.state.currentColor === color
    }

    // componentDidUpdate = () => {
    //     this.colorButtons = this.generateColorButtons()
    // }

    generateColorButtons = () => {
        return Object.entries(this.props.colors).map(color => (
            <div key={color[0]} className='col-2-xs color-button-container' >
                <input id={`color-button-${this.props.name}-${color[0]}`}
                    className={`color-button-radio`}
                    type="radio"
                    value={color[1]}
                    name={this.props.name}
                    onChange={this.handleChange}
                    defaultChecked={this.checkButtonOnCurrentColor(color[1])}
                />
                <label className=" color-button-label" htmlFor={`color-button-${this.props.name}-${color[0]}`}>
                    <span className="color-button-span d-flex justify-content-center align-items-center" style={{ backgroundColor: color[1] }}>
                        <i className="fas fa-check text-success"></i>
                    </span>
                </label>
            </div>
        ))
    }

    componentDidUpdate = () => {
        if (this.state.currentColor !== this.getRightColor()) {
            this.setState({
                currentColor: this.getRightColor()
            }, () => {
                this.setState({
                    ...this.state,
                    colorButtons: this.generateColorButtons()
                })
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-lg-6">
                        <div className="row">
                            {this.state.colorButtons}
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

const mapDispatchToProps = dispatch => bindActionCreators({
    handleFontColorChanged, handleNoteColorChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)