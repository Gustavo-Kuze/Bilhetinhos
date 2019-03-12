import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../../../base/Skeleton/Skeleton'
import { setIsLoaded, setIsLoading, refreshMateNoteboardNotes, setMateNoteboardUser } from '../../../../redux/actions/mateNoteboardActions'
import NoteboardContainer from '../../Noteboard/NoteboardContainer'
import NoteboardSection from '../../Noteboard/NoteboardSection'

export class MateNoteboard extends Component {

    render() {
        return (
            <Skeleton>
                <section className="container-fluid">
                    <div className="row ">
                        <div className="col-10 offset-1">
                            <h1 className="h3">Quadro do colega</h1>
                            <NoteboardContainer containerId="matenoteboard-notes-accordion">
                                <NoteboardSection
                                    sectionId="matenoteboard-notes"
                                    containerId="matenoteboard-notes-accordion"
                                    sectionTitle={window.translate({ text: "noteboard-accordion-matenoteboard-notes-label" })}
                                    isLoading={this.props.isLoading}
                                    notes={this.props.notes}
                                    areNotesEditable={false}
                                    emptyLabel={window.translate({ text: "noteboard-matenoteboard-notes-no-note" })}
                                />
                            </NoteboardContainer>
                        </div>
                    </div>
                </section>
            </Skeleton>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.mateNoteboard.user,
    notes: state.mateNoteboard.notes,
    isLoading: state.mateNoteboard.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setIsLoaded, setIsLoading, refreshMateNoteboardNotes, setMateNoteboardUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MateNoteboard)
