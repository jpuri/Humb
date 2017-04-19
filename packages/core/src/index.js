import React, { Component } from 'react';

import { EditorState, KeyDown, Selection } from './helpers';
import nodes from './nodes';

export class Editor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.initialState,
    };
  }

  componentDidUpdate() {
    Selection.clearUpdateQueue();
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
        {editorState.get('nodes').map(node => {
          const Node = nodes[node.get('type')];
          return <Node
            key={node.get('key')}
            index={node.get('key')}
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
// 5. Trigger re-render selectively
