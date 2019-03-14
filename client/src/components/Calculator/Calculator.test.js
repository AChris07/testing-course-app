import React from 'react';
import { shallow } from 'enzyme';

import Calculator from './index';
import Screen from '../Screen';
import Button from '../Button';
import mockedApi from '../../api';

jest.mock('../../api', () => ({
  getExpression: jest.fn(() => Promise.resolve(19))
}));

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
  const digitButtons = wrapper.find(Button).filter('[type="digit"]')
  expect(digitButtons.length).toBe(10);
  digitButtons.forEach((digitButton, idx) => {
    expect(digitButton.dive().text()).toMatch(/\d/);
    expect(digitButton.prop('onClick')).toBeDefined();
  });
});

it('renders 4 buttons for arithmetic signs', () => {
  const wrapper = shallow(<Calculator/>);
  const arithmeticButtons = wrapper.find(Button).filter('[type="arithmetic"]');
  expect(arithmeticButtons.length).toBe(4);
  arithmeticButtons.forEach(arithmeticButton => {
    expect(arithmeticButton.dive().text()).toMatch(/[+\-*/]/);
    expect(arithmeticButton.prop('onClick')).toBeDefined();
  });
});

it('renders a button for decimal point', () => {
  const wrapper = shallow(<Calculator/>);
  const decimalButton = wrapper.find(Button).filter('[type="decimal"]');
  expect(decimalButton.dive().text()).toBe('.');
  expect(decimalButton.prop('onClick')).toBeDefined();
});

it('renders a button for equal sign', () => {
  const wrapper = shallow(<Calculator/>);
  const equalButton = wrapper.find(Button).filter('[type="equal"]');
  expect(equalButton.dive().text()).toBe('=');
  expect(equalButton.prop('onClick')).toBeDefined();
});

it('should call the api when the equal button is presssed', () => {
  const wrapper = shallow(<Calculator/>);
  wrapper.setState({ expression: '2+2' });
  const equalButton = wrapper.find(Button).filter('[type="equal"]');
  equalButton.simulate('click');

  expect(mockedApi.getExpression).toHaveBeenCalled();
});
