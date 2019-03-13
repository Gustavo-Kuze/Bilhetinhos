import './css/PopoverButton.css'
import React from 'react'
import Popover, { ArrowContainer } from 'react-tiny-popover'
import { fontColors, backgroundColors } from './js/MaterialColors'
import If from '../utils/If'

class PopoverButton extends React.Component {

    state = {
        isPopoverOpen: false,
        pictureLoaded: false
    }

    componentDidMount() {
        if (this.props.imgSrc) {
            document.getElementById('profile-picture').addEventListener('load', () => {
                this.setState({ ...this.state, pictureLoaded: true })
            })
        }
    }

    render() {
        return (
            <Popover
                isOpen={this.state.isPopoverOpen}
                position={['bottom', 'top', 'left', 'right']}
                padding={20}
                onClickOutside={() => this.setState({ isPopoverOpen: false })}
                containerStyle={{ zIndex: 9999999 }}
                content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer
                        position={position}
                        targetRect={targetRect}
                        popoverRect={popoverRect}
                        arrowColor={backgroundColors.grey}
                        arrowSize={11}
                        arrowStyle={{ zIndex: 9999999 }} >
                        <div
                            style={{ backgroundColor: fontColors.white, border: `1px solid ${backgroundColors.darkerGrey}`, ...this.props.extraStyle }}
                            onClick={() => { this.setState({ isPopoverOpen: !this.state.isPopoverOpen }) }} >
                            <div style={{ backgroundColor: backgroundColors.white, paddingLeft: '5px', paddingTop: '8px', paddingBottom: '5px' }}>
                                <h6 className="p-2">{this.props.popoverTitle}</h6>
                            </div>
                            <div style={{ padding: '8px' }}>
                                {this.props.children}
                            </div>
                        </div>
                    </ArrowContainer>
                )} >
                <a href="javascript:;" role="button" className="nav-link btn btn-lg btn-primary" onClick={() => { this.setState({ isPopoverOpen: !this.state.isPopoverOpen }) }} >
                    <If condition={!this.props.imgSrc}>
                        <i className={this.props.iconClassName}>
                            {this.props.buttonContent}
                        </i>
                    </If>
                    <If condition={this.props.imgSrc}>
                        <img id="profile-picture"
                            src={this.props.imgSrc} alt="Foto do perfil" />
                    </If>
                </a>
            </Popover>
        )
    }
}

export default PopoverButton