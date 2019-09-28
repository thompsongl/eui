import React from 'react';

import { EuiMark, EuiText } from '../../../../src/components';

export default () => (
  <React.Fragment>
    <EuiText>
      A <EuiMark>marked</EuiMark> thing
    </EuiText>
    <EuiText>
      A <EuiMark type="strong">strong</EuiMark> thing
    </EuiText>
    <EuiText>
      A, <EuiMark type="em">em</EuiMark> thing
    </EuiText>
  </React.Fragment>
);
