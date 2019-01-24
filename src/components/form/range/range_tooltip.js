import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiRangeTooltip = props => {
  const {
    value,
    valueAppend,
    max,
    min,
    name,
  } = props;

  // Calculate the left position based on value
  const decimal = (value - min) / (max - min);
  // Must be between 0-100%
  let valuePosition = decimal <= 1 ? decimal : 1;
  valuePosition = valuePosition >= 0 ? valuePosition : 0;

  let valuePositionSide;
  if (valuePosition > .5) {
    valuePositionSide = 'left';
  } else {
    valuePositionSide = 'right';
  }

  const valuePositionStyle = { left: `${valuePosition * 100}%` };

  // Change left/right position based on value (half way point)
  const valueClasses = classNames(
    'euiRange__value',
    `euiRange__value--${valuePositionSide}`,
  );

  return (
    <div className="euiRange__valueWrapper">
      <output className={valueClasses} htmlFor={name} style={valuePositionStyle}>
        {value}{valueAppend}
      </output>
    </div>
  );
};
