import React, { Component, Fragment } from 'react';

import {
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiSpacer,
  EuiTabbedContent,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

export default class BottomBarComplex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBar: false,
      barIsExpanded: false,
    };

    this.content =
      "This is a whole bunch of really great content that we think you should read. It's about life, love, and the spirit of contentment. You'll never fully understand the power that this content holds until you read it through and share it with at least 42 friends";

    this.tabs = [
      {
        id: 'flight815',
        name: 'Flight 815',
        content: (
          <Fragment>
            <div style={{ padding: '1rem' }}>
              <EuiTitle>
                <h3>Flight 815</h3>
              </EuiTitle>
              <EuiText>
                Oceanic Airlines Flight 815 was a scheduled flight from Sydney,
                Australia to Los Angeles, California, United States, on a Boeing
                777-200ER. On September 22, 2004 at 4:16 P.M., the airliner,
                carrying 324 passengers, deviated from its original course and
                disappeared over the Pacific Ocean. This is the central moment
                in the series that kicked off its plotline, and marked the
                chronological beginning of the main characters`&apos;`
                adventures on the Island.
              </EuiText>
              <EuiSpacer />
              <EuiButton
                onClick={() => {
                  this.setState({ barIsExpanded: false });
                }}>
                Shrink Bar
              </EuiButton>
            </div>
          </Fragment>
        ),
      },
      {
        id: 'theothers',
        name: 'The Others',
        content: (
          <Fragment>
            <div style={{ padding: '1rem' }}>
              <EuiTitle>
                <h3>The Others</h3>
              </EuiTitle>
              <EuiText>
                The Others, referred to by the DHARMA Initiative as the Hostiles
                or the Natives, and also by the tail section survivors of
                Oceanic Flight 815 as Them, are a group of people living on the
                Island who were followers of Jacob, intermediated by Richard
                Alpert. Jacob never showed himself to his people, and they took
                orders from a succession of leaders including Eloise Hawking,
                Charles Widmore, Benjamin Linus, and briefly, John Locke.
              </EuiText>
              <EuiSpacer />
              <EuiButton onClick={this.toggleBar.bind(this)}>
                Close Bar
              </EuiButton>
            </div>
          </Fragment>
        ),
      },
    ];
  }

  toggleBar() {
    this.setState({
      showBar: !this.state.showBar,
    });
  }

  toggleBarExpansion() {
    this.setState({
      barIsExpanded: true,
    });
  }

  render() {
    const button = (
      <EuiButton color="primary" onClick={this.toggleBar.bind(this)}>
        Toggle complex bottom bar
      </EuiButton>
    );

    let bottomBar;
    if (this.state.showBar) {
      bottomBar = (
        <EuiBottomBar
          paddingSize="none"
          initialHeight={36}
          isExpanded={this.state.barIsExpanded}
          showAdditionalContent
          additionalContent={this.content}>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem>
              <EuiTabbedContent
                tabs={this.tabs}
                onTabClick={this.toggleBarExpansion.bind(this)}
                size="s"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton>Click Me</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      );
    }

    return (
      <div>
        {button}
        {bottomBar}
      </div>
    );
  }
}
