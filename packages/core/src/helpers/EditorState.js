import React from 'react';
import { fromJS, Map } from 'immutable';
import { keyGen } from '../utils';

const initialState = fromJS({
  nodes: [{
    type: 'normal',
    key: keyGen(),
    content: undefined,
  }],
});

function addNode(editorState) {
  const { nodeIndex } = getActiveNode(editorState);
  const node = editorState.get('nodes').get(nodeIndex);
  const nodes = editorState.get('nodes')
    .push(new Map({
      type: node.get('type'),
      key: keyGen(),
      content: undefined,
    }));
  return editorState.set('nodes', nodes);
};
// todo: transfer child and contents to new node

function updateContent(editorState) {
  const { domNode, nodeIndex } = getActiveNode(editorState);
  let node = editorState.get('nodes').get(nodeIndex);
  node = node.set('content', domNode.textContent)
  const nodes = editorState.get('nodes').set(nodeIndex, node);
  return editorState.set('nodes', nodes);
};

function getActiveNode(editorState) {
  let domNode = window.getSelection().focusNode;
  let key;
  while(domNode) {
    if(domNode.attributes && domNode.attributes.getNamedItem('data-editor-key')) {
      key = domNode.attributes.getNamedItem('data-editor-key').nodeValue;
      break;
    }
    domNode = domNode.parentNode;
  }
  const nodeIndex = key && editorState.get('nodes').findIndex((node) => node.get('key') === key);
  return {
    key,
    domNode,
    nodeIndex,
  };
};

module.exports = {
  // getActiveNode,
  initialState,
  updateContent,
  addNode,
};
