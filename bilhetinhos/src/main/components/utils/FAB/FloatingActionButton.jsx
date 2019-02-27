import './css/FAB.css'
import React from 'react'
import { Translator } from 'react-translated'

const FloatingActionButton = () => {

    const generateHrefWithSearch = (path, searchKey, searchValue) => {
        let url = new URL(window.location)
        url.pathname = path
        url.searchParams.set(searchKey, searchValue)
        return url.toString()
    }

    return (
        <nav className="fab-container"  >
            <Translator>
                {({ translate }) => (
                    <a href={generateHrefWithSearch("quadro", "novo", "bilhete")}
                        className="fab-item btn btn-link btn-lg text-white bg-primary text-decoration-none"
                        tooltip={translate({ text: 'fab-new-note' })}><i className="far fa-sticky-note"></i></a>
                )}
            </Translator>
            <Translator>
                {({ translate }) => (
                    <a href={generateHrefWithSearch("colegas", "novo", "colega")}
                        className="fab-item btn btn-link btn-lg text-white bg-primary text-decoration-none"
                        tooltip={translate({ text: 'fab-new-mate' })}><i className="fas fa-user-plus"></i></a>
                )}
            </Translator>
            <Translator>
                {({ translate }) => (
                    <button
                        className="fab-item btn btn-link btn-lg text-white bg-primary text-decoration-none"
                        tooltip={translate({ text: 'fab-actions' })}><i className="fas fa-plus"></i></button>
                )}
            </Translator>
        </nav>
    )
}

export default FloatingActionButton
