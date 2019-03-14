import React from 'react';
import { shallow } from 'enzyme';

import Screen from './index';
import { mockInputs } from '../../constants/mocks';

it('renders correctly', () => {
  const wrapper = shallow(<Screen/>);
  expect(wrapper.exists()).toBe(true);
});

it('renders any value that it is passed through to it', () => {
  const wrapper = shallow(<Screen value={mockInputs.multipleDigit}/>);
  expect(wrapper.text()).toBe(mockInputs.multipleDigit.toString());
});
