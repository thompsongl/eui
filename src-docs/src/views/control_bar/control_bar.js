import React, { Component } from 'react';

import {
  EuiButton,
  EuiControlBar,
  EuiLink,
  EuiText,
} from '../../../../src/components';

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

  soundTheAlarms = () => {
    alert('You clicked a button!');
  };

  closeTheHatch = () => {
    this.setState({
      contentIsVisible: false,
    });
  };

  tabOne = () => {
    this.setState({
      contentIsVisible: true,
      tabContent:
        "Oceanic Airlines Flight 815 was a scheduled flight from Sydney, Australia to Los Angeles, California, United States, on a Boeing 777-200ER. On September 22, 2004 at 4:16 P.M., the airliner, carrying 324 passengers, deviated from its original course and disappeared over the Pacific Ocean. This is the central moment in the series that kicked off its plotline, and marked the chronological beginning of the main characters' adventures on the Island.",
    });
  };

  tabTwo = () => {
    this.setState({
      contentIsVisible: true,
      tabContent:
        'The Others, referred to by the DHARMA Initiative as the Hostiles or the Natives, and also by the tail section survivors of Oceanic Flight 815 as Them, are a group of people living on the Island who were followers of Jacob, intermediated by Richard Alpert. Jacob never showed himself to his people, and they took orders from a succession of leaders including Eloise Hawking, Charles Widmore, Benjamin Linus, and briefly, John Locke.',
    });
  };
  render() {
    const textLink = (
      <EuiLink href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        src/component/roller.tsx
      </EuiLink>
    );
    const controls = [
      {
        id: 'sound_the_alarm',
        label: 'Sound the Alarm',
        controlType: 'button',
        onClick: this.soundTheAlarms,
        color: 'warning',
      },
      {
        id: 'close_the_hatch',
        label: 'Close the Hatch',
        controlType: 'button',
        onClick: this.closeTheHatch,
        classNames: 'customClassName',
        color: 'primary',
      },
      {
        id: 'flight_815',
        label: 'Flight 815',
        controlType: 'tab',
        onClick: this.tabOne,
      },
      {
        id: 'the_others',
        label: 'The Others',
        controlType: 'tab',
        onClick: this.tabTwo,
      },
      {
        id: 'spacer_1',
        controlType: 'spacer',
      },
      {
        id: 'set_the_timer',
        label: 'Set the Timer',
        controlType: 'icon',
        iconType: 'clock',
        onClick: this.closeTheHatch,
      },
      {
        id: 'some_text',
        label: textLink,
        controlType: 'text',
        onClick: null,
      },
    ];

    return (
      <div
        style={{
          width: '100%',
          height: '400px',
          position: 'relative',
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
