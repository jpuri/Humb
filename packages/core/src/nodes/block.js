import React, { Component } from 'react';

export default function getBlockComponent(blockType) {
  return class Block extends Component {
    render() {
      const { children, index, nodes } = this.props;
      const Comp = blockType;
      return (
        <Comp data-editor-key={index}>
          {children && children.size > 0 ?
            children.map(node => {
            if (node.get('type') === 'text') {
              return node.get('content') || <br key={node.get('key')} />;
            } else {
              const Node = nodes[node.get('type')].component;
              return <Node
                key={node.get('key')}
                index={node.get('key')}
                content={node.get('content')}
              />;
            }}) : <br />}
        </Comp>
      );
    }
  }
}
