import React from 'react';

import './Button.css';

const Button = ({ children, onClick, testId }) => {
  return (
    <button
      data-e2e-id={testId}
      className="calculator-button"
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
