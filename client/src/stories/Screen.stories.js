import React from 'react';
import { storiesOf } from '@storybook/react';

import Screen from '../components/Screen';
import { mockInputs } from '../constants/mocks';

storiesOf('Screen', module)
  .add('empty', () => <Screen />)
  .add('with a digit', () => <Screen value={mockInputs.singleDigit} />)
  .add('with multiple digits', () => <Screen value={mockInputs.multipleDigit} />)
  .add('with an arithmetic sign', () => <Screen value={mockInputs.arithmeticSign} />);
