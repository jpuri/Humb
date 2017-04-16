import React, { Component } from 'react';

export default class Normal extends Component {
  
  render() {
    const { index, content } = this.props;
    return (
      <div data-index={index}>
        {content}
      </div>
    );
  }
}
