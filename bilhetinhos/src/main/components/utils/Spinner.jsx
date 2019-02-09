import React from 'react'

const Spinner = props => {
    return (
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">{props.sr || 'Carregando...'}</span>
        </div>
    )
}

export default Spinner
