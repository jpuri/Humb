import React, { Component } from 'react';

export default class Text extends Component {
  
  render() {
    const { content, index } = this.props;
    return (
      <span data-editor-key={index}>
        {content || <br />}
      </span>
    );
  }
}

/**
 * TODO: Ultimately I will prefer to have test without a span.
 */
