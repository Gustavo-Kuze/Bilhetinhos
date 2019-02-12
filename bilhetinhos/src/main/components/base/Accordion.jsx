import React from 'react'

const Accordion = props => {
    return (
        <div className="accordion" id={props.accordionId}>
            <div className="card">
                {props.children}
            </div>
        </div>
    )
}

const AccordionItem = props => {
    return (
        <React.Fragment>
            <div className="card-header" id={`accordion-heading-${props.itemId}`}>
                <h2 className="mb-0">
                    <button className="btn btn-link btn-lg btn-block text-left" type="button" data-toggle="collapse" data-target={`#collapse-${props.itemId}`} aria-expanded="false" aria-controls={`collapse-${props.itemId}`}>
                        {props.itemLabel}
                    </button>
                </h2>
            </div>
            <div id={`collapse-${props.itemId}`} className="collapse " aria-labelledby={`accordion-heading-${props.itemId}`} data-parent={`#${props.accordionId}`}>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    )
}

export { Accordion, AccordionItem }