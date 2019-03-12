import React, { Component } from 'react'
import { AccordionItem } from '../../base/Accordion'
import Spinner from '../../utils/Spinner'
import If from '../../utils/If'
import NotePreview from './NotePreview/'

export default class NoteboardSection extends Component {

    renderNotes = (notes, areEditable = false) => {
        if (notes.length > 0) {
            return notes.map(note => (
                <NotePreview key={note.title} title={note.title} message={note.message}
                    noteMates={note.noteMates} fontColor={note.fontColor} noteColor={note.noteColor}
                    owner={note.owner} editable={areEditable} fontSize={note.fontSize}
                    mark={this.props.markNoteIfQuery(note.title)} />
            ))
        }
        return ''
    }

    render() {
        return (
            <AccordionItem itemId={this.props.sectionId} itemLabel={this.props.sectionTitle} accordionId={this.props.containerId} open>
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
            </AccordionItem>
        )
    }
}