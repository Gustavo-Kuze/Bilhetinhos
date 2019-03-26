import React, { Component } from 'react'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAttachmentView } from '../../../../redux/actions/attachmentViewActions'

class NoteAttachments extends Component {

    createAttachment = (att, i) => (
        <div key={`${att.date}-${i}`} className="d-flex justify-content-center align-items-center">
            <img className="slick-img" src={att.src} alt="attachment"
                style={{ height: '55px', width: '55px', cursor: 'pointer' }}
                data-toggle="modal" data-target="#attachment-viewer-modal"
                onClick={() => this.props.setAttachmentView(att)}
            />
        </div>
    )

    addProperMarginToSlickTrack = () => {
        if (this.props.attachments) {
            const note = document.getElementById(this.props.noteId)
            if (note) {
                const margin = 25
                let quantifier = Math.abs((this.props.attachments.length / 5) * margin)
                Array.from(note.querySelectorAll(`.slick-track`))
                    .map(dot => dot.style.marginBottom = `${quantifier}px`)
            }
        }
    }

    componentDidMount() {
        this.addProperMarginToSlickTrack()
    }

    render() {
        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        }

        return <>
            <Slider {...sliderSettings}>
                {this.props.attachments ? this.props.attachments.map((att, i) => this.createAttachment(att, i)) : ''}
            </Slider>
        </>
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAttachmentView
}, dispatch)

export default connect(null, mapDispatchToProps)(NoteAttachments)