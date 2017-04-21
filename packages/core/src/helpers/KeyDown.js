import EditorState from './EditorState';
import Selection from './Selection';

export function onKeyDown(e, editorState, onChange, updateEditorState) {
  const { key, metaKey } = e;
  if (key === 'Enter') {
    onChange(EditorState.addNode(editorState));
    Selection.addToUpdateQueue('moveToNextNode');
    e.preventDefault();
  } else if (key === 'ArrowUp' ||
    key === 'ArrowDown' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight' ||
    key === 'Backspace') {
  } else if (metaKey && key === 'b') {
    onChange(EditorState.insertNode(editorState, 'bold'));
    e.preventDefault();
  } else {
    updateEditorState(EditorState.updateContent(editorState, key));
  }
}

/**
 * todo123:
 * - backspace to update state and delete last character
 * - selection deletion to update node contents
 */

module.exports = {
  onKeyDown,
};

// todo: undo, redo state
