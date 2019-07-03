import React, { useState } from 'react';

import {
  EuiButton,
  EuiBadge,
  EuiFlexItem,
  EuiFlexGroup,
} from '../../../../src/components';

const badges = [
  'default',
  'hollow',
  'primary',
  'secondary',
  'accent',
  'warning',
  'danger',
  '#fea27f',
  '#000',
];

export default () => {
  const [theme, setTheme] = useState('light');
  return (
    <React.Fragment>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{ marginBottom: '10px' }}>
            Change Theme
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiBadge theme={theme}>{`Theme: ${theme}`}</EuiBadge>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup
        wrap
        responsive={false}
        gutterSize="xs"
        style={{ width: 300 }}>
        {badges.map(badge => (
          <EuiFlexItem grow={false} key={badge}>
            <EuiBadge color={badge} theme={theme}>
              {badge}
            </EuiBadge>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </React.Fragment>
  );
};
