import React, { Component } from 'react';

export default class Normal extends Component {
  
  render() {
    const { content } = this.props;
    return (
      <div>
        {content || <br />}
      </div>
    );
  }
}
