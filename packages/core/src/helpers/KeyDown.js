import EditorState from './EditorState';
import Selection from './Selection';

export function onKeyDown(e, editorState, onChange) {
  const { key } = e;
  if (key === 'Enter') {
    onChange(EditorState.addNode(editorState));
    Selection.addToUpdateQueue('moveToNextNode');
    e.preventDefault();
  } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Backspace') {

  } else {
    onChange(EditorState.updateContent(editorState));
  }
}

module.exports = {
  onKeyDown,
};
