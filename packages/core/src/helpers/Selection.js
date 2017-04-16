import React from 'react';

export default class Selection {

  selPos = 0;

  moveByOneCharacter = () => {
    const selection = window.getSelection();
    if (selection && selection.focusNode && selection.focusOffset !== undefined) {
      selection.setPosition(selection.focusNode, selPos);
      selPos += 1;
    }
  }
}