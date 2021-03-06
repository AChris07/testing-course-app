import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';
import { mockInputs } from '../constants/mocks';

storiesOf('Button', module)
  .add('with a digit', () => <Button>{mockInputs.singleDigit}</Button>)
  .add('with an arithmetic sign', () => <Button>{mockInputs.arithmeticSign}</Button>)
  .add('with a decimal sign', () => <Button>{mockInputs.decimalSign}</Button>)
  .add('with an equal sign', () => <Button>{mockInputs.equalSign}</Button>);
