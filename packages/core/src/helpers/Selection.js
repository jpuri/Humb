export default {
  updateQueue: [],

  addToUpdateQueue: function(update) {
    this.updateQueue.push(update);
  },

  clearUpdateQueue: function() {
    this.updateQueue.forEach(update => this[update]());
    this.updateQueue = [];
  },

  moveToNextNode: function() {
    const selection = window.getSelection();
    if (selection && selection.focusNode && selection.focusOffset !== undefined) {
      selection.setPosition(selection.focusNode.parentNode.parentNode.nextSibling, 0);
    };
  },
}
