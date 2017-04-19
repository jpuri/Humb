import React from 'react';

export default class Selection {

  static updateQueue = [];

  static addToUpdateQueue = (update) => {
    Selection.updateQueue.push(update);
  }

  static clearUpdateQueue = () => {
    Selection.updateQueue.forEach(update => Selection[update]());
    Selection.updateQueue = [];
  }

  static moveToNextNode = () => {
    const selection = window.getSelection();
    if (selection && selection.focusNode && selection.focusOffset !== undefined) {
      selection.setPosition(selection.focusNode.parentNode.nextSibling, 0);
    }
  }
  // todo: better way to find active node
}

// todo: make selection part of editor state so that its can be undone-redone
// refactor sleection class to avoid statics