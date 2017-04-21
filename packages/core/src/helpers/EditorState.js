import React from 'react';
import { fromJS, Map } from 'immutable';
import { keyGen } from '../utils';

const getInitialState = () => {
  const key = keyGen();
  return fromJS({
    nodes: [{
      type: 'normal',
      key: keyGen(),
      depth: 0,
      children: [key],
    }, {
      type: 'text',
      key: key,
      depth: 1,
      content: undefined,
    }],
  });
}

function addNode(editorState) {
  const { nodeIndex } = getActiveBlockNode(editorState);
  const node = editorState.get('nodes').get(nodeIndex);
  const key = keyGen();
  const newnodes = fromJS([{
    type: node.get('type'),
    key: keyGen(),
    depth: 0,
    children: [key],
  }, {
    type: 'text',
    key: key,
    depth: 1,
    content: undefined,
  }]);
  const nodes = editorState.get('nodes').concat(newnodes);
  return editorState.set('nodes', nodes);
};
// todo123: If old node is broken in-between transfer content to new node.

function updateContent(editorState, key) {
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
  const nodeIndex = key && editorState.get('nodes')
    .findIndex((node) => node.get('key') === key);
  return {
    key,
    domNode,
    nodeIndex,
  };
};

// todo: each node type should have a filed type to indicate it type, BLOCK, INLINE, block can never be child of inline.
function getActiveBlockNode(editorState) {
  let domNode = window.getSelection().focusNode;
  let key, nodeIndex;
  while(domNode) {
    if(domNode.attributes && domNode.attributes.getNamedItem('data-editor-key')) {
      key = domNode.attributes.getNamedItem('data-editor-key').nodeValue;
      nodeIndex = key && editorState.get('nodes').findIndex((node) => node.get('key') === key);
      if (editorState.get('nodes').get(nodeIndex).type === 'normal') {
        break;
      }
    }
    domNode = domNode.parentNode;
  };
  return {
    key,
    domNode,
    nodeIndex,
  };
};

function insertNode(editorState) {
  const selection = window.getSelection();
  const { nodeIndex } = getActiveBlockNode(editorState);
  const key = keyGen();
  let node = editorState.get('nodes').get(nodeIndex);
  const nodeChildren = node.get('children').push(key);
  node = node.set('children', nodeChildren);
  let nodes = editorState.get('nodes').set(nodeIndex, node);
  nodes = nodes.push(fromJS({
    type: 'bold',
    key: key,
    depth: 1,
    content: 'testing',
  }));
  return editorState.set('nodes', nodes);
}
// todo123: insert node should break existing nodes.

module.exports = {
  getInitialState,
  updateContent,
  insertNode,
  addNode,
};

// todo: make state key->value map
