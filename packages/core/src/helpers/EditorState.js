import React from 'react';
import { fromJS, Map } from 'immutable';

const initialState = fromJS({
  nodes: [{
    type: 'normal',
    content: undefined,
  }],
});

function addContent(editorState, content) {
  let activeNode = getActiveNode(editorState);
  if (activeNode) {
    const node = activeNode.node.set('content', node.get('content') ? node.get('content') + content : content)
    const nodes = editorState.get('nodes').set(activeNode.index, node)
    const newState = editorState.set('nodes', nodes) 
    return newState;
  }
  return editorState;
};

function addNode(editorState, type) {
  const activeNode = getActiveNode(editorState).node;
  const nodes = editorState.get('nodes').push(new Map({
    type: activeNode.get('type'),
    content: undefined,
  }));
  const newState = editorState.set('nodes', nodes);
  return newState;
};

function getActiveNode(editorState) {
  let node = window.getSelection().focusNode;
  let nodeIndex;
  while(node) {
    if(node.attributes && node.attributes.getNamedItem('data-node-index')) {
      nodeIndex = node.attributes.getNamedItem('data-node-index').nodeValue;
      break;
    }
    node = node.parentNode;
  }
  return {
    nodeIndex,
    node: editorState &&
      editorState.get('nodes') &&
      editorState.get('nodes').get(nodeIndex)
  };
};

module.exports = {
  getActiveNode,
  initialState,
  addContent,
  addNode,
};
