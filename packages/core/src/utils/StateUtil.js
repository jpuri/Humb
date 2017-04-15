import React from 'react';

const addNode = (editorState, type) => {
  return { ...editorState, nodes: [ ...editorState.nodes, { type, content: <br /> }]} 
};

const addContent = (editorState, node, content) => {
  const newState = { ...editorState, nodes: [ ...editorState.nodes ]} 
  newState.nodes[0].content += content;
  return newState;
};

const defaultState = {
  nodes: [{
    type: 'normal',
    content: <br />,
  }],
};

module.exports = {
  addNode,
  addContent,
  defaultState,
};