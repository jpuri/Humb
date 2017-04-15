import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { Editor } from '../src';

storiesOf('Editor', module)
  .add('with text', () => (
    <Editor />
  ));
