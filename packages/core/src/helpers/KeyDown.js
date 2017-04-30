import EditorState from './EditorState';
import Selection from './Selection';

export function onKeyDown(e, editorState, onChange, updateEditorState) {
  const { key, metaKey, shiftKey } = e;
  if (key === 'Enter') {
    onChange(EditorState.addNode(editorState));
    Selection.addToUpdateQueue('moveToNextBlock');
    e.preventDefault();
  } else if (key === 'ArrowUp' ||
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight' ||
    key === 'Backspace') {
  } else if (metaKey && key === 'b') {
    onChange(EditorState.insertNode(editorState, 'bold'));
    e.preventDefault();
  } else if (metaKey && key === 'i') {
    onChange(EditorState.insertNode(editorState, 'italic'));
    e.preventDefault();
  } else if (metaKey || shiftKey) {
    // e.preventDefault();
  } else {
    onChange(EditorState.updateContent(editorState, key));
    Selection.addToUpdateQueue('moveForward');
    e.preventDefault();
  }
}

/**
 * todo123:
 * - backspace to update state and delete last character
 * - selection deletion to update node contents
 * - arrowKeys to change cursor
 */

module.exports = {
  onKeyDown,
};

// todo: undo, redo state
