import React, { Component } from 'react';

export default class Normal extends Component {
  
  render() {
    const { children, index, nodes, editorState } = this.props;
    return (
      <div data-editor-key={index}>
        {children && children.size > 0 ? children.map(key => {
          const node = editorState.get('nodes').find((node) => node.get('key') === key)
          const Node = nodes[node.get('type')];
          return <Node
            key={node.get('key')}
            index={node.get('key')}
            children={node.get('children')}
          />;
        }) : <br />}
      </div>
    );
  }
}
