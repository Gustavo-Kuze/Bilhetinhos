import React from 'react'
import { Container, Button, Link } from 'react-floating-action-button'

const FloatingActionButton = () => {

    const generateHrefWithSearch = (path, searchKey, searchValue) => {
        let url = new URL(window.location)
        url.pathname = path
        url.searchParams.set(searchKey, searchValue)
        return url.toString()
    }

    return (
        <Container>
            <Link href={generateHrefWithSearch("quadro", "novo", "bilhete")}
                className="fab-item btn btn-link btn-lg text-white bg-primary text-decoration-none"
                tooltip={window.translate({ text: 'fab-new-note' })}
                icon="far fa-sticky-note" />
            <Link href={generateHrefWithSearch("colegas", "novo", "colega")}
                className="fab-item btn btn-link btn-lg text-white bg-primary text-decoration-none"
                tooltip={window.translate({ text: 'fab-new-mate' })}
                icon="fas fa-user-plus" />
            <Button
                className="fab-item btn btn-link btn-lg text-white bg-primary text-decoration-none"
                tooltip={window.translate({ text: 'fab-actions' })}
                icon="fas fa-plus"
                rotate={true}
            />
        </Container>
    )
}

export default FloatingActionButton