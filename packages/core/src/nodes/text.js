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
 * todo: revert to this ultimately :)
const text = ({ content}) => content;

export default text;
*/
