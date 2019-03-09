import React from 'react'
import { Translate } from 'react-translated'

const Spinner = props => {
    return (
        <div className={`${props.extraClasses || ''}`}>
            <div className={`spinner-border text-${props.color ? props.color : 'primary'}`} role="status">
                <span className="sr-only">{props.sr || (<Translate text="spinner-default-label" />)}</span>
            </div>
        </div>
    )
}

export default Spinner