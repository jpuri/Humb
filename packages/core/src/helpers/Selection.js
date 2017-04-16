import React from 'react';

export default class Selection {

  selPos = 0;

  updateQueue = [];

  addToUpdateQueue = (update) => {
    this.updateQueue.push(update);
  }

  clearUpdateQueue = () => {
    this.updateQueue.forEach(update => this[update]());
    this.updateQueue = [];
  }

  moveByOneCharacter = () => {
    const selection = window.getSelection();
    if (selection && selection.focusNode && selection.focusOffset !== undefined) {
      selection.setPosition(selection.focusNode, this.selPos);
      this.selPos += 1;
    }
  };

  moveToNextNode = () => {
    const selection = window.getSelection();
    if (selection && selection.focusNode && selection.focusOffset !== undefined) {
      selection.setPosition(selection.focusNode.parentNode.nextSibling, 0);
      this.selPos = 0;
    }
  }

}

// todo: make selection part of editor state so that its can be undone-redone