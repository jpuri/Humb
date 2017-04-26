import React from 'react';
import { fromJS, Map } from 'immutable';
import { keyGen } from '../utils';

const getInitialState = () => {
  return fromJS({
    nodes: getBlankBlockNode('normal'),
  });
}

function addNode(editorState) {
  const { node } = getActiveBlockNode(editorState);
  let nodes = getBlankBlockNode(node.get('type'));
  nodes = editorState.get('nodes').merge(fromJS(nodes));
  return editorState.set('nodes', nodes);
};
// todo123: If old node is broken in-between transfer content to new node.

function getBlankBlockNode(blockType) {
  const blockKey = keyGen();
  const textKey = keyGen();
  return {
    [blockKey]: {
      start: 0,
      end: 0,
      type: blockType,
      key: blockKey,
      depth: 0,
      children: [textKey],
    },
    [textKey]: {
      start: 0,
      end: 0,
      type: 'text',
      key: textKey,
      depth: 1,
      parent: blockKey,
      content: undefined,
    }
  };
}

function updateContent(editorState, key) {
  const cursor = window.getSelection().focusOffset;
  let { node } = getActiveNode(editorState);
  let nodes = editorState.get('nodes');
  node.get('children').forEach(cKey => {
    let cNode = nodes.get(cKey);
    if (cNode.get('start') <= cursor && cNode.get('end') >= cursor) {
      const content = cNode.get('content');
      cNode = cNode.set('content', content ? `${content.substr(0, cursor)}${key}${content.substr(cursor)}` : key);
      cNode = cNode.set('end', cNode.get('end') + 1);
    } else if (cNode.get('start') > cursor) {
      cNode = cNode.set('start', cNode.get('start') + 1);
      cNode = cNode.set('end', cNode.get('end') + 1);
    }
    nodes = editorState.get('nodes').set(cKey, cNode);
  });
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
  const node = key && editorState.get('nodes') && editorState.get('nodes').get(key);
  return {
    key,
    node,
    domNode,
  };
};

// todo: each node type should have a filed type to indicate it type, BLOCK, INLINE, block can never be child of inline.
// todo: currently we have hard-coded type 'normal' that should be made more dynamic
function getActiveBlockNode(editorState) {
  let domNode = window.getSelection().focusNode;
  let key, node;
  while(domNode) {
    if(domNode.attributes && domNode.attributes.getNamedItem('data-editor-key')) {
      key = domNode.attributes.getNamedItem('data-editor-key').nodeValue;
      node = key && editorState.get('nodes') && editorState.get('nodes').get(key);
      if (node.type === 'normal') {
        break;
      }
    }
    domNode = domNode.parentNode;
  };
  return {
    key,
    node,
    domNode,
  };
};

// tbd
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
