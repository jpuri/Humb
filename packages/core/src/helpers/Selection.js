export default {
  updateQueue: [],

  selPos: 0,

  addToUpdateQueue: function(update) {
    this.updateQueue.push(update);
  },

  clearUpdateQueue: function() {
    this.updateQueue.forEach(update => this[update]());
    this.updateQueue = [];
  },

  reset: function() {
    const selection = window.getSelection();
    this.selPos = selection.focusOffset;
  },

  moveForward: function() {
    const selection = window.getSelection();
    const focusNode = selection && selection.focusNode;
    if (focusNode) {
      this.selPos += 1;
      let node;
      if (focusNode.attributes && focusNode.attributes.getNamedItem('data-editor-key')) {
        for (let i = 0; i < focusNode.childNodes.length; i++) {
          if(focusNode.childNodes.item(i).nodeName === '#text') {
            node = focusNode.childNodes.item(i);
            break;
          }
        }
      } else {
        node = focusNode;
      }
      selection.setPosition(node, this.selPos);
    }
  },

  moveToNextBlock: function() {
    const selection = window.getSelection();
    if (selection && selection.focusNode) {
      let focusNode;
      let node = selection.focusNode;
      while(node) {
        if(node.attributes && node.attributes.getNamedItem('data-editor-key')) {
          focusNode = node;
          break;
        }
        node = node.parentNode;
      };
      this.selPos = 0;
      selection.setPosition(focusNode.nextSibling, this.selPos);
    };
  },

  getOffsets: function() {
    const selection = window.getSelection();
    const { anchorOffset, focusOffset } = selection;
  
    if (anchorOffset <= focusOffset) {
      return { start: anchorOffset, end: focusOffset };
    } else {
      return { start: focusOffset, end: anchorOffset };
    }
  }
}
