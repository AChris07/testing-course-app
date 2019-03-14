import React, { Component } from 'react';
import { range } from 'lodash';

import Screen from '../Screen';
import Button from '../Button';
import api from '../../api';
import { ARITHMETIC_OP } from '../../constants/operations';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: '',
      response: ''
    };
  }

  onClickButton = symbol => {
    const {expression} = this.state;
    this.setState({
      expression: `${expression}${symbol}`,
      response: ''
    });
  }

  onClickEqualButton = async () => {
    const {expression} = this.state;
    const response = await api.getExpression(expression);
    this.setState({
      expression: '',
      response
    });
  };

  render() {
    const {expression, response} = this.state;

    const [zeroDigit, ...digits] = range(10).map((digit, idx) =>
      <Button
        key={idx}
        onClick={this.onClickButton.bind(this, digit)}
        type="digit">
        {digit}
      </Button>
    );

    const arithmeticSigns = Object.values(ARITHMETIC_OP).map((sign, idx) =>
      <Button
        key={idx}
        onClick={this.onClickButton.bind(this, sign)}
        type="arithmetic">
        {sign}
      </Button>
    );

    return (
      <div className="calculator">
        <Screen value={response || expression} />
        <div className="calculator-buttons">
          {digits}
          {zeroDigit}
          {arithmeticSigns}
          <Button
            key="decimal"
            onClick={this.onClickButton.bind(this, '.')}
            type="decimal">.</Button>
          <Button
            key="equal"
            onClick={this.onClickEqualButton}
            type="equal">=</Button>
        </div>
      </div>
    );
  }
}

export default Calculator;
