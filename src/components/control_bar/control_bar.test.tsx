import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import { EuiControlBar, Control } from './control_bar';

const handleClick = () => {
  console.log('You clicked');
};

const controls: Control[] = [
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
  {
    id: 'sample_icon',
    label: 'Sample Icon',
    controlType: 'icon',
    iconType: 'alert',
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
