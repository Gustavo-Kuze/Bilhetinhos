import React from 'react'
import { Container, Button, Link } from 'react-floating-action-button'

const FloatingActionButton = () => {

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 8);
        }
      };

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
                tooltip={window.translate({ text: 'fab-scroll-to-top' })}
                icon="fas fa-arrow-up"
                onClick={scrollToTop}
                />
            <Button
                className="fab-item btn btn-link btn-lg text-white bg-primary text-decoration-none"
                tooltip={window.translate({ text: 'fab-actions' })}
                icon="fas fa-plus"
                rotate={true} />
        </Container>
    )
}

export default FloatingActionButton