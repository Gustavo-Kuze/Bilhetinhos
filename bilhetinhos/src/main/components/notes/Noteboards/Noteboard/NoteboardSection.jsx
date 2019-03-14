import React, { Component, Fragment } from 'react'
import { AccordionItem } from '../../../base/Accordion'
import Spinner from '../../../utils/Spinner'
import If from '../../../utils/If'
import NotePreview from '../NotePreview'
import { markNoteIfQuery } from '../../../../helpers/notes'

export default class NoteboardSection extends Component {

    callMarkNoteIfQuery = title => {
        let result = markNoteIfQuery(title)
        window.markedNoteId = result.id ? result.id : window.markedNoteId
        return result.mark
    }

    componentDidUpdate = () => {
        if (window.markedNoteId) {
            try {
                document.getElementById(window.markedNoteId).scrollIntoView()
            } catch (err) { }
        }
    }

    renderNotes = (notes, areEditable = false) => {
        if (notes.length > 0) {
            return notes.map(note => (
                <NotePreview key={note.title} title={note.title} message={note.message}
                    noteMates={note.noteMates} fontColor={note.fontColor} noteColor={note.noteColor}
                    owner={note.owner} editable={areEditable} fontSize={note.fontSize}
                    mark={this.callMarkNoteIfQuery(note.title)} />
            ))
        }
        return ''
    }

    renderContainer = () => {
        if (this.props.notAccordionItem) {
            return (
                <div>{this.renderContent()}</div>
            )
        } else {
            return (
                <AccordionItem itemId={this.props.sectionId} itemLabel={this.props.sectionTitle} accordionId={this.props.containerId} open>
                    {this.renderContent()}
                </AccordionItem>
            )
        }
    }

    renderContent = () => (
        <Fragment>
            <If condition={this.props.isLoading}>
                <div className="row">
                    <div className="col offset-5">
                        <Spinner extraClasses="py-5 pl-3" />
                    </div>
                </div>
            </If>
            <If condition={!this.props.isLoading}>
                <div className="notes-container row ">
                    {
                        this.props.notes.length > 0 ?
                            this.renderNotes(this.props.notes, this.props.areNotesEditable) :
                            <p className="lead mx-auto">{this.props.emptyLabel}</p>
                    }
                </div>
            </If>
        </Fragment>
    )

    render() {
        return this.renderContainer()
    }
}