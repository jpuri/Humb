import React, { Component } from 'react';

import normal from './normal';
import text from './text';

const bold = ({ content }) => <b>{content}</b>;

module.exports = {
  normal,
  bold,
  text,
};