import React from 'react';
import { range } from 'lodash';

import Screen from '../Screen';
import Button from '../Button';
import './Calculator.css';

const Calculator = () => {
  const [zeroDigit, ...digits] = range(10).map((digit, idx) =>
    <Button key={idx}>{digit}</Button>
  );

  return (
    <div className="calculator">
      <Screen/>
      <div className="calculator-buttons">
        {digits}
        {zeroDigit}
        <Button key="decimal">.</Button>
        <Button key="equal">=</Button>
      </div>
    </div>
  );
}

export default Calculator;
