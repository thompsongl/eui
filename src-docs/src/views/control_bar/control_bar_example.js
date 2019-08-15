import React from 'react';

import { EuiCode, EuiControlBar } from '../../../../src/components';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import ControlBar from './control_bar';
import { ControlBarWithTabs } from './tabs';

const controlBarSource = require('!!raw-loader!./control_bar');
const controlBarHtml = renderToHtml(ControlBar);
const controlBarSnippet = '<EuiControlBar controls={items}/>';

const tabsBarSource = require('!!raw-loader!./tabs');
const tabsBarHtml = renderToHtml(ControlBarWithTabs);
const tabsBarSnippet = '<EuiControlBar controls={items} size="m"/>';

export const ControlBarExample = {
  title: 'Control Bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: controlBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: controlBarHtml,
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
    {
      title: 'Using Tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tabsBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tabsBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            You can pass in a variety of control types that include things such
            as tabs, buttons, icons, spacers, dividers, and text. This example
            uses
            <EuiCode>size=&quot;m&quot;</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiControlBar },
      snippet: tabsBarSnippet,
      demo: <ControlBarWithTabs />,
    },
  ],
};
