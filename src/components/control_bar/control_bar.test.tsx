import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import { EuiControlBar } from './control_bar';

const handleClick = () => {
  console.log('You clicked');
};

const controls = [
  {
    id: 'sound_the_alarm',
    label: 'Sound the Alarm',
    controlType: 'button',
    onClick: handleClick,
  },
  {
    id: 'close_the_hatch',
    label: 'Close the Hatch',
    controlType: 'button',
    onClick: handleClick,
  },
];

describe('EuiControlBar', () => {
  test('is rendered', () => {
    const component = render(
      <EuiControlBar controls={controls} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
