import React, { Component, Fragment } from 'react'

export default class ImgPicker extends Component {
    render() {
        return (
            <Fragment>
                <label htmlFor={`img-picker-input-${this.props.id}`} className={`${this.props.invisible ? 'invisible' : ''}`}>
                    <img id={`img-picker-img-${this.props.id}`} className={`${this.props.className} ${this.props.invisible ? 'invisible' : ''}`}
                        src={`${this.props.src}`} alt={this.props.imgAlt} />
                </label>
                <input name={`img-picker-input-name-${this.props.id}`} id={`img-picker-input-${this.props.id}`}
                    className="form-control invisible" onChange={this.props.handlePicChange}
                    type="file" accept={`${this.props.acceptedFileTypes || ".png, .jpg, .jpeg"}`} />
            </Fragment>
        )
    }
}
