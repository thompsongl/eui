import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { EuiTitle } from '../../../../src/components';

export const componentClassName = 'euiGuideRuleTitle';

export const GuideRuleTitle = ({ children, className, ...rest }) => {
  const theme = useTheme();

  const classes = classNames(componentClassName, className);

  const guideRuleTitle = css`
    margin-top: ${theme.euiSizeXXL}px;
    border-top: 1px solid ${theme.euiBorderColor};
    padding-top: ${theme.euiSizeXXL}px;
    margin-bottom: ${theme.euiSizeS}px;
  `;

  return (
    <EuiTitle css={guideRuleTitle} className={classes} {...rest}>
      <h2>{children}</h2>
    </EuiTitle>
  );
};

GuideRuleTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
