import React from 'react';

import { EuiCode, EuiControlBar } from '../../../../src/components';

//import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import ControlBar from './control_bar';

const controlBarSource = require('!!raw-loader!./control_bar');
//const controlBarHtml = renderToHtml(ControlBar);

const controlBarSnippet = '<EuiControlBar />';

export const ControlBarExample = {
  title: 'Control Bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlBarSource,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>ControlBar</EuiCode> is a bottom positioned container and
            content well intended to provide additional view controls and
            actions.
          </p>
        </div>
      ),
      props: { EuiControlBar },
      snippet: controlBarSnippet,
      demo: <ControlBar />,
    },
  ],
};
