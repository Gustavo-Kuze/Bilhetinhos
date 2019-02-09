import React from 'react'

const Spinner = props => {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">{props.sr || 'Carregando...'}</span>
        </div>
    )
}

export default Spinner
