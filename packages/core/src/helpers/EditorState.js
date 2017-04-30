import React from 'react';
import { fromJS, Map } from 'immutable';

import Selection from './Selection';
import { keyGen } from '../utils';
import editorNodes from '../nodes';

// todo: refacgor to use create node functions
const getInitialState = () => {
  const blockKey = keyGen();
  const textKey = keyGen();
  return fromJS({
    nodes: {
      [blockKey]: {
        type: 'normal',
        key: blockKey,
        depth: 0,
        children: {
          [textKey]: {
          start: 0,
          end: 0,
          key: textKey,
        }},
      },
      [textKey]: {
        type: 'text',
        key: textKey,
        depth: 1,
        parent: blockKey,
        content: undefined,
      }
    },
  });
}

function getNodeSize(node) {
  if (node.get('children')) {
    const lastChild = node.get('children').maxBy(child => child.get('end'));
    return lastChild.get('end');
  } else if (node.get('content')) {
    node.get('content').length;
  }
}

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

function getActiveBlockNode(editorState) {
  let domNode = window.getSelection().focusNode;
  let key, node;
  while(domNode) {
    if(domNode.attributes && domNode.attributes.getNamedItem('data-editor-key')) {
      key = domNode.attributes.getNamedItem('data-editor-key').nodeValue;
      node = key && editorState.get('nodes') && editorState.get('nodes').get(key);
      if (editorNodes[node.get('type')].type === 'block') {
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

function changeBlockType(editorState, type) {
  const selection = window.getSelection();
  let { key, node } = getActiveBlockNode(editorState);
  node = node.set('type', type);
  const nodes = editorState.get('nodes').set(key, node);
  editorState = editorState.set('nodes', nodes);
  return editorState;
}

function createRootNode(type, depth) {
  const key = keyGen();
  return fromJS({ type, key, depth, children: {} });
}

function createChildNode(type, parent, depth, content) {
  const key = keyGen();
  return fromJS({type, key, depth, parent, content });
}

function createEmptyBlockNode(editorState, type) {

  let nodes = editorState.get('nodes');
  let newNode = createRootNode(type, 0);
  const newNodeKey = newNode.get('key');
  nodes = nodes.set(newNodeKey, newNode);

  const childNode = createChildNode('text', newNodeKey, 1);
  const childKey = childNode.get('key');
  newNode = newNode.set(
    'children',
    fromJS({[childKey]: { key: childKey, start: 0, end: 0 }})
  );

  nodes = nodes.set(newNodeKey, newNode);
  nodes = nodes.set(childKey, childNode);
  return editorState.set('nodes', nodes);
}

function createBlockNodeAtSelectionStart(editorState, node, selectionStart) {

  let nodes = editorState.get('nodes');
  let newNode = createRootNode(node.get('type'), 0);
  const newNodeKey = newNode.get('key');
  nodes = nodes.set(newNodeKey, newNode);

  const children = node.get('children').toList();
  for(let i = 0; i < children.size; i++) {
    const c = children.get(i);
    let cNode = nodes.get(c.get('key'));

    if (c.get('start') < selectionStart && c.get('end') > selectionStart) {
      const content = cNode.get('content');
      cNode = cNode.set(
        'content',
        content.substr(0, selectionStart - c.get('start'))
      );
      nodes = nodes.set(c.get('key'), cNode);
      const childNode = createChildNode(
        cNode.get('type'),
        newNodeKey,
        1,
        content.substr(selectionStart - c.get('start'))
      );
      const childKey = childNode.get('key');
      nodes = nodes.set(childKey, childNode);
      newNode = newNode.set(
        'children',
        fromJS({[childKey]: { key: childKey, start: 0, end: childNode.get('content').length }})
      );
    } else if (c.get('start') > selectionStart) {
      node = node.set('children', node.get('children').remove(c.get('key')));
      newNode = newNode.set(
        'children',
        newNode.get('children').set(c.get('key'), fromJS({
          key: c.get('key'),
          start: getNodeSize(newNode),
          end: getNodeSize(newNode) + getNodeSize(cNode) }))
      );
    }
    nodes = nodes.set(node.get('key'), node);
    nodes = nodes.set(newNodeKey, newNode);
  };
  return editorState.set('nodes', nodes);
}

function deleteSelection(editorState, node, selection) {
  let nodes = editorState.get('nodes');
  const children = node.get('children').toList();
  for(let i = 0; i < children.size; i++) {
    const c = children.get(i);
    let cNode = nodes.get(c.get('key'));
    if (c.get('end') > selection.start && c.get('end') < selection.end &&
      c.get('start') > selection.start && c.get('start') < selection.end) {
      node = node.set('children', node.get('children').remove(c.get('key')));
      nodes = nodes.remove(c.get('key'));
    } else if (c.get('start') < selection.start && c.get('end') > selection.end) {
      const content = cNode.get('content');
      cNode = cNode.set(
        'content',
        content.substr(0, selection.start - c.get('start')) + content.substr(selection.end),
      );
      nodes = nodes.set(c.get('key'), cNode);
    } else if (c.get('end') > selection.start && c.get('end') < selection.end) {
      const content = cNode.get('content');
      cNode = cNode.set(
        'content',
        content.substr(0, selection.start - c.get('start'))
      );
      nodes = nodes.set(c.get('key'), cNode);
    } else if (c.get('start') > selection.start && c.get('start') < selection.end) {
      const content = cNode.get('content');
      cNode = cNode.set(
        'content',
        content.substr(selection.end)
      );
      nodes = nodes.set(c.get('key'), cNode);
    }
    nodes = nodes.set(node.get('key'), node);
  };
  return editorState.set('nodes', nodes);
}

// todo: take care of multiline selection
function addNode(editorState) {
  const selection = window.getSelection();
  const cursor = selection.focusOffset;
  const { node } = getActiveBlockNode(editorState);
  if (selection.isCollapsed) {
    if (cursor === getNodeSize(node)) {
      return createEmptyBlockNode(editorState, node.get('type'));
    } else {
      return createBlockNodeAtSelectionStart(editorState, node, cursor);
    }
  } else {
    const selectionOffsets = Selection.getOffsets();
    editorState = deleteSelection(editorState, node, selectionOffsets);
    return createBlockNodeAtSelectionStart(editorState, node, selectionOffsets.start);
  }
};

/////////////////////////////////

function updateContent(editorState, key) {
  const cursor = window.getSelection().focusOffset;
  let { key: nodeKey, node } = getActiveNode(editorState);
  let nodes = editorState.get('nodes');
  const children = node.get('children').toList();
  for(let i = 0;i < children.size;i++) {
    const c = children.get(i);
    if (c.get('start') <= cursor && c.get('end') >= cursor) {
      let cNode = nodes.get(c.get('key'));
      const content = cNode.get('content');
      cNode = cNode.set('content', content ? `${content.substr(0, cursor)}${key}${content.substr(cursor)}` : key);
      node = node.set('children', node.get('children').set(c.get('key'), c.set('end', c.get('end') + 1)));
      nodes = nodes.set(c.get('key'), cNode);
      nodes = nodes.set(nodeKey, node);
      break;
    }
  };
  return editorState.set('nodes', nodes);
};
// if node is not block type update node after this node also, use getActiveBlockNode and write recursive function to insert content
// todo: each node type should have a filed type to indicate it type, BLOCK, INLINE, block can never be child of inline.


// tbd
function insertNode(editorState, type) {
  const selection = window.getSelection();
  let { key : nodeKey, node } = getActiveBlockNode(editorState);
  let children = node.get('children').toList();

  const start = selection.focusOffset < selection.anchorOffset ? selection.focusOffset : selection.anchorOffset;
  const end = selection.focusOffset > selection.anchorOffset ? selection.focusOffset : selection.anchorOffset;

  let nodes = editorState.get('nodes');
  let selectedText = '';

  for(let i = 0;i < children.size;i++) {
    const c = children.get(i);
    if (c.get('start') < start && c.get('end') > start) {
      let cNode = nodes.get(c.get('key'));
      const content = cNode.get('content');
      selectedText += content.substr(start - c.get('start'));
      cNode = cNode.set('content', content.substr(0, start - c.get('start')));
      node = node.set('children', node.get('children').set(c.get('key'), c.set('end', start)));
      console.log('node', node)
      nodes = nodes.set(c.get('key'), cNode);
    }
  };

  const key = keyGen();
  nodes = nodes.set(key, fromJS({
    type: type,
    key: key,
    depth: 1,
    content: selectedText,
  }));
  node = node.set('children', node.get('children').set(key, fromJS({ key, start: start, end: end - start })));

  nodes = nodes.set(nodeKey, node);
  return editorState.set('nodes', nodes);
}
// todo123: insert node should break existing nodes.

module.exports = {
  getInitialState,
  changeBlockType,
  updateContent,
  insertNode,
  addNode,
};
