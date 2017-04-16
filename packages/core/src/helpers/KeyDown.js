import EditorState from './EditorState';

export function onKeyDown(e, editorState, onChange, selection) {
  if (e.key === 'Enter') {
    onChange(EditorState.addNode(editorState, 'normal'));
    selection.addToUpdateQueue('moveToNextNode');
  } else {
    onChange(EditorState.addContent(editorState, 'normal', e.key));
    selection.addToUpdateQueue('moveByOneCharacter');
  }
  e.preventDefault();
}

module.exports = {
  onKeyDown,
};
