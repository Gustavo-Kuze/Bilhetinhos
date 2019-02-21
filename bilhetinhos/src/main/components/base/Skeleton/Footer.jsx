import './css/Footer.css'
import React from 'react'

export default function Footer() {
    return (
        <footer className="footer border border-secondary bg-light text-secondary">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center flex-column">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <p className="text-center">Desenvolvido por <a target="_blank" rel="NOOPENER NOREFERER" href="https://gustavokuze.com" className="text-decoration-none">Gustavo Kuze</a> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
