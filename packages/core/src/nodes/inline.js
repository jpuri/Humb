import React, { Component } from 'react';

export default function getInlineComponent(inlineType) {
  const Comp = inlineType;
  return ({ content }) => <Comp>{content}</Comp>;
}
