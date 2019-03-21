import React, { Component } from 'react'
import Slider from 'react-slick'


export default class NoteAttachments extends Component {

    render() {
        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        }

        return (
            <Slider {...sliderSettings}>
                <div className="d-flex justify-content-center align-items-center">
                    <img className="slick-img" src="/img/default_cover.png" alt="" style={{ height: '55px', width: '55px' }} />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img className="slick-img" src="/img/default_user_profile.png" alt="" style={{ height: '55px', width: '55px' }} />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img className="slick-img" src="/img/default_user_profile.png" alt="" style={{ height: '55px', width: '55px' }} />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img className="slick-img" src="/img/default_user_profile.png" alt="" style={{ height: '55px', width: '55px' }} />
                </div>
            </Slider>
        )
    }
}
