import React, { Component } from 'react'
import Slider from 'react-slick'
import If from '../../../utils/If'

export default class NoteAttachments extends Component {

    state = {
        visibility: "hide"
    }

    toggleVisibility = () => {
        let visibility = this.state.visibility
        visibility = visibility === "show" ? "hide" : "show"
        this.setState({ ...this.state, visibility })
    }

    render() {
        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className={`p-3 att-${this.state.visibility}`}>
                            {/* <If condition={this.state.visibility === "show"}> */}
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
                            {/* </If> */}
                        </div>
                    </div>
                    <div className="col">
                        <button type="button" className="close float-right" data-dismiss="modal" aria-label="Close"
                            onClick={this.toggleVisibility}
                        >
                            <i className={this.state.visibility === "show" ? "fas fa-times" : "fas fa-arrow-up"} ></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
