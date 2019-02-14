import React from 'react';
import { shallow } from 'enzyme';
import { range } from 'lodash';

import Calculator from './index';
import Screen from '../Screen';
import Button from '../Button';

it('renders correctly', () => {
  const wrapper = shallow(<Calculator/>);
  expect(wrapper.exists()).toBe(true);
});

it('renders a screen', () => {
  const wrapper = shallow(<Calculator/>);
  const screen = wrapper.find(Screen);
  expect(screen.exists()).toBe(true);
});

it('renders 10 buttons for digits', () => {
  const wrapper = shallow(<Calculator/>);
  const digitButtons = range(10).map(digit => <Button>{digit}</Button>);
  digitButtons.forEach(digitButton =>
    expect(wrapper.contains(digitButton)).toBe(true)
  );
});

it('renders a button for decimal point', () => {
  const wrapper = shallow(<Calculator/>);
  expect(wrapper.contains(<Button>.</Button>)).toBe(true);
});

it('renders a button for equal sign', () => {
  const wrapper = shallow(<Calculator/>);
  expect(wrapper.contains(<Button>=</Button>)).toBe(true);
});
