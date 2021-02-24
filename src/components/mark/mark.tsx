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

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { css } from '@emotion/react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme, isDefaultTheme } from '../../services';
export type EuiMarkProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    /**
     * ReactNode to render as this component's content
     */
    children: string;
  };

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  ...rest
}) => {
  const [theme] = useEuiTheme();
  const euiMarkStyles = css`
    background-color: ${isDefaultTheme(theme.themeName)
      ? 'transparent'
      : theme.colors.euiFocusBackgroundColor};
    font-weight: ${theme.type.euiFontWeightBold};
    // Override the browser's black color.
    // Can't use 'inherit' because the text to background color contrast may not be sufficient
    color: ${theme.colors.euiTextColor};
  `;
  const classes = classNames('euiMark', className);

  return (
    <mark css={euiMarkStyles} className={classes} {...rest}>
      {children}
    </mark>
  );
};
