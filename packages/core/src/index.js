import React, { Component } from 'react';

import { Selection, KeyDown, EditorState } from './helpers';
import nodes from './nodes';

export class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.initialState,
    };
    this.selection = new Selection();
  }

  componentDidUpdate() {
    this.selection.clearUpdateQueue();
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  onKeyDown = (e) => {
    const { editorState } = this.state;
    KeyDown.onKeyDown(e, editorState, this.onChange, this.selection);
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
            index={index}
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
// 3. Use immutablejs.
// 4. It should be possible to change text anywhere in the node.
