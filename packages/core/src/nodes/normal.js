import React, { Component } from 'react';

export default class Normal extends Component {
  
  render() {
    const { index, content } = this.props;
    return (
      <div data-node-index={index}>
        {content || <br />}
      </div>
    );
  }
}
