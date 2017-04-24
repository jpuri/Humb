import React from 'react';
import { fromJS, Map } from 'immutable';
import { keyGen } from '../utils';

const getInitialState = () => {
  const key = keyGen();
  return fromJS({
    nodes: [{
      start: 0,
      end: 0,
      type: 'normal',
      key: keyGen(),
      depth: 0,
      children: [key],
    }, {
      start: 0,
      end: 0,
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
  const { nodeIndex } = getActiveBlockNode(editorState);
  const cursor = window.getSelection().focusOffset;
  let node = editorState.get('nodes').get(nodeIndex);
  let nodes;
  node.get('children').forEach(n => {
    let childNode = editorState.get('nodes').find(no => no.get('key') === n);
    // todo: fix condition after selection update logic if fixed
    // if (childNode.get('start') <= cursor && childNode.get('end') <= cursor) {
    if (true) {
      childNode = childNode.set('content', childNode.get('content') ? childNode.get('content') + key : key);
      childNode = childNode.set('end', childNode.get('end') + 1);
    }
    nodes = editorState.get('nodes').set(1, childNode);
  })
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

function insertNode(editorState, type) {
  const selection = window.getSelection();
  let { nodeIndex : parentNodeIndex } = getActiveBlockNode(editorState);
  const { nodeIndex } = getActiveNode(editorState);
  let node = editorState.get('nodes').get(nodeIndex);
  let parentNode = editorState.get('nodes').get(parentNodeIndex);
  const nodeContent = node.get('content');
  const start = selection.focusOffset < selection.anchorOffset ? selection.focusOffset : selection.anchorOffset;
  const end = selection.focusOffset > selection.anchorOffset ? selection.focusOffset : selection.anchorOffset;
  let key;
  let nodes = editorState.get('nodes');
  if (start !== end) {
    key = keyGen();
    nodes = nodes.push(fromJS({
      type: type,
      key: key,
      depth: node.get('depth'),
      content: nodeContent.substr(start, (end - start)),
    }));
    parentNode = parentNode.set('children', parentNode.get('children').push(key));
  }
  key = keyGen();
  nodes = nodes.push(fromJS({
    type: node.get('type'),
    key: key,
    depth: node.get('depth'),
    content: nodeContent.substr(end),
  }));
  parentNode = parentNode.set('children', parentNode.get('children').push(key));
  node = node.set('content', nodeContent && nodeContent.substr(0, start));
  nodes = nodes.set(nodeIndex, node);
  nodes = nodes.set(parentNodeIndex, parentNode);
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
