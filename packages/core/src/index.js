import React, { Component } from 'react';

import { StateUtil } from './utils';
import nodes from './nodes';

export class Editor extends Component {
  
  state = {
    editorState: StateUtil.defaultState,
  }

  componentDidUpdate() {
    var selection = window.getSelection();
    selection.modify("move", "forward", "character");
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { editorState } = this.state;
      this.onChange(StateUtil.addNode(editorState, 'normal'));
    } else {
      const { editorState } = this.state;
      this.onChange(StateUtil.addContent(editorState, 'normal', e.key));
    }
    e.preventDefault();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onKeyDown={this.onKeyDown}
      >
        {editorState.nodes.map((node, index) => {
          const Node = nodes[node.type];
          return <Node
            key={index}
            content={node.content}
          />;
        })}
      </div>
    );
  }
}


// TODO:
// 1. Use current selection to see which node is highlighted and change content accordingly.
// 2. Text should be entered for only characters in selected node.
// 3. componentDidUpdate: should update selection depending on last operation.
// 4. use immutablejs
