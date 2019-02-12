import React from 'react'

const Spinner = props => {
    return (
        <div className={`${props.extraClasses || ''}`}>
            <div className={`spinner-border text-primary`} role="status">
                <span className="sr-only">{props.sr || 'Carregando...'}</span>
            </div>
        </div>
    )
}

export default Spinner
