import React from 'react';
import PropTypes from 'prop-types';

import './Screen.css';

const Screen = ({ value }) => {
  return (
    <section className="calculator-screen">
      <span className="calculator-screen__value">{value}</span>
    </section>
  );
}

Screen.propTypes = {
  value: PropTypes.string,
};

export default Screen;
