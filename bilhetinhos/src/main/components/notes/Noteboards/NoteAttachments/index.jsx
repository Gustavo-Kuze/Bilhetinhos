import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'

export default class NoteAttachments extends Component {


    createAttachment = (att, i) =>
        <div key={`${att.date}-${i}`} className="d-flex justify-content-center align-items-center">
            <img className="slick-img" src={att.src} alt="attachment" style={{ height: '55px', width: '55px', cursor: 'pointer' }} data-toggle="modal" data-target="#attachment-viewer-modal"/>
        </div>

    render() {
        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        }

        return (
            <Fragment>
                <Slider {...sliderSettings}>
                    {this.props.attachments ? this.props.attachments.map((att, i) => this.createAttachment(att, i)) : ''}
                </Slider>
               
            </Fragment>
        )
    }
}
