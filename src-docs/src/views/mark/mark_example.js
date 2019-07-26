import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  //EuiCode,
  EuiMark,
} from '../../../../src/components';

import Mark from './mark';
const markSource = require('!!raw-loader!./mark');
const markHtml = renderToHtml(Mark);
// const markSnippet = [
//   `<EuiLink href="#"><!-- Link text --></EuiLink>
// `,
//   `<EuiLink href="#" color="secondary">
//   <!-- Colored link text -->
// </EuiLink>
// `,
// ];

export const MarkExample = {
  title: 'Mark',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markHtml,
        },
      ],
      text: <p />,
      props: { EuiMark },
      // snippet: markSnippet,
      demo: <Mark />,
    },
  ],
};
