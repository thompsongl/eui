import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiControlBar } from './control_bar';
const controls = [
  {
    label: 'Sound the Alarm',
    controlType: 'button',
    onClick: console.log('You sounded the alarm'),
  },
  {
    label: 'Close the Hatch',
    controlType: 'button',
    onClick: console.log('You closed the hatch'),
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
