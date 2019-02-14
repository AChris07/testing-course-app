import React from 'react';
import { shallow } from 'enzyme';

import Screen from './index';
import { mockInputs } from '../../constants/mocks';
import { ARITHMETIC_OP } from '../../constants/operations';

it('renders correctly', () => {
  const wrapper = shallow(<Screen/>);
  expect(wrapper.exists()).toBe(true);
});

it('renders any digit that it is passed through to it', () => {
  const wrapper = shallow(<Screen value={mockInputs.singleDigit}/>);
  expect(wrapper.text()).toBe(mockInputs.singleDigit.toString());
});

it('renders multiple digits that are passed through to it', () => {
  const wrapper = shallow(<Screen value={mockInputs.multipleDigit}/>);
  expect(wrapper.text()).toBe(mockInputs.multipleDigit.toString());
});

it('renders any arithmetic sign that is passed through to it', () => {
  Object.keys(ARITHMETIC_OP).forEach(operation => {
    const wrapper = shallow(<Screen value={ARITHMETIC_OP[operation]}/>);
    expect(wrapper.text()).toBe(ARITHMETIC_OP[operation].toString());
  });
});

it('will not render any non-digit value', () => {
  const wrapper = shallow(<Screen value={mockInputs.nonDigit}/>);
  expect(wrapper.text()).not.toBe(mockInputs.nonDigit.toString());
});

it('will not render any non-arithmetic sign that is passed through to it', () => {
  const wrapper = shallow(<Screen value={mockInputs.nonArithmeticOp}/>);
  expect(wrapper.text()).not.toBe(mockInputs.nonArithmeticOp.toString());
});
