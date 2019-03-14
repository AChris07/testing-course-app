import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

const stubOnClick = jest.fn(() => {});

it('renders correctly', () => {
  const wrapper = shallow(<Button/>);
  expect(wrapper.exists()).toBe(true);
});

it('renders a button', () => {
  const wrapper = shallow(<Button/>);
  const button = wrapper.find('button');
  expect(button.exists()).toBe(true);
});

it('displays any label passed through to it', () => {
  const wrapper = shallow(<Button>1</Button>);
  expect(wrapper.text()).toBe('1');
});

it('should call the onClick callback', () => {
  const wrapper = shallow(<Button onClick={stubOnClick}>1</Button>);
  wrapper.simulate('click');
  expect(stubOnClick).toHaveBeenCalled();
  stubOnClick.mockClear();
});
