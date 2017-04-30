import getBlockComponent from './block';
import getInlineComponent from './inline';

module.exports = {
  normal: { type: 'block', component: getBlockComponent('div') },
  h1: { type: 'block', component: getBlockComponent('h1') },
  h2: { type: 'block', component: getBlockComponent('h2') },
  h3: { type: 'block', component: getBlockComponent('h3') },
  h4: { type: 'block', component: getBlockComponent('h4') },
  h5: { type: 'block', component: getBlockComponent('h5') },
  h6: { type: 'block', component: getBlockComponent('h6') },
  italic: { component: getInlineComponent('em') },
  bold: { component: getInlineComponent('b') },
};
