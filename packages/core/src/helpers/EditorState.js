import React from 'react';

const initialState = {
  nodes: [{
    type: 'normal',
    content: undefined,
  }],
};

function addContent(editorState, node, content) {
  let index = window.getSelection().focusNode.attributes && window.getSelection().focusNode.attributes.getNamedItem('data-index');
  if (index === undefined) {
    index = window.getSelection().focusNode.parentNode.attributes.getNamedItem('data-index');
  }
  if (index && index.nodeValue) {
    const newState = { ...editorState, nodes: [ ...editorState.nodes ]} 
    newState.nodes[index.nodeValue].content = newState.nodes[index.nodeValue].content ?
      newState.nodes[index.nodeValue].content + content :
      content;
    return newState;
  }
  return editorState;
};

function addNode (editorState, type) {
  return { ...editorState, nodes: [ ...editorState.nodes, { type, content: undefined }]}
};

module.exports = {
  initialState,
  addContent,
  addNode,
}
