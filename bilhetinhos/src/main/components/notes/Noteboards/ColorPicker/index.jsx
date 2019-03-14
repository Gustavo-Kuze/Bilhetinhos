import '../css/ColorButtons.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ColorButton from './ColorButton'
import {
    handleFontColorChanged, handleNoteColorChanged
} from '../../../../redux/actions/editNoteActions'

class ColorPicker extends Component {

    state = {
        currentColor: '',
        colorButtons: []
    }

    handleChange = element => {
        if (this.props.isNoteColorPicker) {
            this.props.handleNoteColorChanged(element.target.value)
        } else {
            this.props.handleFontColorChanged(element.target.value)
        }
    }

    getRightColor = () => (this.props.isNoteColorPicker) ? this.props.noteColor : this.props.fontColor

    checkButtonOnCurrentColor = color => {
        return this.state.currentColor === color
    }

    generateColorButtons = () => {
        return Object.entries(this.props.colors).map(color => {
            return <ColorButton
                key={`${color[0]}-${color[1]}`}
                name={this.props.name}
                colorName={color[0]}
                colorValue={color[1]}
                handleChange={this.handleChange}
                checked={this.checkButtonOnCurrentColor(color[1])}
            />
        })
    }

    setColorAndButtonsToState = (currentColor) => {
        this.setState({
            currentColor
        }, () => {
            this.setState({
                ...this.state,
                colorButtons: this.generateColorButtons()
            })
        })
    }

    componentDidUpdate = () => {
        let currentColor = this.getRightColor()
        if (this.state.currentColor !== currentColor) {
            this.setColorAndButtonsToState(currentColor)
        }
    }

    componentDidMount = () => {
        let currentColor = this.getRightColor()
        this.setColorAndButtonsToState(currentColor)
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
    noteColor: state.editNote.noteColor,
    fontColor: state.editNote.fontColor
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleFontColorChanged, handleNoteColorChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)