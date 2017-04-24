import React, { Component } from 'react';

export default class Normal extends Component {
  
  render() {
    const { children, index, nodes } = this.props;
    return (
      <div data-editor-key={index}>
        {children && children.size > 0 ?
          children.map(node => {
          if (node.get('type') === 'text') {
            return node.get('content') || <br />;
          } else {
            const Node = nodes[node.get('type')];
            return <Node
              key={node.get('key')}
              index={node.get('key')}
              content={node.get('content')}
            />;
          }}) : <br />}
      </div>
    );
  }
}
