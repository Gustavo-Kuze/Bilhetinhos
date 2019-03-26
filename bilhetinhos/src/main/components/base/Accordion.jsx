import React from 'react'

const Accordion = props => {
    return (
        <div className="accordion" id={props.accordionId}>
            <div className="card ">
                {props.children}
            </div>
        </div>
    )
}

const AccordionItem = props => {
    return <>
        <div className="card-header bg-muted" id={`accordion-heading-${props.itemId}`}>
            <h2 className="mb-0">
                <button className={`btn btn-link btn-lg btn-block text-left text-decoration-none`} type="button" data-toggle="collapse" data-target={`#collapse-${props.itemId}`} aria-expanded={props.open} aria-controls={`collapse-${props.itemId}`}>
                    {props.itemLabel}
                </button>
            </h2>
        </div>
        <div id={`collapse-${props.itemId}`} className={`collapse ${props.open ? 'show' : ''}`} aria-labelledby={`accordion-heading-${props.itemId}`} data-parent={props.accordionId ? `#${props.accordionId}` : ''}>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    </>
}

export { Accordion, AccordionItem }