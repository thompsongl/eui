/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  InputHTMLAttributes,
  Ref,
  FunctionComponent,
  useState,
} from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';
import { EuiButtonIcon, EuiButtonIconProps } from '../../button';
import { EuiI18n } from '../../i18n';

export type EuiFieldPasswordProps = InputHTMLAttributes<HTMLInputElement> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    compressed?: boolean;
    inputRef?: Ref<HTMLInputElement>;

    /**
     * Creates an input group with element(s) coming before input.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: EuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input.
     * `string` | `ReactElement` or an array of these
     */
    append?: EuiFormControlLayoutProps['append'];

    /**
     * Change the `type` of input for manually handling obfuscation.
     * The `dual` option adds the ability to toggle the obfuscation of the input by
     * adding the an icon button as the first `append` element
     */
    type?: 'password' | 'text' | 'dual';

    /**
     * Additional props to apply to the dual toggle. Extends EuiButtonIcon
     */
    dualToggleProps?: EuiButtonIconProps;
  };

export const EuiFieldPassword: FunctionComponent<EuiFieldPasswordProps> = ({
  className,
  id,
  name,
  placeholder,
  value,
  isInvalid,
  fullWidth,
  isLoading,
  compressed,
  inputRef,
  prepend,
  append,
  type = 'password',
  dualToggleProps,
  ...rest
}) => {
  // Set the initial input type to `password` if they want dual
  const [inputType, setInputType] = useState(
    type === 'dual' ? 'password' : type
  );

  // Convert any `append` elements to an array so the visibility
  // toggle can be added to it
  const appends = Array.isArray(append) ? append : [];
  if (append && !Array.isArray(append)) appends.push(append);
  // Add a toggling button to switch between `password` and `input` if consumer wants `dual`
  // https://www.w3schools.com/howto/howto_js_toggle_password.asp
  if (type === 'dual') {
    const isVisible = inputType === 'text';

    const visibilityToggle = (
      <EuiI18n
        tokens={[
          'euiFieldPassword.showPassword',
          'euiFieldPassword.maskPassword',
        ]}
        defaults={[
          'Show password as plain text. Note: this will visually expose your password on the screen.',
          'Mask password',
        ]}>
        {([showPassword, maskPassword]: string[]) => (
          <EuiButtonIcon
            {...dualToggleProps}
            iconType={isVisible ? 'eyeClosed' : 'eye'}
            onClick={() => setInputType(isVisible ? 'password' : 'text')}
            aria-label={isVisible ? maskPassword : showPassword}
            title={isVisible ? maskPassword : showPassword}
            disabled={rest.disabled}
          />
        )}
      </EuiI18n>
    );
    appends.push(visibilityToggle);
  }

  const finalAppend = appends.length ? appends : undefined;

  const classes = classNames(
    'euiFieldPassword',
    {
      'euiFieldPassword--fullWidth': fullWidth,
      'euiFieldPassword--compressed': compressed,
      'euiFieldPassword-isLoading': isLoading,
      'euiFieldPassword--inGroup': prepend || finalAppend,
    },
    className
  );

  return (
    <EuiFormControlLayout
      icon="lock"
      fullWidth={fullWidth}
      isLoading={isLoading}
      compressed={compressed}
      prepend={prepend}
      append={finalAppend}>
      <EuiValidatableControl isInvalid={isInvalid}>
        <input
          type={inputType}
          id={id}
          name={name}
          placeholder={placeholder}
          className={classes}
          value={value}
          ref={inputRef}
          {...rest}
        />
      </EuiValidatableControl>
    </EuiFormControlLayout>
  );
};

EuiFieldPassword.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false,
  compressed: false,
};
