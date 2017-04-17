import React, { Component } from 'react';

import { Selection, KeyDown, EditorState, Events } from './helpers';
import nodes from './nodes';

export class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.initialState,
    };
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div
        contentEditable
        suppressContentEditableWarning
      >
        {editorState.get('nodes').map((node, index) => {
          const Node = nodes[node.get('type')];
          return <Node
            key={index}
            content={node.get('content')}
          />;
        })}
      </div>
    );
  }
}

// TODO:
// Selection should be part of editor state so that its consistent during undo and redo.
// 
// 2. Text should be entered for only characters in selected node.
// 4. It should be possible to change text anywhere in the node.
