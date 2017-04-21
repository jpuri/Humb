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
    const editorNodes = editorState.get('nodes');
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onKeyDown={this.onKeyDown}
      >
        {editorNodes.filter(node => node.get('depth') === 0)
          .map(node => {
            const Node = nodes[node.get('type')];
            const children = editorNodes.filter(n => node.get('children').includes(n.get('key')));
            return <Node
              key={node.get('key')}
              nodes={nodes}
              index={node.get('key')}
              children={children}
            />;
          })}
      </div>
    );
  }
}

// TODO:
// 1. Selection should be part of editor state so that its consistent during undo and redo.
// 2. It should be possible to change text anywhere in the node.
