import React from 'react';
import PropTypes from 'prop-types';

import './Screen.css';

const Screen = ({ value }) => {
  return (
    <section data-e2e-id="screen" className="calculator-screen">
      <span className="calculator-screen__value">{value}</span>
    </section>
  );
}

Screen.propTypes = {
  value: PropTypes.string,
};

export default Screen;
