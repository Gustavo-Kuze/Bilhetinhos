import './css/FAB.css'
import React from 'react'

const FloatingActionButton = () => {
    return (
        <nav className="fab-container"  >

            <a href="#" className="fab-item" tooltip="Google+"></a>

            <a href="#" className="fab-item" tooltip="Twitter"></a>

            <a href="#" className="fab-item" tooltip="Facebook"></a>

            <a className="fab-item" tooltip="Share" href="#"></a>

        </nav>
    )
}

export default FloatingActionButton
