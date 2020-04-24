import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { EuiFlexGroup } from '../../../../src/components';

import { GuideRuleDescription } from './guide_rule_description';
import { componentClassName as guideRuleTitleClass } from './guide_rule_title';

export const GuideRule = ({ children, heading, description, ...rest }) => {
  const theme = useTheme();

  let siblingMarginTop = theme.euiSizeL;
  if (description) {
    siblingMarginTop = theme.euiSizeXXL * 1.5;
  }
  if (heading) {
    siblingMarginTop = theme.euiSizeXXL * 2;
  }
  const guideRule = css`
    margin-top: ${theme.euiSizeXXL}px;

    & + & {
      margin-top: ${siblingMarginTop}px;
    }

    // Not sure this pattern is great
    .${guideRuleTitleClass} + & {
      ${!heading && 'margin-top: 0'};
    }
  `;

  let descriptionNode;

  if (description) {
    descriptionNode = (
      <GuideRuleDescription heading={heading} description={description} />
    );
  }

  return (
    <div css={guideRule} {...rest}>
      {descriptionNode}

      <EuiFlexGroup gutterSize="xl" wrap>
        {children}
      </EuiFlexGroup>
    </div>
  );
};

GuideRule.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};
