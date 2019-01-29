import React from 'react';
import PropTypes from 'prop-types';

import { EuiFieldNumber } from '../field_number';

export const EuiRangeInput = ({
  min,
  max,
  step,
  value,
  disabled,
  compressed,
  onChange,
  name,
  side,
  digits,
  ...rest
}) => {

  // Chrome will properly size the input based on the max value, but FF & IE do not.
  // Calculate the width of the input based on highest number of characters.
  // Add 2 to accomodate for input stepper
  const digitTolerance = !!digits ? digits : Math.max(String(min).length, String(max).length);
  const widthStyle = { width: `${digitTolerance + 2}em` };

  return (
    <EuiFieldNumber
      name={name}
      className={`euiRangeInput euiRangeInput--${side}`}
      min={Number(min)}
      max={Number(max)}
      step={step}
      value={Number(value)}
      disabled={disabled}
      compressed={compressed}
      onChange={onChange}
      style={widthStyle}
      {...rest}
    />
  );
};

EuiRangeInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  compressed: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  digits: PropTypes.number,
  side: PropTypes.oneOf(['min', 'max'])
};
EuiRangeInput.defaultProps = {
  side: 'max'
};
