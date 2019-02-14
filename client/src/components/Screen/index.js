import React from 'react';
import PropTypes from 'prop-types';
import { isNumber } from 'lodash';

import { ARITHMETIC_OP } from '../../constants/operations';
import './Screen.css';

const Screen = ({ value }) => {
  const isValid = isNumber(value) || Object.values(ARITHMETIC_OP).includes(value);

  return (
    <section className="calculator-screen">
      <span className="calculator-screen__value">{isValid && value}</span>
    </section>
  );
}

Screen.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(Object.values(ARITHMETIC_OP)),
  ]),
};

export default Screen;
