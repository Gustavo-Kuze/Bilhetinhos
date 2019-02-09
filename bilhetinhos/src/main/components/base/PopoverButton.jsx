import React from 'react'
import Popover, { ArrowContainer } from 'react-tiny-popover'
import { fontColors, backgroundColors } from './js/MaterialColors'

class PopoverButton extends React.Component {

    state = {
        isPopoverOpen: false
    }

    render() {
        return (
            <Popover
                isOpen={this.state.isPopoverOpen}
                position={['bottom', 'left', 'top', 'right']}
                padding={5}
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
                            style={{ backgroundColor: fontColors.white, border: `1px solid ${backgroundColors.darkerGrey}` }}
                            onClick={() => { this.setState({ isPopoverOpen: !this.state.isPopoverOpen }) }} >
                            <div style={{ backgroundColor: backgroundColors.white, paddingLeft: '5px', paddingTop: '8px', paddingBottom: '5px' }}>
                                <h6>{this.props.popoverTitle}</h6>
                            </div>
                            <div style={{ padding: '8px' }}>
                                {this.props.children}
                            </div>
                        </div>
                    </ArrowContainer>
                )} >
                <a href="javascript:;" role="button" className="nav-link btn btn-lg btn-primary" onClick={() => { this.setState({ isPopoverOpen: !this.state.isPopoverOpen }) }} >
                    <i className={this.props.iconClassName}>
                        {this.props.buttonContent}
                    </i>
                </a>
            </Popover>
        )
    }
}


export default PopoverButton