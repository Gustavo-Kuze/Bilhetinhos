import React from 'react'
import Popover, { ArrowContainer } from 'react-tiny-popover'
import { fontColors, backgroundColors } from './js/MaterialColors'

class PopoverButton extends React.Component {

    state = {
        isPopoverOpen: true
    }

    render() {
        return (
            <Popover
                isOpen={this.state.isPopoverOpen}
                position={['left', 'bottom', 'top', 'right']}
                padding={10}
                onClickOutside={() => this.setState({ isPopoverOpen: false })}
                content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer
                        position={position}
                        targetRect={targetRect}
                        popoverRect={popoverRect}
                        arrowColor={backgroundColors.grey}
                        arrowSize={11}
                        arrowStyle={{ opacity: 0.7 }} >
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
                <button className="nav-link btn btn-lg btn-primary" onClick={() => { this.setState({ isPopoverOpen: !this.state.isPopoverOpen }) }} ><i className={this.props.iconClassName}></i></button>
            </Popover>
        )
    }
}


export default PopoverButton