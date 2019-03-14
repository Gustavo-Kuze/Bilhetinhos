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
        <Container styles={{right: '1vw', bottom: '8vh'}}>
            <Link href={generateHrefWithSearch("noteboard", "new", "note")}
                className="fab-item btn btn-link btn-lg text-white bg-primary text-decoration-none"
                tooltip={window.translate({ text: 'fab-new-note' })}
                icon="far fa-sticky-note" />
            <Link href={generateHrefWithSearch("mates", "new", "mate")}
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