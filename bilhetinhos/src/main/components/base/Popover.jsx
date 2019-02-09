import React from 'react'
import Popover, { ArrowContainer } from 'react-tiny-popover'


class PopOver extends React.Component{

    state = {
        isPopoverOpen: true
    }

    render(){
        return (
            <Popover
                isOpen={this.state.isPopoverOpen}
                position={['top', 'right', 'left', 'bottom']}
                padding={10}
                onClickOutside={() => this.setState({isPopoverOpen: false}) }
                content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                        position={position}
                        targetRect={targetRect}
                        popoverRect={popoverRect}
                        arrowColor={'blue'}
                        arrowSize={10}
                        arrowStyle={{ opacity: 0.7 }}
                    >
                        <div
                            style={{ backgroundColor: 'blue', opacity: 0.7 }}
                            onClick={() => {this.setState({isPopoverOpen: !this.state.isPopoverOpen}) }  }
                        >
                            Hi! I'm popover content. Here's my position: {position}.
                    </div>
                    </ArrowContainer>
                )}
            >
                <div onClick={() => {this.setState({isPopoverOpen: !this.state.isPopoverOpen}) } }>
                    Click me!
            </div>
            </Popover>
        )
    }
}


export default PopOver