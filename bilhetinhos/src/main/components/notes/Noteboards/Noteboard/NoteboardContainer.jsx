import React, { Component } from 'react'
import { Accordion } from '../../../base/Accordion'

class NoteboardContainer extends Component {

  renderContainer = () => {
    if (this.props.notAccordionContainer) {
      return <div>{this.renderContent()}</div>
    } else {
      return <Accordion accordionId={this.props.containerId}>{this.renderContent()}</Accordion>
    }
  }

  renderContent = () => this.props.children

  render() {
    return this.renderContainer()
  }
}

export default NoteboardContainer