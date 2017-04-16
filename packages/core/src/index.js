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
    this.selection.moveByOneCharacter();
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  onKeyDown = (e) => {
    const { editorState } = this.state;
    KeyDown.onKeyDown(e, editorState, this.onChange);
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
