import React, { Component } from 'react';

import { EditorState, KeyDown, Selection, Events } from './helpers';
import nodes from './nodes';

export class Editor extends Component {

  constructor(props) {
    super(props);
    this.editorState = EditorState.getInitialState();
    this.state = {
      editorState: this.editorState,
    };
  }

  componentDidUpdate() {
    Selection.clearUpdateQueue();
  }

  onChange = (editorState) => {
    this.editorState = editorState;
    this.setState({
      editorState,
    });
  }

  updateEditorState = (editorState) => {
    this.editorState = editorState;
  }

  onKeyDown = (e) => {
    KeyDown.onKeyDown(e, this.state.editorState, this.onChange, this.updateEditorState);
  }

  render() {
    const { editorState } = this.state;
    const editorNodes = editorState.get('nodes');
    console.log('**', editorNodes.toJS())
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onKeyDown={this.onKeyDown}
        onClick={Events.onClick}
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
