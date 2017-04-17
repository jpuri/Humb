import React from 'react';
import { fromJS } from 'immutable';

const initialState = fromJS({
  nodes: [{
    type: 'normal',
    content: undefined,
  }],
});

// function addContent(editorState, content) {
//   let activeNode = getActiveNode(editorState);
//   if (activeNode) {
//     const node = activeNode.node.set('content', activeNode.node.get('content') ? activeNode.node.get('content') + content : content)
//     const nodes = editorState.get('nodes').set(activeNode.index, node)
//     const newState = editorState.set('nodes', nodes) 
//     return newState;
//   }
//   return editorState;
// };

// function addNode(editorState) {
//   const activeNode = getActiveNode(editorState).node;
//   let content;
//   // if (window.getSelection().focusOffset < activeNode.get('content').length) {
//   //   content
//   // }
//   const nodes = editorState.get('nodes').push(new Map({
//     type: activeNode.get('type'),
//     content: undefined,
//   }));
//   const newState = editorState.set('nodes', nodes);
//   return newState;
// };

// function getActiveNode(editorState) {
//   let node = window.getSelection().focusNode;
//   let index;
//   while(node) {
//     if(node.attributes && node.attributes.getNamedItem('data-node-index')) {
//       index = node.attributes.getNamedItem('data-node-index').nodeValue;
//       break;
//     }
//     node = node.parentNode;
//   }
//   return {
//     index,
//     node: editorState &&
//       editorState.get('nodes') &&
//       editorState.get('nodes').get(index)
//   };
// };

module.exports = {
  // getActiveNode,
  initialState,
  // addContent,
  // addNode,
};
