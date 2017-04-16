import React from 'react';

const initialState = {
  nodes: [{
    type: 'normal',
    content: <br />,
  }],
};

function addContent(editorState, node, content) {
  const newState = { ...editorState, nodes: [ ...editorState.nodes ]} 
  if (typeof newState.nodes[0].content == string) {
    newState.nodes[0].content = newState.nodes[0].content + content;
  } else {
    newState.nodes[0].content = content;
  }
  return newState;
};

function addNode (editorState, type) {
  return { ...editorState, nodes: [ ...editorState.nodes, { type, content: '' }]} 
};

module.exports = {
  initialState,
  addContent,
  addNode,
}
