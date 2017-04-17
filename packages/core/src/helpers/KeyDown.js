import EditorState from './EditorState';

export function onKeyDown(e, editorState, onChange, selection) {
  const { key } = e;
  // if (key === 'Enter') {
  //   onChange(EditorState.addNode(editorState, 'normal'));
  //   selection.addToUpdateQueue('moveToNextNode');
  //   e.preventDefault();
  // }
}

module.exports = {
  onKeyDown,
};
