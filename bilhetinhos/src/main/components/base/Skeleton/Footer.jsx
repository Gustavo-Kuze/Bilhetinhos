import './css/Footer.css'
import React from 'react'
import {Translate} from 'react-translated'

export default function Footer() {
    return (
        <footer className="footer border border-secondary bg-light text-secondary">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center flex-column">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <p className="text-center"><Translate text='footer-by'/><a target="_blank" rel="noopener noreferrer" href="https://gustavokuze.com" className="text-decoration-none">Gustavo Kuze</a> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
