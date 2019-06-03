import React, { Component } from 'react';

import { withTheme } from '../../components';

import { EuiColorPicker, EuiFormRow } from '../../../../src/components';
import { isValidHex } from '../../../../src/services';

class _ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#DB1374',
    };
  }

  handleChange = value => {
    this.setState({ color: value });
  };

  render() {
    const hasErrors = !isValidHex(this.state.color) && this.state.color !== '';
    console.log(this.props.theme);

    let errors;
    if (hasErrors) {
      errors = ['Provide a valid hex value'];
    }

    return (
      <EuiFormRow label="Pick a color" isInvalid={hasErrors} error={errors}>
        <EuiColorPicker
          onChange={this.handleChange}
          color={this.state.color}
          isInvalid={hasErrors}
        />
      </EuiFormRow>
    );
  }
}

export const ColorPicker = withTheme(_ColorPicker);
