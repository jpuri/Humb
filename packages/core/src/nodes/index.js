import getBlockComponent from './block';
import italic from './italic';
import bold from './bold';
import text from './text';

module.exports = {
  normal: getBlockComponent('div'),
  h1: getBlockComponent('h1'),
  h2: getBlockComponent('h2'),
  h3: getBlockComponent('h3'),
  h4: getBlockComponent('h4'),
  h5: getBlockComponent('h5'),
  h6: getBlockComponent('h6'),
  italic,
  bold,
  text,
};