import React, { Component } from 'react';

export default class Normal extends Component {
  
  render() {
    const { content, index } = this.props;
    return (
      <div data-editor-key={index}>
        {content || <br />}
      </div>
    );
  }
}
