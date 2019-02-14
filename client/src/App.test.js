import React from 'react';
import { shallow } from 'enzyme';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import App from './App';
import Calculator from './components/Calculator';

it('renders without crashing', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.exists()).toBe(true);
});

it('renders a navigation bar with the title', () => {
  const wrapper = shallow(<App/>);
  const navbar = wrapper.find(Navbar);
  expect(navbar.exists()).toBe(true);
  expect(navbar.dive().html()).toContain('Calculadora Científica');
});

it('renders a calculator', () => {
  const wrapper = shallow(<App/>);
  const calculator = wrapper.find(Calculator);
  expect(calculator.exists()).toBe(true);
})
