import React from 'react';
import Clock from './clock.react';
import renderer from 'react-test-renderer';

jest.useFakeTimers();
Date.now = jest.fn(() => 1482363367071);

it('renders correctly', () => {
  const tree = renderer.create(<Clock />).toJSON();
  expect(tree).toMatchSnapshot();
});