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
        return (this.props.isNoteColorPicker) ? this.props.noteColor : this.props.fontColor
    }

    checkButtonOnCurrentColor = color => {
        return this.state.currentColor === color
    }

    // componentDidUpdate = () => {
    //     this.colorButtons = this.generateColorButtons()
    // }

    generateColorButtons = () => {
        return Object.entries(this.props.colors).map(color => {
            return <div key={color[0]} className='col-2-xs color-button-container' >
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
        })
    }

    componentDidUpdate = () => {
        console.log(`Cor da nota atual do props: ${this.props.noteColor}`)
        console.log(`Cor da fonte atual do props: ${this.props.fontColor}`)
        console.log(`Cor atual do estado: ${this.state.currentColor}`)
       
        let currentColor = this.getRightColor()
        if (this.state.currentColor !== currentColor) {
            this.setState({
                currentColor
            }, () => {
                this.setState({
                    ...this.state,
                    colorButtons: this.generateColorButtons()
                })
            })
        }
    }

    componentDidMount = () => {
       
    }

    // componentDidMount = () => {
    //     let currentColor = this.getRightColor()
    //     this.setState({
    //         currentColor
    //     }, () => {
    //         this.setState({
    //             ...this.state,
    //             colorButtons: this.generateColorButtons()
    //         })
    //     })
    // }

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
    noteColor: state.note.noteColor,
    fontColor: state.note.fontColor
})

const mapDispatchToProps = dispatch => bindActionCreators({
    handleFontColorChanged, handleNoteColorChanged
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)