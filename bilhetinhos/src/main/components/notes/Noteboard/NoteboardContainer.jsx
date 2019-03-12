import React, { Component } from 'react'
import { Accordion } from '../../base/Accordion'

export default class NoteboardContainer extends Component {
  render() {
    return (
      <Accordion accordionId={this.props.containerId}>
        {this.props.children}
      </Accordion>
    )
  }
}

export default NoteboardContainer