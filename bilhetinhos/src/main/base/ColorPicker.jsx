import React, { Component } from 'react'
import materialColors from './js/NoteColors'
import ColorButton from './ColorButton'

export default class ColorPicker extends Component {

    colorButtons = Object.entries(materialColors).map(c => (
        <div key={c[0]} className='col-1'>

            <ColorButton colorName={c[0]} color={c[1]} />
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
