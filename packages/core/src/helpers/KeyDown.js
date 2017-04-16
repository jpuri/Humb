import EditorState from './EditorState';

export function onKeyDown(e, editorState, onChange) {
  if (e.key === 'Enter') {
    onChange(EditorState.addNode(editorState, 'normal'));
  } else {
    onChange(EditorState.addContent(editorState, 'normal', e.key));
  }
  e.preventDefault();
}

module.exports = {
  onKeyDown,
};
