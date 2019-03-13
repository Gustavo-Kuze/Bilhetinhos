import './css/MateNoteboard.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Skeleton from '../../../base/Skeleton/Skeleton'
import { setIsLoaded, setIsLoading, refreshMateNoteboardNotes, refreshMateNoteboardUser } from '../../../../redux/actions/mateNoteboardActions'
import NoteboardContainer from '../Noteboard/NoteboardContainer'
import NoteboardSection from '../Noteboard/NoteboardSection'
import MateNoteboardObserver from './MateNoteboardObserver'
import UserPresentation from './UserPresentation'
import If from '../../../utils/If'
import Spinner from '../../../utils/Spinner'

export class MateNoteboard extends Component {

    render() {
        return (
            <Skeleton noMarginTop={true}>
                <MateNoteboardObserver />
                <If condition={this.props.isLoading}>
                    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                        <div className="row">
                            <div className="col-2 offset-4">
                                <Spinner />
                            </div>
                        </div>
                    </div>
                </If>
                <If condition={!this.props.isLoading}>
                    <section className="container-fluid">
                        <UserPresentation
                            name={this.props.user.name}
                            email={this.props.user.email}
                            bio={this.props.user.bio}
                            phone={this.props.user.phone}
                            profilePic={this.props.user.profilePic}
                        />
                        <hr className="mb-5" />
                        <div className="row ">
                            <div className="col-10 offset-1">
                                <NoteboardContainer containerId="matenoteboard-notes-accordion" notAccordionContainer={true}>
                                    <NoteboardSection
                                        notAccordionItem={true}
                                        isLoading={this.props.isLoading}
                                        notes={this.props.notes}
                                        areNotesEditable={false}
                                        emptyLabel={window.translate({ text: "matenoteboard-notes-no-note" })}
                                    />
                                </NoteboardContainer>
                            </div>
                        </div>
                    </section>
                </If>
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
    setIsLoaded, setIsLoading, refreshMateNoteboardNotes, refreshMateNoteboardUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MateNoteboard)
