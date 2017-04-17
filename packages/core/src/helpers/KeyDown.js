import EditorState from './EditorState';

export function onKeyDown(e, editorState, onChange, selection) {
  const { key } = e;
  if (key === 'Enter') {
    onChange(EditorState.addNode(editorState, 'normal'));
    selection.addToUpdateQueue('moveToNextNode');
  } else if(key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Backspace') {

  }
  else {
    onChange(EditorState.addContent(editorState, 'normal', e.key));
    selection.addToUpdateQueue('moveByOneCharacter');
  }
  e.preventDefault();
}

module.exports = {
  onKeyDown,
};
