import React from 'react'

const ColorButton = props => {
    return (
        <div key={props.colorName} className='col-2-xs color-button-container' >
            <input id={`color-button-${props.name}-${props.colorName}`}
                className={`color-button-radio`}
                type="radio"
                value={props.colorValue}
                name={props.name}
                onChange={props.handleChange}
                checked={props.checked}
            />
            <label className=" color-button-label" htmlFor={`color-button-${props.name}-${props.colorName}`}>
                <span className="color-button-span d-flex justify-content-center align-items-center" style={{ backgroundColor: props.colorValue }}>
                    <i className="fas fa-check text-success"></i>
                </span>
            </label>
        </div>
    )
}

export default ColorButton