import React, { Component } from 'react';

import { EuiButton, EuiControlBar, EuiText } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIsVisible: false,
      tabContent: '',
    };
  }

  toggle() {
    this.setState({
      contentIsVisible: !this.state.contentIsVisible,
    });
  }

  render() {
    const soundTheAlarms = () => {
      console.log('You clicked a button!');
    };

    const closeTheHatch = () => {
      console.log('The hatch has been closed!');
    };

    const tabOne = () => {
      controls[2].isActive = true;
      this.setState({
        contentIsVisible: true,
        tabContent:
          "Oceanic Airlines Flight 815 was a scheduled flight from Sydney, Australia to Los Angeles, California, United States, on a Boeing 777-200ER. On September 22, 2004 at 4:16 P.M., the airliner, carrying 324 passengers, deviated from its original course and disappeared over the Pacific Ocean. This is the central moment in the series that kicked off its plotline, and marked the chronological beginning of the main characters' adventures on the Island.",
      });
    };

    const controls = [
      {
        label: 'Sound the Alarm',
        controlType: 'button',
        onClick: soundTheAlarms,
      },
      {
        label: 'Close the Hatch',
        controlType: 'button',
        onClick: closeTheHatch,
        classNames: 'customClassName',
        color: 'danger',
      },
      {
        label: 'Tab 1',
        controlType: 'tab',
        onClick: tabOne,
        isActive: false,
      },
      {
        label: 'Tab 2',
        controlType: 'tab',
        onClick: closeTheHatch,
        isActive: false,
      },
      {
        controlType: 'spacer',
      },
      {
        label: 'Set the Timer',
        controlType: 'icon',
        iconType: 'clock',
        onClick: closeTheHatch,
      },
      {
        label: 'src/components/control_bar/control_bar.tsx',
        controlType: 'text',
        onClick: null,
        color: 'ghost',
      },
    ];

    return (
      <div
        style={{
          width: '100%',
          height: '400px',
          position: 'relative',
          border: '1px solid #dadada',
        }}>
        <EuiButton onClick={this.toggle.bind(this)}>Toggle</EuiButton>
        <EuiControlBar
          controls={controls}
          showContent={this.state.contentIsVisible}>
          <div style={{ padding: '1rem' }}>
            {this.state.tabContent !== '' ? (
              <EuiText>{this.state.tabContent}</EuiText>
            ) : (
              <p>Look at me</p>
            )}
          </div>
        </EuiControlBar>
      </div>
    );
  }
}
