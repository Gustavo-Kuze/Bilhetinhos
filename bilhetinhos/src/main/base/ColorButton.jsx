import './css/ColorButton.css'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import If from './If'

export default class ColorButton extends Component {
    
    state = {
        isChecked: false
    }
    
    handleClick = () => {
        this.setState({ isChecked: true })
    }
    
    handleChange = ev => {
        this.setState({ isChecked: ev.target.value })
    }
    
    
    // componentDidUpdate() {
    //     const colorButtonRadio = document.getElementById(`color-button-${this.props.colorName}`)
    //     if(colorButtonRadio.checked && !this.state.isChecked){
    //         this.setState({isChecked: colorButtonRadio.checked})
    //     }else if(!colorButtonRadio.checked && this.state.isChecked){
    //         this.setState({isChecked: colorButtonRadio.checked})
    //     }
    // }
    
    render() {
        return (
            <div
            className="color-button d-flex justify-content-center align-items-center"
            style={{ backgroundColor: this.props.color || '#333' }}
            onClick={this.handleClick}
            >
               
                <If condition={this.state.isChecked}>
                    <i className="fas fa-check text-success"></i>
                </If>
            </div>
        )
    }
}
