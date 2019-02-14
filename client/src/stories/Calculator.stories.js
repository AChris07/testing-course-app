import React from 'react';
import { storiesOf } from '@storybook/react';

import Calculator from '../components/Calculator';

storiesOf('Calculator', module)
  .add('with screen and buttons', () => <Calculator />);
