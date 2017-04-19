import React from 'react';
import { fromJS, Map } from 'immutable';
import { keyGen } from '../utils';

const key = keyGen();

const initialState = fromJS({
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

// keep array of node refs rather then whole object

function addNode(editorState) {
  const { nodeIndex } = getActiveBlockNode(editorState);
  const node = editorState.get('nodes').get(nodeIndex);
  const key = keyGen();

  const newnodes = fromJS([{
    type: 'normal',
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
// todo: transfer child and contents to new node

function updateContent(editorState) {
  const { domNode, nodeIndex } = getActiveNode(editorState);
  let node = editorState.get('nodes').get(nodeIndex);
  console.log('nodeIndex', nodeIndex)
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
  console.log('key', key)
  const nodeIndex = key && editorState.get('nodes').findIndex((node) => node.get('key') === key);
  return {
    key,
    domNode,
    nodeIndex,
  };
};

function getActiveBlockNode(editorState) {
  let domNode = window.getSelection().focusNode;
  let key;
  while(domNode) {
    if(domNode.attributes && domNode.attributes.getNamedItem('data-editor-key')) {
      key = domNode.attributes.getNamedItem('data-editor-key').nodeValue;
      const node = key && editorState.get('nodes').find((node) => node.get('key') === key);
      if (node.type === 'normal') {
        break;
      }
    }
    domNode = domNode.parentNode;
  }
  console.log('key', key)
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
