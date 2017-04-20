import EditorState from './EditorState';
import Selection from './Selection';

export function onKeyDown(e, editorState, onChange) {
  const { key, metaKey } = e;
  console.log('***', key, metaKey)
  if (key === 'Enter') {
    onChange(EditorState.addNode(editorState));
    Selection.addToUpdateQueue('moveToNextNode');
    e.preventDefault();
  } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Backspace') {

  } else if (metaKey && key === 'b') {
    onChange(EditorState.insertNode(editorState));
    e.preventDefault();
  } else {
    onChange(EditorState.updateContent(editorState));
  }
}

module.exports = {
  onKeyDown,
};
